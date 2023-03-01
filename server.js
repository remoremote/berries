const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Set up middleware to parse the body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the waitlist form
app.get('/waitlist', (req, res) => {
  res.send(`
    <h2>Join the Waitlist</h2>
    <form action="/waitlist" method="post">
      <label for="name">Name:</label>
      <input type="text" name="name" required>
      
      <label for="email">Email:</label>
      <input type="email" name="email" required>
      
      <label for="reason">Reason for Joining:</label>
      <textarea name="reason" rows="3" required></textarea>
      
      <input type="submit" value="Join">
    </form>
  `);
});

// Handle the waitlist form submission
app.post('/waitlist', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const reason = req.body.reason;
  
  // Create a Nodemailer transporter object using SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP server hostname
    port: 587, // Replace with your SMTP server port
    secure: false, // Upgrade later with STARTTLS
    auth: {
      user: 'your-username@example.com', // Replace with your SMTP server username
      pass: 'your-password' // Replace with your SMTP server password
    }
  });
  
  // Set up the email message
  const message = {
    from: 'your-username@example.com',
    to: 'your-email@example.com', // Replace with your email address
    subject: 'New Waitlist Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Reason for Joining: ${reason}
    `
  };
  
  // Send the email message
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.send('There was an error submitting your form. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Thank you for joining the waitlist!');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
