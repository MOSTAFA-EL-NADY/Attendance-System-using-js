
let btn_register = document.getElementById("register");


let json_mail;
let json_pass;
 
let usermail =document.getElementById("email");
let userpass =document.getElementById("pass");
 
usermail.focus();


let btn_login=document.getElementById("signin")


function validation(){
  let ismailvalid= usermail.checkValidity();
  let ispassvalid=userpass.checkValidity();

  if(ismailvalid && ispassvalid)
  {
      
   
    checkvalidation();
 
    if(usermail.value!=json_mail)
   {
    alert("Not Valid email");
    return false;
   }
   
    else if(usermail.value==json_mail &&userpass.value!=json_pass)
    {
      alert("you entered wrong password")
      return false;
    }
    
   else if(usermail.value==json_mail && userpass.value==json_pass)
   {
      
       return true;
     
   }
   else
   alert("not valid data")
  
   
  }
  return false;

}

btn_login.addEventListener("click",(e)=>{
  
  if(validation())
  {
    window.close(true);
    window.open("../../../view/home/main_page.html");
  }
 
 
 return false;
   
    
   
 
 
},)


btn_register.addEventListener("click",()=>{
window.location.href="../../../view/register/register.html";

})


function checkvalidation(){

    const xhr =new XMLHttpRequest();
  
       xhr.open("GET","http://localhost:3000/employees?email="+usermail.value,false)
     
      
    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          let jsonData=JSON.parse(xhr.responseText);
          json_mail=jsonData[0].email;
          json_pass=jsonData[0].password;
         
        }
      }
      else
      {
        alert("check your connection");
      }
    };
    
    xhr.send()  
        
       
      }
    
   