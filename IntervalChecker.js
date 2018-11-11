

class IntervalChecker {
    constructor({ name, fn, secondsTimeout = 5 }, onAlert = () => {}) {
        const objEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
        this.lastValue = null;
        setInterval(async() => {
            const hit = await fn();
            console.log(new Date().toLocaleTimeString(), '--', name);
            console.log(hit);
            if (this.lastValue && !objEqual(hit, this.lastValue)) {
                onAlert({
                    name,
                    curVal: hit, 
                    prevValue: this.lastValue,
                });
            }
            console.log();
            this.lastValue = hit;
        }, secondsTimeout * 1000);
    }
}

module.exports = IntervalChecker;