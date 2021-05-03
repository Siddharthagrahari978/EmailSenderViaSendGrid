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


function formatDateTimeForUser (date) {
  var userTZ,     // user specified TZ like Europe/Berlin
      userTZoffset, // tzOffset we got from login form
      userDateFormat,  // user specified date format (or default)
      userTimeFormat; // user specified time format (or default)

  if (userTZ)
      return moment(date).tz(userTZ).format(userDateFormat+' '+userTimeFormat+' zz');
  else
      return moment(date).utcOffset(userTZoffset).format(userDateFormat+' '+userTimeFormat+' ZZ');
}


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