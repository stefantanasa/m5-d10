import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async () => {
  try {
    const message = {
      to: "liketanasa@gmail.com",
      from: "liketanasa@gmail.com",
      text: "some text",
      subject: "the subject",
      html: "<stron>hsadaj</strong>",
    };
    await sgMail.send(message);
  } catch (error) {
    console.log(error);
  }
};
