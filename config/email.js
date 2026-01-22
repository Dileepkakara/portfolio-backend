const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

// HTML Email Template
const getEmailTemplate = (name, email, message, phone) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
          }
          .container {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 30px;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
            margin: -30px -30px 30px -30px;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            margin: 20px 0;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-left: 4px solid #667eea;
            border-radius: 4px;
          }
          .field label {
            font-weight: bold;
            color: #667eea;
            display: block;
            margin-bottom: 5px;
          }
          .field value {
            color: #333;
            display: block;
          }
          .message-box {
            background-color: #f0f0f0;
            border-radius: 4px;
            padding: 15px;
            margin: 20px 0;
            border-left: 4px solid #764ba2;
          }
          .message-box label {
            font-weight: bold;
            color: #764ba2;
            display: block;
            margin-bottom: 10px;
          }
          .message-box p {
            margin: 0;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #999;
            font-size: 12px;
          }
          .badge {
            display: inline-block;
            background-color: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📨 New Message Received!</h2>
          </div>
          
          <div class="content">
            <p>Hello Dileep,</p>
            <p>You have received a new message from your portfolio website. Here are the details:</p>
            
            <div class="field">
              <label>Name:</label>
              <value>${name}</value>
            </div>
            
            <div class="field">
              <label>Email:</label>
              <value>${email}</value>
            </div>
            
            ${phone ? `
            <div class="field">
              <label>Phone:</label>
              <value>${phone}</value>
            </div>
            ` : ''}
            
            <div class="message-box">
              <label>Message:</label>
              <p>${message}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              <span class="badge">⏰ Received on ${new Date().toLocaleString()}</span>
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated email from your portfolio website.</p>
            <p>Please do not reply to this email. Reply directly to the sender's email address.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send email function
const sendContactEmail = async (name, email, message, phone) => {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
            subject: `New Contact Message from ${name}`,
            html: getEmailTemplate(name, email, message, phone),
            replyTo: email,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendContactEmail, transporter };
