import nodemailer, { Transporter } from "nodemailer";
import { MAIL_USER, MAIL_PASSWORD } from "@root/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

function createPurchaseTemplateString() {}


export async function sendPurchaseConfirmationEmail(destinatary: string) {
    const isTransporterVerified = await transporter.verify();
    if (!isTransporterVerified) throw new Error("Error al verificar el transporter de nodemailer");

    const result = await transporter.sendMail({
        from: `${MAIL_USER}`,
        to: destinatary,
        subject: "Tu compra fue realizada",
        html: `
        <h1>Su compra fue registrada en el sistema con éxito</h1>
        <p>Estimado cliente, su compra ya está ingresada en el sistema y se encuentra en la cola para ser verificada manualmente</p>
        <p>Una vez la orden sea verificada manualmente, se le notificará del resultado</p>
        `
    })

    console.log("Enviando mail de confirmación de compra recibida");
    console.log(result);
}

async function sendPurchaseAcceptedEmail(destinatary: string) {}
