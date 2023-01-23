let username = document.getElementById("validationCustom01")
let useremail = document.getElementById("email")
let password = document.getElementById("validationCustom03")
let age =document.getElementById("age");
let submet = document.getElementById("submit");
var myemails = [];
username.focus();

username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail)
password.addEventListener("blur", validatePassword)


function validateUsername() {
  const reSpaces = /^\S*$/;
  if (reSpaces.test(username.value)) {
    username.classList.remove('is-invalid');
    username.classList.add('is-valid');
    return true;
  } else {
    username.focus();
    username.classList.remove('is-valid');
    username.classList.add('is-invalid');
    return false;
  }
}


function validateEmail() {
  const reg = /^([a-zA-Z0-9_\-?\.?]){3,}@([a-zA-Z]){3,}\.([a-zA-Z]){2,5}$/;

  if (reg.test(useremail.value) && reg.test(email.value)) {
    useremail.classList.remove('is-invalid');
    email.classList.add('is-valid');

    return true;
  } else {
    useremail.focus();
    useremail.classList.add('is-invalid');
    useremail.classList.remove('is-valid');

    return false;
  }
}

function validatePassword() {
  const reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])/;
  if (reg.test(password.value) && reg.test(password.value)) {
    password.classList.remove('is-invalid');
    password.classList.add('is-valid');

    return true;
  } else {
    password.focus();
    password.classList.add('is-invalid');
    password.classList.remove('is-valid');

    return false;
  }
}





const forms = document.querySelectorAll('.needs-validation')[0];
console.log(forms)

submet.addEventListener("click", (e) => {
 
  e.preventDefault();
  e.stopPropagation();

  if (!forms.checkValidity() || !validateEmail() || !validateUsername || !validatePassword) {
   

    forms.classList.add('was-validated')


  }
  else {

       if(!isMailvalid())
       {
        alert("this email has been used  try another mail")
       
       }
       // user has enter  valid data 
       else
       {
       fetch("http://localhost:3000/employees",{
    method:"POST",
    body:JSON.stringify({
        
        "name":username.value,
        "password":password.value,
        "age":age.value,
        "position":"temp",
        "email":useremail.value,
        "attend":[]
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}).then(response => response.json()).finally(()=>{window.open("../../../view/login/login.html");
})

  
  
   
 
       
    
       }

   
  }




})

const getMailsData = async () => {

  const response = await fetch("http://localhost:3000/employees");
  const jsonData = await response.json();

  
  myemails = jsonData;





}

getMailsData();

function isMailvalid() {
  if(myemails.length>0)
  {
    for(let i =0;i<myemails.length;i++)
  {
    if(myemails[i].email==useremail.value)
    {
      return false;
    }  
    
  }


}
else
{
  alert("no data found");
}
return true;  
}




