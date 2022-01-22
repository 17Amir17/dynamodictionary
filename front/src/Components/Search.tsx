import React, { useRef, useState } from "react";
import { InputGroup, FormControl, Button, Form, Card } from "react-bootstrap";
import { getWord } from "../networking";
import { Definition, PartOfSpeech, ResponseType } from "../utils/types";
import DefinitionCard from "./DefinitionCard";

export default function Search() {
  const [word, setWord] = useState<string>();
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [parts, setParts] = useState<PartOfSpeech[]>([]);
  const wordRef = useRef<HTMLInputElement>(null);
  const partRef = useRef<HTMLSelectElement>(null);

  const getDefinition = async () => {
    if (wordRef && wordRef.current && partRef && partRef.current) {
      let word = wordRef.current.value;
      let part = partRef.current.value;
      if (word) word = word[0].toUpperCase() + word.substring(1);
      
      const { type, data } = part === 'all' ? await getWord(word) : await getWord(word, part as PartOfSpeech);
      setWord(word);
      if (type === ResponseType.Definitions) {
        setDefinitions(data as Definition[]);
        setParts([]);
      } else {
        setParts(data as PartOfSpeech[]);
        setDefinitions([]);
      }
    }
  };

  const getPartString = (part: PartOfSpeech) => {
    for(const key in PartOfSpeech){  
        if(PartOfSpeech[key as keyof typeof PartOfSpeech] === part){   
            return key;
        }
    }
    return part;
  }
  
  return (
    <div className="search">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="eg: Airplane"
          aria-label="word"
          aria-describedby="basic-addon2"
          ref={wordRef}
        />
        <Form.Select aria-label="Default select example" ref={partRef}>
          <option value="all">All</option>
          {(Object.keys(PartOfSpeech) as Array<keyof typeof PartOfSpeech>).map((key) => 
              <option value={PartOfSpeech[key]}>{key}</option>
          )}
        </Form.Select>
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={getDefinition}
        >
          Search
        </Button>
      </InputGroup>
      <div className="results">
        {definitions.length > 0 ? (
          <DefinitionCard word={word || ""} type={getPartString(definitions[0].type)} definitions={definitions} />
        ) : (
          <></>
        )}
        {parts.length > 0 ? (
          parts.map((part) => (
            <Button key={part + word} onClick={() => {
                if(partRef && partRef.current){
                    partRef.current.value = part;
                    getDefinition();
                }
            }}>
              {part === PartOfSpeech.Any ? "None" : part}
            </Button>
          ))
        ) : (
          <></>
        )}
        {definitions.length === 0 && parts.length === 0  ? <Card body>No results</Card>: <></>}
      </div>
    </div>
  );
}
