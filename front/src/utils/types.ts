export enum PartOfSpeech {
  None = "none",
  Noun = "n.",
  Pronoun = "p. pr. & vb. n.",
  Verb = "v. t.",
  Adverb = "adv",
  Adjective = "a.",
  Preposition = "prep.",
  Any = ' '
}

export interface Definition {
  definition: string,
  word: string,
  type: PartOfSpeech,
}

export enum ResponseType{
  Parts,
  Definitions
}

export type DictionaryResponse = Definition[] | PartOfSpeech[];