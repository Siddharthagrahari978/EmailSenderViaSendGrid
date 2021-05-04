//for emailer.html
const socket = io();

const mailForm = document.querySelector("#mailForm")


let responce = document.querySelector('#responce')


mailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const to = document.querySelector('#rescipient_email').value
  const subject = document.querySelector('#subject').value
  const text = document.querySelector('#message').value
  socket.emit('sendMail', to, subject, text);
})
socket.on('sent', msg =>{
  responce.innerHTML = `<div class='alert alert-success' role='alert' data-mdb-color='success' >${msg}</div>`
})
socket.on('error',error =>{
  responce.innerHTML = `<div class='alert alert-danger' role='alert' data-mdb-color='danger' >Sorry we couldn't send your email</div>`
  alert('Failed to send email')
  console.log(error)
})