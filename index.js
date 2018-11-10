
const hitRCP = require('./hitRCP');
let lastHit;
const alertChange = require('./alertChange');
const objEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

(async () => {

     setInterval(async() => {

        const hit = await hitRCP();
        console.log(new Date().toLocaleTimeString());
        console.log(hit);
        console.log();
        if (!objEqual(hit, lastHit)) {
            alertChange(hit, lastHit);
        }
        lastHit = hit;

     }, 3000)

})();