const dynamodb = require('../dynamodb');


async function getWordWithType(word, type){
    if(word.length > 1){
        word = word[0].toUpperCase() + word.substr(1);
    }
    const params = {
        TableName: 'Dictionary',
        //ProjectionExpression: "", //What I want back
        FilterExpression: "#type = :type", //Condition
        KeyConditionExpression: "#word = :word",
        ExpressionAttributeNames: { //provides name substitution
            "#word": "word",
            "#type": "type",
        },
        ExpressionAttributeValues: { // provides value substitution.
            ":word": word,
            ":type": type,
        }
    }

    try {
        const res = await dynamodb.query(params).promise();
        return res;
    } catch (error) {
        return {Items: []};
    }
}

module.exports = getWordWithType;