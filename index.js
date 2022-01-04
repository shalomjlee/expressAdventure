const { response } = require("express");
const express = require("express");
const req = require("express/lib/request");
const app = express();
const port = process.env.PORT || 8080
var session = require("express-session");
const { name } = require("ejs");
const res = require("express/lib/response");

app.use(express.urlencoded({extended:true}))
app.use(express.json()) //to parse incoming requests with json payloads

app.use(session({
    secret: "random string",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.set("view engine", "ejs")


app.use(express.static( __dirname + "/public"))




const auth = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirct("/?reason=invalidlogin")
    }
}


app.get("/", (req, res) => {
    let user = "";
    let punctuation = "";
    const url = req.url
    
    let invalid_login = false;
    if (req.session && req.session.username) {
        user = req.session.username;
        punctuation = ",";
    }
    res.render("index", {my_user: user, punctuation: punctuation, invalid_login: invalid_login});
});

app.post('/signup', (req,res) => {

    const valid_users = [
        {"name": "sue", "password":"sue"},
        {"name": "john", "password":"john"},
        {"name": "sam", "password":"sam"},
        {"name": "mary", "password":"mary"}
    ]

    const user = req.body.username;
    const pass = req.body.password;

    const found_User = valid_users.find(usr => {
        return usr.name == user && usr.password == pass
    })
    
    if (found_User) {
        req.session.username = user;
        res.redirect('/crossroads');
    } else {
        req.session.destroy(() => {
            console.log("user reset");
        })
        res.redirect("/?reason=invalid_user");
    }
})

app.get("/signout", (req,res) => {
    req.session.destroy(() => {
        res.end("You have been signed out")
    })
})
app.get("/*", auth);

app.get("/crossroads", (req, res) => {
    if(req.session.username && req.session){
        res.render("crossroads", {user: req.session.username})

    } else {
        req.session.destroy(()=> {
        })
        res.redirect("/")
    }

})


app.get("/archer", (request, response) => {
    response.render("archer")
})



// app.get("/archer/:monster", (request, response) => {
//     const name = request.params["monster"]
//     let special_message;

//     response.send(special_message)
// })


app.get("/warrior", (request, response) => {
    const chooseFoe = "Chooose your Foe!"
    const monsters = [
        {
            monster: "Zombie"
        },
        {
            monster: "Slime"
        },
        {
            monster: "Skeleton"
        }
    ]
    response.render("warrior", {monsters: monsters, choose: chooseFoe})
})

app.get("/warrior/second", (request, response) => {
    const chooseFoe = "Chooose your Foe!"
    const monsters = [
        {
            monster: "Zombie"
        },
        {
            monster: "Slime"
        }
    ]
    response.render("warriorSecond", {monsters: monsters, choose: chooseFoe})
    // response.send(special_message)
})


app.get("/warrior/third", (request, response) => {
    const chooseFoe = "Chooose your Foe!"
    const monsters = [
        {
            monster: "Zombie"
        }

    ]
    response.render("warriorThird", {monsters: monsters, choose: chooseFoe})
})


app.get("/mage", (request, response) => {
    response.render("mage")
})

app.get("/mage/:monster", (request, response) => {
    const name = request.params["monster"]
    let special_message;
    if(name=="zombie"){
        special_message="Your magic is ineffective against the undead as their ghoulish bodies swarm you..."
    } else if (name=="slime") {
        special_message = "Your spells rot the corrosive slime straight into a gelatinuous grave!"
    } else if (name=="skeleton") {
        special_message = "Your magic proves ineffective agains the sturdy skeleton!"
    } else {
        special_message = "How did you get here?"
    }
    // response.render("mage",{monster:name})
    response.send(special_message)
})



app.get("/failure", (req, res) => {
    res.render("failure")
})

app.get("/victory", (req, res) => {
    res.render("victory")
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})