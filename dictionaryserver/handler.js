import express  from "express";
import serverless  from "serverless-http";
import { getWord, getWordWithType, getRandomWordWithType }  from './db/index';

const app = express();

app.use(express.json());

app.get('/getWord/:word', (req, res) => {
  const word = req.params.word;
  if(!word) throw "Invalid input";
  getWord(word).then(response => {
    res.json(response);
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({error: err.message});
});

export const handler = serverless(app);
