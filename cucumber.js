// cucumber.js
module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        format: ['@serenity-js/cucumber'],
        formatOptions: {
            specDirectory: 'frontend/features'
        }
    }
};