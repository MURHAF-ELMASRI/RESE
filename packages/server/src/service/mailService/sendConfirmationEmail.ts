import transport from "./mailService";
import process from "process";

function sendConfirmationEmail(
  fullName: string,
  email: string,
  confirmationCode: string
) {
  console.log("Check");
  transport
    .sendMail({
      from: process.env.mail,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${fullName}</h2>
          <p>Thank you for subscribing. your confirmation code is</p>
           <h3>${confirmationCode}</h3>
          </div>`,
    })
    .catch((err) => console.log({ nodeMailerError: err }));
}

export default sendConfirmationEmail;
