import {Employee} from "../../../modules/Employee.js";


let e1 =new Employee("abas",15,"dep1","ceo",[{date:"1/1/2022",attend:"9.45",departure:"3"}]);

console.log(e1.Name);




var tbody = document.getElementById("tbody");

fetch("http://localhost:3000/employees").then((allusersdata)=>{
 return allusersdata.json();
 
 
}).then((allusers)=>{
  allusers.forEach(user => {
            let tr = document.createElement("tr");
            let names =document.createElement("td");
            let date =document.createElement("td");
            let atend =document.createElement("td");
            let departeure =document.createElement("td");
            atend.innerText=user.attend[0].in;
            departeure.innerText=user.attend[0].out;
            date.innerText=user.attend[0].date;
            names.innerText=user.name;
             
            tr.appendChild(names);
            tr.appendChild(date);
            tr.appendChild(atend);
            tr.appendChild(departeure);
            if(Number(user.attend[0].in)>9)
            {
                tr.style.backgroundColor="Crimson";
            }
            else
            tr.style.backgroundColor="CornflowerBlue";
              tbody.appendChild(tr);
    
    
            
          });   

}).catch(Error+"this is error")



// fetch("http://localhost:3000/employees",{
//     method:"POST",
//     body:JSON.stringify({
        
//         "name":e1.Name,
//         "attend":e1.Attendence_info
//     }),
//     headers: {
//         "Content-type": "application/json; charset=UTF-8"
//     }
// }).then(response => response.json())
 
//  // Displaying results to console
//  .then(json => console.log(json));