const phantom = require('phantom');
 

const hit581 = async () => {
    const instance = await phantom.create([], { logLevel: 'error' });
    const page = await instance.createPage();
    // await page.on('onResourceRequested', function(requestData) {
    //     console.info('Requesting', requestData.url);
    // });

    const status = await page.open('https://projects.fivethirtyeight.com/trump-approval-ratings/');
    // console.log('status', status);

    const data = await page.evaluate(function() {
        return {
            timestamp: document.querySelector('.timestamp').textContent,
            approve: Number(document.querySelector('.approve .val').textContent),
            disapprove: Number(document.querySelector('.disapprove .val').textContent),
        };
    });
    console.log({ data });
    await instance.exit();
    return data;
};

hit581();

module.exports = hit581;