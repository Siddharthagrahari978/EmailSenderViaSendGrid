const socket = io();

const mailForm = document.querySelector("#mailForm")
const to = document.querySelector('#rescipient_email').value
const from_email = document.querySelector('#sender_email').value
const from_name = document.querySelector('#sender_name').value
const subject = document.querySelector('#subject').value
const text = document.querySelector('#message').value
const from = {name: from_name,email: from_email}

let responce = document.querySelector('#responce')

let msg = {
  to: to,
  from: from,
  subject: subject,
  text: text,
  html:`<strong>${text}</strong>`
}
mailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('sendMail', msg);
})
socket.on('sent', msg =>{
  responce.innerHTML = `<div class='alert alert-success' role='alert' data-mdb-color='success' >${msg}</div>`
})
socket.on('error',error =>{
  responce.innerHTML = `<div class='alert alert-danger' role='alert' data-mdb-color='danger' >Sorry we couldn't send your email</div>`
  alert('Failed to send email')
  console.log(error)
})