import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  const { message, face }: any = req.body;
  const faceStatus = face ? "Me gusta" : "No me gusta";

  try {
    await formData({ message, faceStatus });
    return;
  } catch (err: any) {
    console.error(`Error al enviar el mensaje: ${err.message}`);
    return NextResponse.json(
      { message: "Error al enviar email de feedback" },
      { status: 500 }
    );
  }
}
async function formData(data: { message: string; faceStatus: string }) {
  const { message, faceStatus } = data,
    emailConfig = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "gioliotta.io@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    emailMessage = {
      from: "gioliotta.io@gmail.com",
      to: "gioliotta.io@gmail.com",
      subject: "Feedback sobre lymbrarie",
      html: `
      <main style="text-align:start;font-family:Arial">
        <div style="display:flex;flex-direction:row;justify-center:center;align-items:start;width:80%;min-height:400px">
          <p style="text-align:start">
          ${faceStatus}
          <br />
          ${message}
          </p>
      </main>
      `,
    };

  try {
    const transporter = nodemailer.createTransport(emailConfig);
    await transporter.sendMail(emailMessage);
  } catch (err: any) {
    console.error(`Error al enviar email de feedback: ${err.message}`);
  }
}
