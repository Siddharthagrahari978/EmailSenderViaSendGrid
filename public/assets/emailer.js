//for emailer.html
const socket = io();

const mailForm = document.querySelector("#mailForm")

const formContainer = document.querySelector('.formContainer');

let responce = document.querySelector('#responce')


mailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const to = document.querySelector('#rescipient_email').value
  const subject = document.querySelector('#subject').value
  const text = document.querySelector('#message').value
  socket.emit('sendMail', to, subject, text);
})
socket.on('sent', msg =>{
  formContainer.style.display = 'none';
  responce.innerHTML = `<div class='alert alert-success' role='alert' data-mdb-color='success' >${msg}</div>
  <button id='sendAnother' onClick='sendAnother()' class="btn btn-success btn-block mb-4">Send Another</button>`
})
socket.on('error',error =>{
  responce.innerHTML = `<div class='alert alert-danger' role='alert' data-mdb-color='danger' >Sorry we couldn't send your email</div>`
  alert('Failed to send email')
  console.log(error)
})

function sendAnother() {
  formContainer.style.display = 'block'
  responce.innerHTML = ''
  document.querySelector('#rescipient_email').value = null
  document.querySelector('#subject').value = null
  document.querySelector('#message').value = null

}