const alerts = require('./alerts');
const IntervalChecker = require('./IntervalChecker');
const alertChange = require('./alert-change');

(async () => {

    console.log('initializing alerts...');

    alerts.forEach(run => {
        console.log(`${run.name} - ${run.secondsTimeout}`);
        new IntervalChecker(run, alertChange);
    });

    console.log('done initializing');

})();