let allusers;

let tbody =document.querySelector("#table_body");
let thead =document.querySelector("#table_headers")
let btn_getemp_info=document.querySelectorAll(".btn_reports")[0]
let btn_getDayreport=document.querySelectorAll(".btn_reports")[1]
let btn_getabcense=document.querySelectorAll(".btn_reports")[2]
let btn_getLateReport=document.querySelectorAll(".btn_reports")[3]


console.log(tbody);
console.log(btn_getLateReport)

let getallemp = (async () => {
  let data = await fetch("http://localhost:3000/employees")
  let users = await data.json();
  allusers = users;


});



   window.addEventListener("load",async(e)=>{
   
    await getallemp();
    let headers ="<tr><td>full name</td><td>Email</td><td>Age</td><td>job</td><td>date</td></tr>"
    thead.innerHTML=headers

    btn_getemp_info.addEventListener("click",async()=>{
      tbody.innerHTML="";
      let headers ="<tr><td>full name</td><td>Email</td><td>Age</td><td>job</td><td>date</td></tr>"
      thead.innerHTML=headers
      employeeInfo()
    $('#datatablesSimple').DataTable()
    })

    
   
   
   })
  

  

   function employeeInfo(){
    allusers.forEach(user => {
               
        let tr = document.createElement("tr");
        let names =document.createElement("td");
        let email=document.createElement("td");
        let date =document.createElement("td");
        let age =document.createElement("td");
        let job =document.createElement("td");
      
        age.innerText=user.age;
        job.innerText=user.position;
        date.innerText=user.attend[0].date;
        names.innerText=user.name;
        email.innerText=user.email;
         
        tr.appendChild(names);
        tr.appendChild(email);
        tr.appendChild(age);
        tr.appendChild(job);
        tr.appendChild(date);
       
       
         tbody.appendChild(tr);
        


})
   }

   function getDayreport(){
    
   }