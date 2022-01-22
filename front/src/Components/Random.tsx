import React, { useRef, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { getRandomWord } from "../networking";
import { Definition, PartOfSpeech } from "../utils/types";
import DefinitionCard from "./DefinitionCard";

export default function Random() {
  const partRef = useRef<HTMLSelectElement>(null);
  const letterRef = useRef<HTMLSelectElement>(null);
  const [definition, setDefinition] = useState<Definition>();

  const getRandom = async () => {
      if(partRef && letterRef && partRef.current && letterRef.current){
          const definition = await getRandomWord(partRef.current.value, letterRef.current.value === 'random' ? undefined : letterRef.current.value);
          setDefinition(definition);
      }
  };

  const getPartString = (part: PartOfSpeech) => {
    for (const key in PartOfSpeech) {
      if (PartOfSpeech[key as keyof typeof PartOfSpeech] === part) {
        return key;
      }
    }
    return part;
  };

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Select ref={partRef}>
          {(Object.keys(PartOfSpeech) as Array<keyof typeof PartOfSpeech>).map(
            (key) => {
              return <option value={PartOfSpeech[key]}>{key}</option>;
            }
          )}
        </Form.Select>
        <Form.Select style={{ overflow: "auto" }} ref={letterRef}>
          <option value="random">Random</option>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            return <option value={letter}>{letter}</option>;
          })}
        </Form.Select>
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={getRandom}
        >
          Get Random
        </Button>
      </InputGroup>
      {definition ? (
        <DefinitionCard
          word={definition.word}
          type={getPartString(definition.type)}
          definitions={[definition]}
        />
      ) : (
        <></>
      )}
    </>
  );
}
