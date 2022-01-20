const dynamodb = require('./dynamodb');


function getTypes(items){
    const types = [];
    for(const item of items){
        if(!(types.includes(item.type))){
            types.push(item.type);
        }
    }
    return types;
}

async function getWord(word){
    if(word.length > 1){
        word = word[0].toUpperCase() + word.substr(1);
    }
    const params = {
        TableName: 'Dictionary',
        //ProjectionExpression: "", //What I want back
        //FilterExpression: "", //Condition
        KeyConditionExpression: "#word = :word",
        ExpressionAttributeNames: { //provides name substitution
            "#word": "word"
        },
        ExpressionAttributeValues: { // provides value substitution.
            ":word": word
        }
    }

    try {
        const res = await dynamodb.query(params).promise();
        const types = getTypes(res.Items);
        if(types.length > 1){
            return types;
        }else{
            return res.Items;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = getWord;