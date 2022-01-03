const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3317

app.set("view engine", "ejs")

app.use(express.static( __dirname + "/public"))

app.get("/", (request, response) => {

    const charClass = ["Warrior", "Archer", "Mage"];
    response.render("index", { user: charClass})
});


app.get("/archer", (request, response) => {
    response.render("archer")

})

app.get("/archer/:monster", (request, response) => {
    const name = request.params["monster"]
    let special_message;

    // if(name=="zombie"){
    //     special_message="Your swift arrows slay your foe!"
    // } else if (name=="slime") {
    //     special_message = "Your arrows prove ineffective against your gelatinous foe, swallowing you whole"
    // } else if (name=="skeleton") {
    //     special_message = "Your arrows prove no match for the skeleton's stony exterior."
    // } else {
    //     special_message = "How did you get here?"
    // }
    // response.render("archer", {monster:name})
    response.send(special_message)
})


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