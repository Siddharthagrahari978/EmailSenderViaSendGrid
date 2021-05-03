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



  io.on("connection", (socket) => {
    socket.on('sendMail', msg =>{
      sgMail
      .send(msg)
      .then(() => {
        socket.emit('sent', `Email sent`)
      })
      .catch((error)=> {
        socket.emit('error', error)
      }) 
    })
  })