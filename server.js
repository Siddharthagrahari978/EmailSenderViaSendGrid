const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const moment = require('moment')
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
        console.log(`Email sent at ${moment().format('h:mm a')}`)
        socket.emit('sent', `Email sent at ${moment().format('h:mm a')}`)
      })
      .catch((error)=> {
        console.log(error)
        socket.emit('error', error)
      }) 
    })
  })