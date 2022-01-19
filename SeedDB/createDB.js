// Import required AWS SDK clients and commands for Node.js
const { CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const ddbClient = require("./libs/ddClient.js");

// Set the parameters
const params = {
  AttributeDefinitions: [
    {
      AttributeName: "word", 
      AttributeType: "S", 
    },
    {
      AttributeName: "secondary", 
      AttributeType: "S", 
    },
  ],
  KeySchema: [
    {
      AttributeName: "word", 
      KeyType: "HASH",
    },
    {
      AttributeName: "secondary", 
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  TableName: "Dictionary", //TABLE_NAME
  StreamSpecification: {
    StreamEnabled: false,
  },
};

const run = async () => {
  try {
    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();