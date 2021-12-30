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

    if(name=="zombie"){
        special_message="Your swift arrows slay your foe!"
    } else if (name=="slime") {
        special_message = "Your arrows prove ineffective against your gelatinous foe, swallowing you whole"
    } else if (name=="skeleton") {
        special_message = "Your arrows prove no match for the skeleton's stony exterior."
    } else {
        special_message = "How did you get here?"
    }
    // response.render("archer", {monster:name})
    response.send(special_message)
})


app.get("/warrior", (request, response) => {
    response.render("warrior")
})
app.get("/warrior/:monster", (request, response) => {
    const name = request.params["monster"]
    let special_message;

    if(name=="zombie"){
        special_message="Your blows prove ineffective as the Zombie claws its way towards you!"
    } else if (name=="slime") {
        special_message = "Your blows are absorbed by your gelatinous foe, and acid is corroding your sinews..."
    } else if (name=="skeleton") {
        special_message = "Your blows prove effective in smashing this underworldly scum!"
    }else {
        special_message = "How did you get here?"
    }



    // response.render("warrior",{monster:name})
    response.send(special_message)
})
app.get("/warrior/:monster/:monster", (request, response) => {
    const name = request.params["monster"]
    let special_message;

    if(name=="zombie"){
        special_message="Your blows prove ineffective as the Zombie claws its way towards you!"
    } else if (name=="slime") {
        special_message = "Your blows are absorbed by your gelatinous foe, and acid is corroding your sinews..."
    } else if (name=="skeleton") {
        special_message = "Your blows prove effective in smashing this underworldly scum!"
    }else {
        special_message = "How did you get here?"
    }



    // response.render("warrior",{monster:name})
    response.send(special_message)
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

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})