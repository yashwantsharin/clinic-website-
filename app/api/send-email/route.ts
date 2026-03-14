
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, phone, email, date, time, reason } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'yashwantsharin070@gmail.com', // Your clinic's email address
      subject: 'New Appointment Booking',
      html: `
        <p><strong>New Appointment Request</strong></p>
        <p><strong>Patient Name:</strong> ${name}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Appointment Date:</strong> ${date}</p>
        <p><strong>Appointment Time:</strong> ${time}</p>
        <p><strong>Reason for Visit:</strong> ${reason}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
