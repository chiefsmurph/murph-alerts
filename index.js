
const hitRCP = require('./alerts/RCP');
const hit581 = require('./alerts/581');
const alertChange = require('./alert-change');

class IntervalChecker {
    constructor({ name, fn, secondsTimeout = 5 }) {
        const objEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
        this.lastValue = null;
        setInterval(async() => {
            const hit = await fn();
            console.log(new Date().toLocaleTimeString(), '--', name);
            if (this.lastValue && !objEqual(hit, this.lastValue)) {
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
            secondsTimeout: 25
        },
        {
            name: '581\'s President Trump Job Approval',
            fn: hit581,
            secondsTimeout: 30
        },
    ];

    toRun.forEach(run => {
        new IntervalChecker(run);
    });

})();