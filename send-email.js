const gmailSend = require('gmail-send');
const { gmail: credentials } = require('./config');

const send = gmailSend({
  user: credentials.username,
  pass: credentials.password
});

module.exports = (subject, body, to = credentials.username) => new Promise((resolve, reject) => {
    console.log(`sending email...to ${to}...`);
    console.log('subject', subject, 'body', body);
    send({
        subject,
        text: body,
        to
    }, (err, res) => {
        console.log('err, ', err, 'res,', res);
        return err ? reject(err) : setTimeout(() => resolve(res), 4000)
    });
});
