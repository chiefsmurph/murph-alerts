
const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = async () => {

    const options = {
        uri: 'https://www.realclearpolitics.com/epolls/other/president_trump_job_approval-6179.html',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const $ = await rp(options)
    const getTdText = i => $('.rcpAvg td').eq(i).text();
    return {
        date: getTdText(1),
        approve: Number(getTdText(3)) + '%',
        disapprove: Number(getTdText(4)) + '%',
        spread: Number(getTdText(5)) + '%'
    };
};