const https = require('https');

function sendNotification({ name, email, category, message }) {
  return new Promise((resolve, reject) => {
    // Format the message
    const formattedMessage = `Name: ${name}\nEmail: ${email}\nCategory: ${category}\nMessage: ${message}`;

    const topic = "tantrotsav_25_wFx1OR3KQDavq"; // Replace with your ntfy.sh topic name
    const url = `https://ntfy.sh/${topic}`;

    const options = {
      method: 'POST',
      headers: {
        'Title': 'New Ticket on Tantrotsav Website',
        'Content-Type': 'text/plain',
        'Content-Length': formattedMessage.length
      }
    };

    const req = https.request(url, options, (res) => {
      let response = '';

      // Collect response data
      res.on('data', (chunk) => {
        response += chunk;
      });

      // On end, resolve the promise
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(response);
        } else {
          reject(`Failed with status code: ${res.statusCode}`);
        }
      });
    });

    // Handle request errors
    req.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    // Write the plain text message
    req.write(formattedMessage);
    req.end();
  });
}

function sendSecurityNotification(message) {
  return new Promise((resolve, reject) => {
    const topic = "tantrotsav_25_wFx1OR3KQDavq_security";
    const url = `https://ntfy.sh/${topic}`;

    const options = {
      method: 'POST',
      headers: {
        'Title': 'Security Alert',
        'Content-Type': 'text/plain',
        'Content-Length': message.length
      }
    };

    const req = https.request(url, options, (res) => {
      let response = '';

      // Collect response data
      res.on('data', (chunk) => {
        response += chunk;
      });

      // On end, resolve the promise
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(response);
        } else {
          reject(`Failed with status code: ${res.statusCode}`);
        }
      });
    });

    // Handle request errors
    req.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    // Write the plain text message
    req.write(message);
    req.end();
  });
}

module.exports = { sendNotification, sendSecurityNotification };