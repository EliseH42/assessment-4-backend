const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.


app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
    "A dubious friend may be an enemy in camouflage.",
    "A faithful friend is a strong defense.",
    "A feather in the hand is better than a bird in the air.",
    "A fresh start will put you on your way."
  ];

  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune= fortunes[randomIndex];

  res.status(200).send(randomFortune);
});

let affirmID = 0


const affirmations = []


app.post("/api/affirmation", (req, res) => {
let affirmation = {
  affirmation: req.body.affirmation,
  likeCount: 0,
  ID:affirmID
}; 
affirmID++
affirmations.push(affirmation)
res.status(200).send(affirmations)
});

app.get("/api/affirmation", (req, res) => {
res.status(200).send(affirmations)
})

app.put("/api/affirmation", (req, res) => {
let index = affirmations.findIndex((el) => {
    if(el.ID === req.body.ID){
      return true
    }
  })
affirmations[index].likeCount++
res.status(200).send(affirmations)
})

app.delete("/api/affirmation",(req,res) => {

  let index = affirmations.findIndex((el) => {  
    if (el.ID === req.body.ID){
      return true
    }
  })
  affirmations.splice(index,1)

  res.status(200).send(affirmations)
})



app.listen(4000, () => console.log("Server running on 4000"));
