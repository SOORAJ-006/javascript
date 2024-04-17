const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log("received id is => ", id);


viewEmployee(id);
// showEmployeeData(id);

async function viewEmployee(id) {
  await fetch(`http://localhost:3000/employees/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let name = data.salutation + " " + data.firstName + " " + data.lastName;
      let addressRest = data.city + " " + data.state + " " +data.country + " " + data.pin
      document.getElementById('name').innerHTML = name;
      document.getElementById('email').innerHTML = data.email;
      document.getElementById('phone').innerHTML = data.phone;
      document.getElementById('username').innerHTML = data.username;
      document.getElementById('address').innerHTML = data.address;
      document.getElementById('addressRest').innerHTML = addressRest;
      document.getElementById('qualification').innerHTML = data.qualifications;
      document.getElementById('gender').innerHTML = data.gender
      document.getElementById('dob').innerHTML = data.dob;

      const [day, month, ageYear] = data.dob.split("-");
      const newyear = `${ageYear}`;
      console.log(newyear);


      const date = new Date();
      let year = date.getFullYear();
      console.log(year);
      const agee = year - newyear

      document.getElementById('age').innerHTML = agee;


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
editbtn.addEventListener("click", () => {
  editEmployee(id);
})


async function editEmployee(id) {

  console.log("employee id = " + id);

  let a = document.getElementById('empEdit')
  a.style.display = "block";
  let b = document.getElementById('content')
  b.style.filter = "blur(3px)";

  //   fetching data from json and planting it to empEdit

  await fetch(`http://localhost:3000/employees/${id}`, {
    method: "GET",
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


      const [day, month, year] = data.dob.split("-");
      const newDob = `${year}-${month}-${day}`;
      document.getElementById('editDob').value = newDob;

      // gender  

      document.querySelector(`input[name='gender'][value='${data.gender}']`).checked = true;


    })

  //  image preview in edit employee form

  const editpreview = document.getElementById('viewEditEmpImg')
  editpreview.src = `http://localhost:3000/employees/${id}/avatar`;

  let editsubmit = document.getElementById("saveEdit");
  editsubmit.addEventListener("click", () => {

    const validation = EditFormValidation();
    console.log(validation);
    if (!validation) {
      return; 
    } else {
      saveChanges(id);
    }
  })
}

// function avatarPreviewView() {
//   const preview = document.getElementById("viewEditEmpImg");
//   preview.src = URL.createObjectURL(event.target.files[0]);

// }
// posting edited data to json

function saveChanges(id) {
  console.log(id);


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

  const newData = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    dob: dobb,
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

  fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Data posted successfully:", data);

      //  posting image to json ----------------------------------------

      const profileImgEditView = document.getElementById('viewEditEmp');
      var imgObjectView = new FormData();
      imgObjectView.append("avatar", profileImgEditView.files[0]);
      console.log("img added succesfully", imgObjectView);

      fetch(`http://localhost:3000/employees/${id}/avatar`, {
        method: "POST",
        body: imgObjectView,
      });

      console.log(newData);

    })
    .then(() => {
      swal.fire({
        icon: "success",
        title: "EMPLOYEE UPDATED SUCCESSFULL",
        showConfirmButton: false,
        timer: 1500,
      })
      .then(() => {
        Close('empEdit');
        
        location.reload(true);
      })

    })
  

  //  window.location.href = `view.html?${id}`; 
  // 

}



//   employee delete


let empDeletee = document.getElementById("deleteBtn");
empDeletee.addEventListener("click", () => {

  let a = document.getElementById('empDelete')
  a.style.display = "block";
  let b = document.getElementById('content')
  b.style.filter = "blur(3px)";

})

