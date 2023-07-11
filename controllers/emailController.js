const emailValidator = require('deep-email-validator');
const createTransporter = require('../config/mail.config');

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

exports.checkEmail = async (req, res, next) => {

    const { emailId } = req.body;
    let arr = emailId

    if (!emailId)
        return res.status(400).json({ message: 'Reciptent Email Missing' });

    if (!Array.isArray(emailId)) arr = [emailId]

    for (let email of arr) {

        const { valid, reason, validators } = await isEmailValid(email);

        if (!valid)
            return res.status(400).send({
                message: "Please provide a valid email address.",
                incorrectEmail: email,
                reason: validators[reason].reason
            })
    }

    const messageOptions = {
        subject: req.body.subject,
        text: req.body.text,
        to: req.body.emailId,
        from: process.env.EMAIL
    };

    req.body = messageOptions;

    next();
}

const sendEmail = async (messageOptions) => {
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(messageOptions);
};

exports.postEmail = (req, res) => {

    try {
        sendEmail(req.body);
        res.status(200).json({ message: 'done' })
    } catch (e) {
        res.status(404).json({ message: "failed" });
    }
}