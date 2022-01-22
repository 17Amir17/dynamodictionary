import axios from "axios";
import {
  Definition,
  DictionaryResponse,
  PartOfSpeech,
  ResponseType,
} from "../utils/types";

const BASE_URL = "https://xkb5zb2dwd.execute-api.us-east-1.amazonaws.com";

async function getWord(
  word: string,
  partOfSpeech: PartOfSpeech | undefined = undefined
) {
  if (partOfSpeech === " ") {
    partOfSpeech = PartOfSpeech.None;
  }
  const res = await axios.get<DictionaryResponse>(
    partOfSpeech ? `${BASE_URL}/${word}/${partOfSpeech}` : `${BASE_URL}/${word}`
  );

  if (res.data.length === 0 || typeof res.data[0] === "string") {
    return { type: ResponseType.Parts, data: res.data as PartOfSpeech[] };
  } else {
    return { type: ResponseType.Definitions, data: res.data as Definition[] };
  }
}

async function getRandomWord(
  part: string,
  letter: string | undefined = undefined
) {
  const request = !letter
    ? `${BASE_URL}/partOfSpeech/${part}`
    : `${BASE_URL}/partOfSpeech/${part}?letter=${letter}`;
  

  const res = await axios.get<Definition>(request);

  return res.data;
}

export { getWord, getRandomWord };
