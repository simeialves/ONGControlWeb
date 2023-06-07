const nodemailer = require("nodemailer");

class EmailController {
  //#region CREATE
  static enviarEmail = async (req, res) => {
    const { destinatario, assunto, mensagem } = req.body;
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      host: "",
      port: 587,
      secure: false,
      auth: {
        user: "",
        pass: "",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "",
      to: destinatario,
      subject: assunto,
      text: mensagem,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erro ao enviar o e-mail");
      } else {
        console.log("E-mail enviado: " + info.response);
        res.send("E-mail enviado com sucesso");
      }
    });
  };
  //#endregion
}

module.exports = EmailController;
