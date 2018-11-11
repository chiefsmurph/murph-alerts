

const puppeteer = require('puppeteer');
module.exports = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
     });

    const page = await browser.newPage();
    await page.goto('https://projects.fivethirtyeight.com/trump-approval-ratings/', { waitUntil: 'load'});
    const data = await page.evaluate(() => ({
        timestamp: document.querySelector('.timestamp').textContent,
        approve: Number(document.querySelector('.approve .val').textContent),
        disapprove: Number(document.querySelector('.disapprove .val').textContent),
    }));
    await browser.close();
    return data;
};