import sgMail from '@sendgrid/mail';
// import pdf from 'html-pdf';
import ejs from 'ejs';
import path from 'path';


sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

// export const generateOTP = () => {
//   let digits = '0123456789';
//   let OTP = '';
//   for (let i = 0; i < 4; i++) {
//     OTP += digits[Math.floor(Math.random() * digits.length)];
//   }
//   return OTP;
// };

// export const sendBookingEmail = (booking) => {
//   const templatePath = path.resolve('./templates/booking.ejs');
//   ejs.renderFile(templatePath, { booking }, (err, html) => {
//     if (err) {
//       console.error('Error rendering EJS:', err);
//       return;
//     }

//     const options = { format: 'A4' };
//     pdf.create(html, options).toBuffer((err, buffer) => {
//       if (err) {
//         console.error('Error generating PDF:', err);
//         return;
//       }

//       const msg = {
//         to: 'user@example.com', // Change to your recipient
//         from: 'your_email@example.com', // Change to your verified sender
//         subject: 'Booking Confirmation',
//         text: `Your booking is confirmed. Please find the attached PDF for details.`,
//         attachments: [
//           {
//             content: buffer.toString('base64'),
//             filename: 'booking.pdf',
//             type: 'application/pdf',
//             disposition: 'attachment',
//           },
//         ],
//       };

//       sgMail.send(msg)
//         .then(() => console.log('Email sent'))
//         .catch((error) => console.error('Error sending email:', error));
//     });
//   });
// };

export const sendEmail = async() => {
        // Create transporter object using Gmail SMTP
 
}
