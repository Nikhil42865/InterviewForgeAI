const skillList = require('./skills');

const extractSkills = (text) => {
    const foundSkills = [];

    const lowerCaseText = text.toLowerCase();

    for(const skill of skillList){
        if(
            lowerCaseText.includes(skill.toLowerCase())
        ){
            foundSkills.push(skill);
        }
    }

    return foundSkills;
};

module.exports = {
    extractSkills,
}