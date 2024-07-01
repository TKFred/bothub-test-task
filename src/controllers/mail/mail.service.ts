import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailDto } from '@dto/send-mail/send-mail.dto';

@Injectable()
export class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_HOST,
            port: process.env.EMAIL_SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendMail(sendMailDto: SendMailDto): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL,
            to: sendMailDto.to,
            subject: sendMailDto.subject,
            text: sendMailDto.text,
            html: sendMailDto.html,
        };

        try {
            const emailStatus =  await this.transporter.sendMail(mailOptions);
            if (emailStatus?.accepted?.length > 0) {
                return emailStatus.response;
            }
        } catch (err) {
            throw err;
        }
    }
}