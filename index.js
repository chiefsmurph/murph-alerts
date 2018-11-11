
const alertChange = require('./alert-change');
const alerts = require('./alerts');

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

    alerts.forEach(run => {
        new IntervalChecker(run);
    });

})();