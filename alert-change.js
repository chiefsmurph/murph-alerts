
const sendEmail = require('./send-email');

const templateObj = obj => obj ? Object.keys(obj).reduce((acc, key) => `${acc}${key}: ${obj[key]}\n`, '') : 'no data at this time';

const allEmails = [
    '5102940361@vtext.com',
    '9254081895@msg.fi.google.com'
];

module.exports = async ({ name, curVal, prevVal }) => {

    const sendAlertsToSingleNumber = async email => {
        const sendToNumber = body => sendEmail('Murph-Alerts', body, email);
    
        const messages = [
            `New value for ${name}`,
            `CURRENT VALUE\n----------------\n${templateObj(curVal)}`,
            ...(prevVal ? [`PREVIOUS VALUE\n----------------\n${templateObj(prevVal)}`] : []),
        ];
        
        for (let m of messages) {
            await sendToNumber(m);
        }
    
    };

    for (let email of allEmails) {
        sendAlertsToSingleNumber(email);
    }
};