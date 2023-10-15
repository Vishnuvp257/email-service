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

    // if (!Array.isArray(emailId)) arr = [emailId]

    // for (let email of arr) {

    //     const { valid, reason, validators } = await isEmailValid(email);

    //     if (!valid)
    //         return res.status(400).send({
    //             message: "Please provide a valid email address.",
    //             incorrectEmail: email,
    //             reason: validators[reason].reason
    //         })
    // }

    next();
}

exports.checkType = (req, res, next) => {

    const type = req.params.type;
    req.body.type = type;

    next();
}

const setEmailOptions = (body) => {

    const emailOptions = {
        subject: body.subject,
        to: body.emailId,
        template: body.type ? body.type : 'index',
        context: {
            text: body.text,
            ...body.data,
        },
        attachments: body.attachments ? body.attachments : ""
    };

    return emailOptions;
}

exports.postEmail = async (req, res) => {
    
    try {
        let emailTransporter = await createTransporter();
        const emailOptions = setEmailOptions(req.body);

        emailTransporter.sendMail(emailOptions);

        res.status(200).json({ message: 'sended' })
    } catch (e) {
        res.status(404).json({ message: "failed", error: e });
    }
}