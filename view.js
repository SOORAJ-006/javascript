const url =new URL(window.location.href);
const id = url.searchParams.get("id");
console.log("received id is => " , id);


viewEmployee(id);
// showEmployeeData(id);

function viewEmployee(id){
    fetch(`http://localhost:3000/employees/${id}` , {
    method: "GET" ,
    headers: {
        "Content-Type": "application/json",
    },
}) 
.then((response) => response.json())
.then((data) => {
    console.log(data);

    let name = data.salutation + " " + data.firstName + " " + data.lastName ;
        document.getElementById('name').innerHTML = name;
        document.getElementById('email').innerHTML = data.email;
        document.getElementById('phone').innerHTML = data.phone;
        document.getElementById('username').innerHTML = data.username;
        document.getElementById('address').innerHTML = data.address;
        document.getElementById('qualification').innerHTML = data.qualifications;
        document.getElementById('gender').innerHTML = data.gender
        document.getElementById('dob').innerHTML = data.dob;
        document.getElementById('age').innerHTML = data.dob;

     
        // viewEmployeeImage

        const image = document.getElementById('viewEmpImg');
        image.src = `http://localhost:3000/employees/${id}/avatar`
    })
console.log("function add id = " + id);
}
// end----------------------------------------------

// edit employee
//  edit employee Get

// editEmployee(id);
let editbtn = document.getElementById("editBtn");
editbtn.addEventListener("click",() =>{
    editEmployee(id);
}) 
    

function editEmployee(id){

    console.log("employee id = " + id);
 
    let a = document.getElementById('empEdit')
    a.style.display = "block";
   let b = document.getElementById('content')
   b.style.filter = "blur(3px)";
 
 //   fetching data from json and planting it to empEdit
 
 fetch(`http://localhost:3000/employees/${id}` , {
     method: "GET" ,
     headers: {
         "Content-Type": "application/json",
     },
 }) //getting all the data in the id
     .then((response) => response.json())
     .then((data) => {
         console.log(data); //displaying all the data
 
         document.getElementById('editSalutation').value = data.salutation;
         document.getElementById('editFirstName').value = data.firstName;
         document.getElementById('editLastName').value = data.lastName;
         document.getElementById('editEmail').value = data.email;
         document.getElementById('editPhone').value = data.phone;
         document.getElementById('editUserName').value = data.username;
         document.getElementById('editPassword').value = data.password; 
         document.getElementById('editAddress').value = data.address;
         document.getElementById('editQualification').value = data.qualifications;
         document.getElementById('editCountry').value = data.country;
         document.getElementById('editState').value = data.state;
         document.getElementById('editCity').value = data.city;
         document.getElementById('editPin').value = data.pin;
         
         // dob change
 
         
        const [day , month , year ] = data.dob.split("-");
        const newDob = `${year}-${month}-${day}`;
        document.getElementById('editDob').value = newDob;
 
         // gender  
 
         document.querySelector(`input[name='editGender'][value='${data.gender}']`).checked = true;


     })

    //  image preview in edit employee form

    const editpreview = document.getElementById('viewEditEmpImg')
    editpreview.src = `http://localhost:3000/employees/${id}/avatar`;
 
     let editsubmit = document.getElementById("saveEdit");
     editsubmit.addEventListener("click",() =>{
         saveChanges(id);
     }) 
 }
 
 function avatarPreviewView(){
    const preview = document.getElementById("viewEditEmpImg");
    preview.src = URL.createObjectURL(event.target.files[0]);

}
 // posting edited data to json
 
 function saveChanges(id){
     console.log(id);

     if (
        salutationValidation("editSalutation") &&
        firstNameValidation('editFirstName') &&
        lastNameValidation('editLastName') &&
        emailValidation('editEmail') &&
        dobValidation('editDob') &&
        phoneValidation('editPhone') &&
        genderValidation() &&
        addressValidation('editAddress') &&
        countryValidation('editCountry') &&
        stateValidation('editState') &&
        cityValidation('editCity') &&
        pinValidation('editPin') &&
        usernameValidation('editUserName') &&
        passwordValidation('editPassword') &&
        qualificationsValidation('editQualification')
      ) { 
 
     const salutation = document.getElementById("editSalutation").value;
     const firstName = document.getElementById("editFirstName").value;
     const lastName = document.getElementById("editLastName").value;
     const email = document.getElementById("editEmail").value;
     const dob = document.getElementById("editDob").value;
     const phone = document.getElementById("editPhone").value;
     const gender = document.querySelector('input[name="gender"]:checked').value;
     const address = document.getElementById("editAddress").value;
     const country = document.getElementById("editCountry").value;
     const state = document.getElementById("editState").value;
     const city = document.getElementById("editCity").value;
     const pin = document.getElementById("editPin").value;
     const username = document.getElementById("editUserName").value;
     const password = document.getElementById("editPassword").value;
     const qualifications = document.getElementById("editQualification").value;
 
     const originalDateString = dob;
      // Parse the original date string
      let parts = originalDateString.split("-");
      let year = parts[0];
      let month = parts[1];
      let day = parts[2];
      // Construct the reversed date string
      let reversedDateString = `${day}-${month}-${year}`;
      console.log(reversedDateString);
      const dobb = reversedDateString;
 
 const newData ={
     salutation,
     firstName,
     lastName,
     email,
     phone,
     dob:dobb,
     gender,
     qualifications,
     address,
     city,
     state,
     pin,
     country,
     username,
     password
 }
 
 console.log("new data fetched" + newData);
 
 fetch(`http://localhost:3000/employees/${id}` , {
         method: "PUT" ,
         headers: {
             "Content-Type" : "application/json",
         },
         body:JSON.stringify(newData)
     })
     .then((response) => {
         return response.json();
     })
     .then((data) => {
         console.log("Data posted successfully:" , data);

        //  posting image to json ----------------------------------------

        const profileImgEditView = document.getElementById('viewEditEmp');
        var imgObjectView = new FormData();
        imgObjectView.append("avatar", profileImgEditView.files[0]);
        console.log("img added succesfully" , imgObjectView);

        fetch(`http://localhost:3000/employees/${id}/avatar`,{
            method: "POST",
            body: imgObjectView,
        });

        console.log(newData);

    })
    .then(() =>{
        swal.fire({
            icon: "success",
            title: "ADD EMPLOYEE SUCCESSFULL",
            showConfirmButton: false,
            timer: 1500,
        });

     })
     Close('empEdit');
     
    //  window.location.href = `view.html?${id}`; 
    // location.reload(true);
     
  }
}


