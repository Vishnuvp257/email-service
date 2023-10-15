require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const OAuth2 = google.auth.OAuth2;

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('../views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// creating the transporter
const createTransporter = async () => {

    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    )

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log(err);
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        },

    });

    // use a template file with nodemailer

    transporter.use('compile', hbs(handlebarOptions))


    return transporter;
}

module.exports = createTransporter;
