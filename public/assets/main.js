//for index.html

const loginForm = document.querySelector('#loginForm');


let loginresponce = document.querySelector('#loginresponce');

loginForm.addEventListener('submit', (event)=> {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  //alert(password)
  if(username == 'demo'){
    if(password == 'demo'){
      location.href='/emailer'
    }else{
      loginresponce.innerHTML = `<div class='alert alert-danger' role='alert' data-mdb-color='danger' >Wrong Password</div>`
    }
  }else{
    loginresponce.innerHTML = `<div class='alert alert-danger' role='alert' data-mdb-color='danger' >There is something wrong with you provided credentials.</div>`
  }
})

//for emailer.html
const socket = io();

const mailForm = document.querySelector("#mailForm")
const to = document.querySelector('#rescipient_email').value
const subject = document.querySelector('#subject').value


const text = document.querySelector('#message').value

let responce = document.querySelector('#responce')


mailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('sendMail', {to, subject, text});
})
socket.on('sent', msg =>{
  responce.innerHTML = `<div class='alert alert-success' role='alert' data-mdb-color='success' >${msg}</div>`
})
socket.on('error',error =>{
  responce.innerHTML = `<div class='alert alert-danger' role='alert' data-mdb-color='danger' >Sorry we couldn't send your email</div>`
  alert('Failed to send email')
  console.log(error)
})