
const hitRCP = require('./hitRCP');
let lastHit;

const objEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);


const alertHit = () => {
    console.log('FIRE FIRE FIRE IN THE HOLE!');
}

(async () => {

     setInterval(async() => {

        const hit = await hitRCP();
        console.log(new Date().toLocaleTimeString());
        console.log(hit);
        console.log();
        if (lastHit && !objEqual(hit, lastHit)) {
            alertHit();
        }

     }, 3000)

})();