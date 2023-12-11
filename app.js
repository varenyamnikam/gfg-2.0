const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Start Express App
const app = express();
app.enable('trust-proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Environment
dotenv.config({
  path: './.env',
});

// Bodyparser
app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(express.urlencoded({ extended: true }));

// Importing all the data
const {
  coreData,
  techData,
  designData,
  marketingData,
  socialData,
  eventsData,
  prData,
} = require('./data/import-data');

app.get('/', (req, res) => {
  res.status(200).render('index', {
    cores: coreData,
    techs: techData,
    designs: designData,
    marketings: marketingData,
    socials: socialData,
    events: eventsData,
    prs: prData,
  });
});

app.post('/sendMail', async (req, res) => {
  try {
    console.log(req.body);
    const { name, phone, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const msg = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`;

    const mailConfig = {
      from: 'gfgscpccoer@gmail.com',
      to: 'gfgscpccoer@gmail.com',
      subject: subject,
      text: msg,
    };

    await transporter.sendMail(mailConfig);

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'An error occured',
    });
  }
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 🎇 Shutting down...');
  console.log(err);
  process.exit(1);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 🎇 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
