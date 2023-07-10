# Email service

This component will be responsible for sending
emails.

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the
following environment variables to your .env file

`EMAil`

`REFRESH_TOKEN`

`CLIENT_ID`

`CLIENT_SECRET`

## Acknowledgements

- [Creating OAuth 2.0 API Credentials](https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a)

## API Reference

#### Post an email

```http
  POST /api/v1/send-mail
```

#### Body parameters

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `emailId` | `string` | **Required**. Reciptent email address |
| `subject` | `string` | Mail subject                          |
| `text`    | `string` | Email body text                       |

## Authors

- [vishnu_vp](https://github.com/Vishnuvp257)
