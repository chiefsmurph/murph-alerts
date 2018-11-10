
const hitRCP = require('./hitRCP');
const hit581 = require('./hit581');
const alertChange = require('./alertChange');

class IntervalChecker {
    constructor({ name, fn, timeout = 5000 }) {
        const objEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
        this.lastValue = null;
        setInterval(async() => {
            const hit = await fn();
            console.log(new Date().toLocaleTimeString());
            console.log(hit);
            console.log();
            if (!objEqual(hit, this.lastValue)) {
                alertChange({
                    name,
                    curVal: hit, 
                    prevValue: this.lastValue
                });
            }
            this.lastValue = hit;
         }, timeout);
    }
}

(async () => {

    const toRun = [
        {
            name: 'RCP\'s President Trump Job Approval',
            fn: hitRCP,
        },
    ];

    toRun.forEach(run => {
        new IntervalChecker(run);
    });

})();