import express from "express";
import cors from 'cors'
import serverless from "serverless-http";
import { getWord, getWordWithType, getRandomWordWithType } from "./db/index";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/partOfSpeech/:part", (req, res) => {
  const parts = [
    "none",
    "n.",
    "a.",
    "adv.",
    "pl.",
    "prep.",
    "v. t.",
    "imp. & p. p.",
    "p. pr. & vb. n.",
  ];
  let part = req.params.part;
  const letter = req.query.letter;
  if (!part || !parts.includes(part)) throw "Invalid input";
  switch (part) {
    case "none":
      part = " ";
      break;
    case "pl.":
      part = "pl. ";
      break;
  }
  if (letter) {
    getRandomWordWithType(part, letter[0].toUpperCase()).then((response) => {
      res.json(response);
    });
  } else {
    getRandomWordWithType(part).then((response) => {
      res.json(response);
    });
  }
});

app.get("/:word", (req, res) => {
  const word = req.params.word;
  if (!word) throw "Invalid input";
  getWord(word).then((response) => {
    res.json(response);
  });
});
app.get("/:word/:partOfSpeech", (req, res) => {
  const parts = [
    "none",
    "n.",
    "a.",
    "adv.",
    "pl.",
    "prep.",
    "v. t.",
    "imp. & p. p.",
    "p. pr. & vb. n.",
  ];
  const word = req.params.word;
  let partOfSpeech = req.params.partOfSpeech;
  if (!word || !partOfSpeech || !parts.includes(partOfSpeech)) throw "Invalid input";
  switch (partOfSpeech) {
    case "none":
      partOfSpeech = " ."[0];
      break;
    case "pl.":
      partOfSpeech = "pl. ";
      break;
  }
  getWordWithType(word, partOfSpeech).then((response) => {
    res.json(response);
  });
});


app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({ error: err.message });
});

export const handler = serverless(app);
