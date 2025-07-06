const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=> {console.log("Connection Successful!!!");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
   {from: "sarvesh",
    to : "onkar",
    msg : "partner ky challay mg",
    created_at : new Date(),
  },
    {from: "sujal",
    to : "sarvesh",
    msg : "javascript ke notes bhej",
    created_at : new Date(),
  },
    {from: "disha",
    to : "sarvesh",
    msg : "j1 zal ka",
    created_at : new Date(),
  },
    {from: "rutvik",
    to : "sujal",
    msg : "bhai ky krtoy",
    created_at : new Date(),
  },
];

Chat.insertMany(allChats);