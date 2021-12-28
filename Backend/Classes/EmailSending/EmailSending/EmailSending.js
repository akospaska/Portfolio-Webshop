const mailjet = require("node-mailjet").connect("Secret key", "Secret key 2");

class EmailSending {
  async sendEmail(toEmail, subject, htmlText) {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "brutalbracsa@gmail.com",
            Name: "Akos Paska",
          },
          To: [
            {
              Email: toEmail,
              Name: "",
            },
          ],
          Subject: subject,
          TextPart: "Reference webshop email",
          HTMLPart: htmlText,
          CustomID: "AppGettingStartedTest",
        },
      ],
    });

    const something = request.body;

    return something;
  }
}

module.exports = EmailSending;
