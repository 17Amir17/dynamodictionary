const getWord = require("./queries/getWord");
const getWordWithType = require("./queries/getWordWithType");

(async () => {
    console.log(await getWordWithType('A', 'prep.'));
})()

module.exports = { getWord, getWordWithType };

