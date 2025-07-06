const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const { request } = require("https");
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));

main()
.then(()=> {console.log("Connection Successful!!!");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index Route

app.get("/chats", async (req, res)=>{
    let chats =  await Chat.find();  // here is fault 
    res.render("index.ejs", { chats });
});

// New Route 
app.get("/chats/new", (req, res)=>{
    res.render("new.ejs");
});

// Create Route
app.post("/chats", (req, res)=>{
    let { from, to , msg } = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    });
    newChat.save()
    .then((res)=>{
        console.log("Chat Was Saved!!!");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res)=>{
    let { id } = req.params;
    let { msg : newMsg }= req.body;
    let updatetedChat = await Chat.findByIdAndUpdate(
        id, 
        {msg : newMsg}, 
        {runValidators : true, new : true}
    );
    res.redirect("/chats");
});
//destroy route
app.delete("/chats/:id", async(req, res)=>{
    let { id } = req.params;
    let deletedChat =  await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/", (req, res)=>{
    res.send("root is working");
});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});