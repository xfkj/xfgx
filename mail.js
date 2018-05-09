var nodemailer = require('nodemailer');

/**
 * 发送邮件
 * @param {*} name
 * @param {*} mobile
 * @param {*} text
 */
function sendMail(name, mobile, emailContent, callback) {
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'QQex',
            auth: {
                user: 'zhouyutao@ffjy.org', // generated ethereal user
                pass: '5zytnlttxsZ'  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `${name} <zhouyutao@ffjy.org>`,
            to: 'pengpeng@ffjy.org@ffjy.org', // list of receivers
            subject: `小凡公学反馈-${name}-${mobile}`, // Subject line
            text: emailContent, // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return callback(error, '留言出现异常');
            }
            callback(null, '留言成功，谢谢🙏');
        });
    });
}

module.exports = sendMail;
