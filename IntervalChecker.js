const objEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

class IntervalChecker {
    constructor({ name, fn, secondsTimeout = 5 }, onAlert = () => {}) {
        this.name = name;
        this.fn = fn;
        this.secondsTimeout = secondsTimeout;
        this.onAlert = onAlert;
        this.lastValue = null;
        this.intervalTimeout = null;
        this.start();
    }
    start() {
        this.intervalTimeout = setInterval(
            () => this.hit(), 
            this.secondsTimeout * 1000
         );
    }
    async hit() {
        const hit = await this.fn();
        if (!hit) return;
        console.log(new Date().toLocaleTimeString(), '--', this.name);
        console.log(hit);
        if (this.lastValue && !objEqual(hit, this.lastValue)) {
            const changeObj = {
                name: this.name,
                curVal: hit, 
                prevValue: this.lastValue,
            };
            console.log('ALERT!', changeObj);
            this.onAlert(changeObj);
        }
        console.log();
        this.lastValue = hit;
    }
    stop() {
        clearInterval(this.intervalTimeout);
    }
}

module.exports = IntervalChecker;