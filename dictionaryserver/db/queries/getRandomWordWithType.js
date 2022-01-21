import dynamodb from "../dynamodb";

async function getRandomWordWithType(type, letter='ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]) {
  console.log(letter);
  const params = {
    TableName: "Dictionary",
    //ProjectionExpression: "", //What I want back
    FilterExpression: "begins_with  ( #word, :word ) and #type = :type", //Condition
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
    return res.Items[Math.floor(Math.random() * (res.Items.length))];
  } catch (error) {
      console.log(error);
    return { Items: [] };
  }
}

export default getRandomWordWithType;
