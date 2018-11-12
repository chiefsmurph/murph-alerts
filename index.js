
const hitRCP = require('./hitRCP');
const hit581 = require('./hit581');
const alertChange = require('./alertChange');

class IntervalChecker {
    constructor({ name, fn, secondsTimeout = 5 }) {
        const objEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
        this.lastValue = null;
        setInterval(async() => {
            const hit = await fn();
            console.log(new Date().toLocaleTimeString(), '--', name);
            if (!objEqual(hit, this.lastValue)) {
                alertChange({
                    name,
                    curVal: hit, 
                    prevValue: this.lastValue
                });
                console.log(hit);
            }
            console.log();
            this.lastValue = hit;
        }, secondsTimeout * 1000);
    }
}

(async () => {

    const toRun = [
        {
            name: 'RCP\'s President Trump Job Approval',
            fn: hitRCP,
            secondsTimeout: 10
        },
        // {
        //     name: '581\'s President Trump Job Approval',
        //     fn: hit581,
        //     secondsTimeout: 30
        // },
    ];

    toRun.forEach(run => {
        new IntervalChecker(run);
    });

})();