const https = require('https');

const fetch = require('node-fetch');

function sendNotification({ name, email, phone, category, message }) {
  return fetch('https://ntfy.sh', {
    method: 'POST',
    body: JSON.stringify({
      topic: "tantrotsav_25_wFx1OR3KQDavq",
      message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category}\nMessage: ${message}`,
      actions: [
        {
          action: "view",
          label: "Open Chat on WhatsApp",
          url: `https://wa.me/91${phone}`,
          clear: true
        }
      ]
    })
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`Failed with status code: ${response.status}`);
      }
    })
    .catch(error => {
      throw new Error(`Error: ${error.message}`);
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