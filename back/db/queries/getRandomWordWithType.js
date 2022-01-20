const dynamodb = require("../dynamodb");

async function getRandomWordWithType(type) {
    const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
    console.log(letter);
  const params = {
    TableName: "Dictionary",
    //ProjectionExpression: "", //What I want back
    FilterExpression: "contains ( #word, :word ) and #type = :type", //Condition
    ExpressionAttributeNames: {
      //provides name substitution
      "#word": "word",
      "#type": "type",
    },
    ExpressionAttributeValues: {
      // provides value substitution.
      ":word": letter,
      ":type": type,
    },
    
  };

  try {
    const res = await dynamodb.scan(params).promise();
    return res;
  } catch (error) {
      console.log(error);
    return { Items: [] };
  }
}

module.exports = getRandomWordWithType;
