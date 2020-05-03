export default function createNotifier({ mailer }) {
  return async function ({ subject, text }) {
    // TODO: Manage email transport
    console.log(`Sending an email subject: ${subject}, text: ${text}`);
  };
}
