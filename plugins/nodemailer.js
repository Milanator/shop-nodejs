import nodemailer from "nodemailer";

export default nodemailer.createTransport({
  host: "smtp.m1.websupport.sk",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "info@imperioom.sk",
    pass: "Xf1#x&~n8$",
  },
});
