import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// export const sendEmail = async () => {
//   try {
//     const message = {
//       to: "liketanasa@gmail.com",
//       from: "liketanasa@gmail.com",
//       text: "some text",
//       subject: "the subject",
//       html: "<stron>hsadaj</strong>",
//     };
//     await sgMail.send(message);
//   } catch (error) {
//     console.log(error);
//   }
// };

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendRegistrationEmail = async (recipientAddress) => {
  const msg = {
    to: recipientAddress,
    from: process.env.FROM,
    subject: "THIS IS OUR FIRST EMAIL WITH SENDGRID",
    text: "bla bla bla",
    html: "<strong>bla bla bla</strong>",
  };

  await sgMail.send(msg);
};
