

const puppeteer = require('puppeteer');


let lastRCPTextContent;


(async () => {

    console.log('init');
    const browser = await puppeteer.launch({ headless: false });



    const page = await browser.newPage();
    await page.goto('https://www.realclearpolitics.com/epolls/other/president_trump_job_approval-6179.html', { waitUntil: 'load'});
    // await page.pdf({ path: 'hn.pdf', format: 'A4' });
    console.log('init');

    const newRCPTextContent = await page.evaluate(() => $$('.rcpAvg td').text());
    console.log('newRCPTextContent', newRCPTextContent);
    await browser.close();
})();