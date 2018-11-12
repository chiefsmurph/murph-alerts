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
        console.log(new Date().toLocaleTimeString(), '--', this.name);
        console.log(hit);
        if (this.lastValue && !objEqual(hit, this.lastValue)) {
            this.onAlert({
                name: this.name,
                curVal: hit, 
                prevValue: this.lastValue,
            });
        }
        console.log();
        if (hit) {
            this.lastValue = hit;
        }
    }
    stop() {
        clearInterval(this.intervalTimeout);
    }
}

module.exports = IntervalChecker;