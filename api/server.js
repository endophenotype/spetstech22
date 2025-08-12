import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../server/.env') });
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Loaded' : 'Not Loaded');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded' : 'Not Loaded');

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'yandex',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/send-call-request', (req, res) => {
  const { name, phone, preferredTime, question } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'tima.golubev@mail.ru',
    subject: 'Новая заявка на звонок',
    html: `
      <h2>Новая заявка на обратный звонок</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Удобное время:</strong> ${preferredTime || 'не указано'}</p>
      <p><strong>Вопрос:</strong> ${question || 'не указан'}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('Nodemailer response:', error.response);
      }
      return res.status(500).send({ message: 'Error sending email', error: error.message });
    }
    console.log('Email sent:', info.response);
    res.status(200).send({ message: 'Email sent successfully' });
  });
});

app.post('/api/send-calculator-request', (req, res) => {
  const { name, phone, material, volume, address } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'tima.golubev@mail.ru',
    subject: 'Новая заявка на расчёт стоимости',
    html: `
      <h2>Новая заявка на расчёт стоимости</h2>
      <p><strong>Имя:</strong> ${name || 'не указано'}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Материал:</strong> ${material}</p>
      <p><strong>Объём:</strong> ${volume} м³</p>
      <p><strong>Адрес доставки:</strong> ${address}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('Nodemailer response:', error.response);
      }
      return res.status(500).send({ message: 'Error sending email', error: error.message });
    }
    console.log('Email sent:', info.response);
    res.status(200).send({ message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});