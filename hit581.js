
const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async () => {

    const options = {
        uri: 'https://projects.fivethirtyeight.com/trump-approval-ratings/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const $ = await rp(options)
    const text = $('script')[0].text();
    const str = text.substr(text.indexOf('{'), text.indexOf('}'));
    console.log(JSON.parse(str));
};