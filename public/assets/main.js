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

