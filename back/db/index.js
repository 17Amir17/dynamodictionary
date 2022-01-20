const getWord = require("./queries/getWord");
const getWordWithType = require("./queries/getWordWithType");
const getRandomWordWithType = require('./queries/getRandomWordWithType');

(async () => {
    // console.log(await getWord('A'));
    // console.log(await getWordWithType('A', ' '));
    console.log(await getRandomWordWithType(' '));
})()

module.exports = { getWord, getWordWithType };

