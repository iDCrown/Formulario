const formulario = document.querySelector('.formulario');
const botonEnviar = document.querySelector('.btn-enviar');
const backgroud = document.querySelector(".background");
const errorsList = document.getElementById("errors");

const labelN = document.getElementById("label-name");
const labelE = document.getElementById("label-email");
const labelP = document.getElementById("label-phone");
const labelC = document.getElementById("label-text");

const NameContact = document.getElementsByName("name_contact")[0];
const Phone = document.getElementsByName("phone_contact")[0];
const email = document.getElementsByName("email_contact")[0];
const commit = document.getElementsByName("commit_contact")[0];


function backgroudRed() {
  backgroud.classList.remove("red")
}
function backgroudBlue() {
  backgroud.classList.remove("blue")
}
function cleanErrors() {
  errorsList.innerHTML = "";
}


async function sendMail(name, email, phone, comment) {
  const response = await fetch('https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify({name, email, phone, comment})
  });
  const content = await response.json();
  console.log(content)
}


botonEnviar.addEventListener('click', (event) => {

  cleanErrors();
    let hasErrors = false;
  backgroudRed();
    let hasbackgroudR = false;
  backgroudBlue();
    let hasbackgroudbB = false;

  event.preventDefault();

  const sanitizedName = NameContact.value.trim();
  if(sanitizedName.length === 0 || sanitizedName.indexOf(' ') < 0 ) {
    NameContact.classList.add('input-red')
    NameContact.classList.remove('input-green')
    backgroud.classList.add("red")
    labelN.classList.add("red-label")
    hasErrors = true;
  } else {
    hasbackgroudR = true;
    hasbackgroudbB = true;
    labelN.classList.remove("red-label")
    NameContact.classList.add('input-green');
  }

 const mailRe = /\w+@\w+\.\w{2,7}$/;
  if(!mailRe.exec(email.value)) {
    email.classList.add('input-red')
    email.classList.remove('input-green')
    backgroud.classList.add("red")
    labelE.classList.add("red-label")
    hasErrors = true;
  }else {
    hasbackgroudR = true;
    hasbackgroudbB = true;
    labelE.classList.remove("red-label")
    email.classList.add('input-green')
  }

  const phone = /^\+?\d{7,15}$/;
  if(!phone.exec(Phone.value)) {
    Phone.classList.add('input-red')
    Phone.classList.remove('input-green')
    backgroud.classList.add("red")
    labelP.classList.add("red-label")
    hasErrors = true
  }else {
    hasbackgroudR = true;
    hasbackgroudbB = true;
    labelP.classList.remove("red-label")
    Phone.classList.add('input-green')
  }

  const sanitizedCommit = commit.value.trim(); 
  if(sanitizedCommit.length < 20) {
    commit.classList.add('input-red')
    commit.classList.remove('input-green')
    backgroud.classList.add("red")
    labelC.classList.add("red-label")
    hasErrors = true;
  }else {
    hasbackgroudR = true;
    hasbackgroudbB = true;
    labelC.classList.remove("red-label")
    commit.classList.add('input-green')
  } 

  if(!hasErrors) {
    sendMail(sanitizedName, email.value, Phone.value, sanitizedCommit )
  }
})
