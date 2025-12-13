const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

router.get('/contact', (req, res) => {
  res.render('contactPage', {
    layout: 'layout',
    title: 'Contacto',
    formData: { nombre: '', email: '', mensaje: '' },
  })
})

router.post('/contact', async (req, res) => {
  try {
    const htmlEmail = `
      <div style="
        font-family: Arial, sans-serif;
        background: #f7f7f7;
        padding: 20px;
        border-radius: 12px;
        max-width: 500px;
        margin: auto;
        border: 1px solid #e3e3e3;
      ">
        <h2 style="color: #333;">📬 Nuevo mensaje desde tu web</h2>

        <p><strong>👤 Nombre:</strong> ${req.body.nombre}</p>
        <p><strong>📧 Email:</strong> ${req.body.email}</p>
        <p><strong>💬 Mensaje:</strong></p>

        <div style="
          background: #fff;
          padding: 15px;
          border-radius: 8px;
          margin-top: 10px;
          border-left: 4px solid #4f46e5;
        ">
          ${req.body.mensaje}
        </div>

        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          Este mensaje fue enviado desde el formulario de contacto de tu sitio.
        </p>
      </div>
    `
    await transporter.sendMail({
      from: `"Web Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 Nuevo mensaje de ${req.body.nombre}`,
      html: htmlEmail,
    })

    res.redirect('/contact/success')
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: true, message: 'No se pudo enviar el mensaje' })
  }
})
router.get('/contact/success', (req, res) => {
  res.render('contactSuccess', {
    layout: 'layout',
    title: 'Mensaje enviado',
  })
})

module.exports = router
