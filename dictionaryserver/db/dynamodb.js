// Load the AWS SDK for Node.js
import AWS from "aws-sdk";
// Set the region
AWS.config.update({ region: "us-east-1" });

// Create DynamoDB document client
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

export default dynamodb;