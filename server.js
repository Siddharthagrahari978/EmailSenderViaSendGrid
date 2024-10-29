require('dotenv').config();
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

//? Send Grid connection
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const app = express()
const server = http.createServer(app)
const io = socketio(server)
app.use(express.static('./public'));


//! Deploying app
const PORT = process.env.PORT
server.listen(PORT, () =>{
  console.log(`Server is live at http://localhost:${PORT}`)
})

const from = {name: 'Demo User',email: `demo${process.env.SENDER_EMAIL_DOMAIN}`}
console.log(from)

  io.on("connection", (socket) => {
    socket.on('sendMail', (to, subject, text) =>{
      let msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
        html:`<strong>${text}</strong><br><br><br><br>This email is send using<a href='https://github.com/Siddharthagrahari978/EmailSenderViaSendGrid'>Email Sender App</a> click for git repository.`
      }
      sgMail
      .send(msg)
      .then(() => {
        socket.emit('sent', `Email sent`)
      })
      .catch((error)=> {
        socket.emit('error', error)
        console.log(msg)
      }) 
    })
  })