import React from "react";
import { Card } from "react-bootstrap";
import { Definition } from "../utils/types";

interface DefinitionProps {
  word: string;
  type: string;
  definitions: Definition[];
}

export default function DefinitionCard(props: DefinitionProps) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.word + ", " + props.type}</Card.Title>
        <Card.Text>
          {props.definitions.map((def) => (
              <Card body key={def.definition}>{def.definition}</Card>
            ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
