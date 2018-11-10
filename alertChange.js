
const sendEmail = require('./send-email');


const templateObj = obj => obj ? Object.keys(obj).reduce((acc, key) => `${acc}${key}: ${obj[key]}\n`, '') : 'no data at this time';

const allEmails = [
    '5102940361@vtext.com',
    'chiefsmurph@gmail.com',
    '9254081895@msg.fi.google.com'
];

module.exports = async (curVal, prevVal) => {

    const sendAlertsToSingleNumber = async email => {
        const sendToNumber = body => sendEmail('RCP Alerts', body, email);
    
        const messages = [
            'The RCP value has changed for President Trump Job Approval',
            `CURRENT VALUE\n----------------\n${templateObj(curVal)}`,
            `PREVIOUS VALUE\n----------------\n${templateObj(prevVal)}`,
        ];
        
        for (let m of messages) {
            await sendToNumber(m);
        }
    
    };

    for (let email of allEmails) {
        sendAlertsToSingleNumber(email);
    }
};