let deleteEmployee = document.getElementById("deleteEmployee");
deleteEmployee.addEventListener("click", () => {

  console.log("employee id = " + id);



  fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response.json;
    })
    .then((data) => {
      console.log("Deleted");
    })

    .then(() =>{
      swal.fire({
          icon: "success",
          title: "EMPLOYEE DELETED SUCCESSFULL",
          showConfirmButton: false,
          timer: 1500,
    })
      .then(() => {
        Close('empDelete');
        window.location.href = 'index.html'
      })
    })
  
})



// closing alll

function Close(id) {
  let idd = id;
  document.getElementById(idd).style.display = "none";
  document.getElementById('content').style.filter = "blur(0px)";
}



// edit employee validation

function EditFormValidation() {
  const salutation = document.getElementById("editSalutation").value.trim();
  const firstName = document.getElementById("editFirstName").value.trim();
  const lastName = document.getElementById("editLastName").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const address = document.getElementById("editAddress").value.trim();
  const country = document.getElementById("editCountry").value.trim();
  const state = document.getElementById("editState").value.trim();
  const city = document.getElementById("editCity").value.trim();
  const pin = document.getElementById("editPin").value.trim();
  const username = document.getElementById("editUserName").value.trim();
  const password = document.getElementById("editPassword").value.trim();
  const qualifications = document.getElementById("editQualification").value.trim();

  // DOB

  const dob = document.getElementById("editDob")
  const addDovValidation = document.getElementById('editDobError')
  const dobvalue = dob.value.trim();

  const gender = document.querySelector('input[name="gender"]:checked')
  const addGenderValidation = document.getElementById('editGenderError')

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^\d{10}$/
  const namePattern = /^[A-Za-z]+$/

  let isValid = true;

  // validating DOB and Gender

  if (gender) {
    addGenderValidation.textContent = ""

  }
  else {
    addGenderValidation.textContent = "* please select gender"
    isValid = false
  }

  if (dobvalue === "") {
    addDovValidation.textContent = "* please select Date of Birth"
    isValid = false
  }

  // validating rest

  if (!phonePattern.test(phone)) {
    document.getElementById('editPhoneError').textContent = "* phone number should contain 10n digits"
    isValid = false
  }

  if (!emailPattern.test(email)) {
    document.getElementById('editEmailError').textContent = "* Invalid email"
    isValid = false
  }

  if (!namePattern.test(firstName)) {
    document.getElementById('editFirstNameError').textContent = "* please enter first name"
    isValid = false
  }

  if (!namePattern.test(lastName)) {
    document.getElementById('editLastNameError').textContent = "* please enter first name"
    isValid = false
  }

  if (password == "") {
    document.getElementById('editPasswordError').textContent = "* please enter password"
    isValid = false
  }

  if (salutation == "" || salutation == "select") {
    document.getElementById('editSalutationError').textContent = "* saluration is needed"
  }

  if (username == "") {
    document.getElementById('editUserNameError').textContent = "* username is needed"
  }

  if (address == "") {
    document.getElementById('editAddressError').textContent = "* address is needed"
  }

  if (qualifications == "") {
    document.getElementById('editQualificationError').textContent = "* qualification is needed"
  }

  if (country == "" || country == "select") {
    document.getElementById('editCountryError').textContent = "* country is needed"
  }

  if (state == "" || state == "select") {
    document.getElementById('editStateError').textContent = "* state is needed"
  }

  if (city == "" || city == "select") {
    document.getElementById('editCityError').textContent = "* city is needed"
  }

  if (pin == "") {
    document.getElementById('editPinError').textContent = "* pin is needed"
  }

  // validation text event

  document.getElementById('empEdit').addEventListener('input', (event) => {
    inputId = event.target.id;
    const errorId = `${inputId}Error`;
    console.log("error id is ", errorId);
    document.getElementById(errorId).textContent = "";
  })

  // gender validation

  const male = document.getElementById("editMale")
  const female = document.getElementById("editFemale")

  male.addEventListener("click", () => {
    document.getElementById("editGenderError").textContent = "";
  })

  female.addEventListener("click", () => {
    document.getElementById("editGenderError").textContent = "";
  })

  return isValid;
}