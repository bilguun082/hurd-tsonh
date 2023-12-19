const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bilguune060829@gmail.com",
    pass: "onnjfcwvivkdgxvx",
  },
});

exports.sendMail = async (req, res) => {
  const text = req.body.text;
  const user = req.body.user;
  const sender = req.body.sender;
  console.log(user, text);
  const mailOptions = {
    from: "bilguune060829@gmail.com",
    to: user,
    subject: "Hurd Tsonh",
    html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
      
    
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Хурд цонх</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>${user} тань руу шинэ пост явууллаа.</p>
        <a style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${text}</a>
        <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Koding 101 Inc</p>
          <p>1600 Amphitheatre Parkway</p>
          <p>California</p>
        </div>
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
