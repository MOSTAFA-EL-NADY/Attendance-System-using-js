

let fixedAttendTime = new Date();
fixedAttendTime.setHours(9);
fixedAttendTime.setMinutes(0);
let employee;
let getallemp = (async () => {
  let data = await fetch("http://localhost:3000/employees")
  let users = await data.json();
  employee = users;


});



let btn_abcence = document.getElementById("abcense")
let btn_register = document.getElementById("register");

let json_mail;
let usermail = document.getElementById("email");


usermail.focus();

let btn_login = document.getElementById("signin")

btn_login.addEventListener("click", async (e) => {
  await getallemp();
  if (usermail.checkValidity()) {

    if (employee.length != 0) {


      for (let i = 0; i < employee.length; i++) {

        if (employee[i].email == usermail.value) {
          let datetime = new Date();
          let dateNow = datetime.getDate() + '/' + datetime.getMonth() + 1 + '/' + datetime.getFullYear();

          let oldattend = employee[i].attend;
          let mylength = employee[i].attend.length

// check out
          if (employee[i].attend[mylength - 1].date == dateNow) {
            oldattend[mylength - 1]["out"] = datetime.getHours() + ":" + datetime.getMinutes();
            alert(`${employee[i].name} has check ou at ${dateNow} ${datetime.getHours()}:${datetime.getMinutes()}`)


          }
          else {
            // check in
            if (fixedAttendTime.getHours() < datetime.getHours() || fixedAttendTime.getMinutes() < datetime.getMinutes()) {
              let latetime = checklate();
              oldattend.push({ "date": datetime.getDate() + "/" + datetime.getMonth() + 1 + "/" + datetime.getFullYear(), "in": datetime.getHours() + ":" + datetime.getMinutes(), "late": latetime,"abcense":false })
              alert(`${employee[i].name} has attend at ${dateNow} ${datetime.getHours()}:${datetime.getMinutes()}`)
            }


          }

          fetch("http://localhost:3000/employees/" + employee[i].id, {
            method: "PATCH",
            body: JSON.stringify({
              attend: oldattend

            })
            , headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).catch(error=>alert("couldnt connect try again "))


          return false;
        }
      }

    }
    else
      alert("connection error")



  }
  else
    alert("not valid email")





})



function checklate() {
debugger
  let attendetAt = new Date();

  let lateMinites = attendetAt.getMinutes() - fixedAttendTime.getMinutes();
  let lateHours = attendetAt.getHours() - fixedAttendTime.getHours();
  if(Number(lateHours)<0 ||(Number(lateHours)==0 &&lateMinites<0)){
    return "0:0";
  }
  else
  {
    return `${lateHours}:${lateMinites}`;
  }
  
  
  console.log(lateMinites);
  console.log(lateHours);

 
}



async function setAbsence() {
  await getallemp();

  let datetime = new Date();

  let dateNow = datetime.getDate() + '/' + datetime.getMonth() + 1 + '/' + datetime.getFullYear();

  if (employee.length != 0) {
    let emp_absenceArr = await employee.filter((emp) => {
      let len = emp.attend.length - 1;
      return emp.attend[len]["date"] != dateNow

    })
    console.log(emp_absenceArr)

    // loop and add abcense true to all amp not abcence today
    await emp_absenceArr.forEach(element => {
      let len = element.attend.length - 1;
      let newattend = element.attend;
      newattend.push({ "date": dateNow, "abcense": true });


      fetch("http://localhost:3000/employees/" + element.id, {
        method: "PATCH",
        body: JSON.stringify({
          attend: newattend

        })
        , headers: {
          "Content-type": "application/json; charset=UTF-8"
        }

      })

    });




  }
  else {
    alert("failed connection")
  }

}

btn_abcence.addEventListener("click", async (e) => {

  await setAbsence();

})




