// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });

// Create DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

//Load json
const dictionary = require("./dictionary.json");

function createSingleParams(item) {
  return {
    PutRequest: {
      Item: {
        word: item.WORD,
        type: item.TYPE || " ",
        definition: item.DEFINITION,
      },
    },
  };
}

function createBatchParams(items) {
  return {
    RequestItems: {
      Dictionary: items.map((item) => createSingleParams(item)),
    },
  };
}

async function writeBatch(batch) {
  try {
    const params = createBatchParams(batch);
    await dynamodb.batchWrite(params).promise();
  } catch (error) {
    console.log(error);
  }
}

async function run() {
  const Batch_Size = 25;
  let batch = [];
  for (let i = 0; i < dictionary.length; i++) {
    if ((i + 1) % (Batch_Size + 1) === 0) {
      await writeBatch(batch);
      batch = [];
    } else {
      batch.push(dictionary[i]);
    }
  }
}

run();
