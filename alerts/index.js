const hitRCP = require('./hit-RCP');
const hit581 = require('./hit-581');

module.exports = [
    {
        name: 'RCP\'s President Trump Job Approval',
        fn: hitRCP,
        secondsTimeout: 25
    },
    {
        name: '581\'s President Trump Job Approval',
        fn: hit581,
        secondsTimeout: 30
    }
];