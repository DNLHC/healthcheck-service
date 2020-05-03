import createNotifier from './notifier';
import nodemailer from 'nodemailer';

const notifier = createNotifier({ mailer: nodemailer });

export default notifier;