//   employee delete


let empDeletee = document.getElementById("deleteBtn");
empDeletee.addEventListener("click",() =>{
    
    let a = document.getElementById('empDelete')
    a.style.display = "block";
    let b = document.getElementById('content')
    b.style.filter = "blur(3px)";

}) 

let deleteEmployee = document.getElementById("deleteEmployee");
deleteEmployee.addEventListener("click",() =>{
    
    console.log("employee id = " + id);
 
   

    fetch(`http://localhost:3000/employees/${id}` , {
    method: "DELETE" ,
    headers: {
        'Content-Type' : 'application/json',
    }
    })
    .then((response) => {
        return response.json;
    })
    .then((data) => {
        console.log("Deleted");
    })

    window.location.href = "index.html";
})



// closing alll

function Close(id) {
    let idd = id;
    document.getElementById(idd).style.display = "none";
    document.getElementById('content').style.filter = "blur(0px)";
}



// validation 


function salutationValidation(id) {
    const salutation = document.getElementById(id).value;
    if (salutation === "" || salutation === "select") {
      alert("Salutation is required");
    //   document.getElementById('errorSalutation').innerText = "Salutation is required"
      return false;
    }
    return true;
  }
  
  function firstNameValidation(id) {
    const firstName = document.getElementById(id).value;
    if (firstName === "") {
      alert("First Name is required");
      return false;
    }
    return true;
  }
  
  function lastNameValidation(id) {
    const lastName = document.getElementById(id).value;
    if (lastName === "") {
      alert("Last Name is required");
      return false;
    }
    return true;
  }
  
  function emailValidation(id) {
    const email = document.getElementById(id).value;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
      alert("Invalid email address");
      return false;
    }
    return true;
  }
  
  function dobValidation(id) {
    const dob = document.getElementById(id).value;
    if (dob === "") {
      alert("Date of Birth is required");
      return false;
    }
    return true;
  }
  
  function phoneValidation(id) {
    const phone = document.getElementById(id).value;
    const re = /^\d{10}$/;
    if (!re.test(phone)) {
      alert("phone must be 10 digits");
      return false;
    }
    return true;

    
  }
  
  function genderValidation() {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
      alert("Gender is required");
      return false;
    }
    return true;
  }
  
  function addressValidation(id) {
    const address = document.getElementById(id).value;
    if (address === "") {
      alert("Address is required");
      return false;
    }
    return true;
  }
  
  function countryValidation(id) {
    const country = document.getElementById(id).value;
    if (country === "" || country === "select") {
      alert("Country is required");
      return false;
    }
    return true;
  }
  
  function stateValidation(id) {
    const state = document.getElementById(id).value;
    if (state === "" || state === "select") {
      alert("State is required");
      return false;
    }
    return true;
  }
  
  function cityValidation(id) {
    const city = document.getElementById(id).value;
    if (city === "") {
      alert("City is required");
      return false;
    }
    return true;
  }
  
  function pinValidation(id) {
    const pin = document.getElementById(id).value;
    if (pin === "") {
      alert("Pin is required");
      return false;
    }
    return true;
  }
  
  function usernameValidation(id) {
    const username = document.getElementById(id).value;
    if (username === "") {
      alert("Username is required");
      return false;
    }
    return true;
  }
  
  function passwordValidation(id) {
    const password = document.getElementById(id).value;
    if (password === "") {
      alert("Password is required");
      return false;
    }
    return true;
  }
  
  function qualificationsValidation(id) {
    const qualifications = document.getElementById(id).value;
    if (qualifications === "") {
      alert("Qualifications are required");
      return false;
    }
    return true;
  }