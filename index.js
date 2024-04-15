


function Close(id) {
    let idd = id;
    document.getElementById(idd).style.display = "none";
    document.getElementById('content').style.filter = "blur(0px)";
}

function display(id) {
    let idd = id;
    document.getElementById(idd).style.display = "block";
    document.getElementById('content').style.filter = "blur(3px)";
}

fetchData();

let currentPage = 1;
let itemsPerPage = 5;
let totalItems = 0;
let tableContents =[];


// fetching data from the json
async function fetchData(){
     await fetch(`http://localhost:3000/employees/`)
    .then((data) => {
  
    return data.json();
}).then((objectData) => {
  tableContents = objectData.reverse();
  console.log("table array" + tableContents);   

// table count
document.getElementById('count').addEventListener('change', () =>{
  dataCount = document.getElementById('count');
  itemsPerPage = parseInt(dataCount.value);
  console.log(itemsPerPage);
  displayData(currentPage);
  pageNation();
  
});

displayData(currentPage);
pageNation();

})
}


const input = document.getElementById('input')


function displayData(page){

  // search bar using filter
     let querry = input.value;
     console.log("querry :" + querry);

  // end
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage

  let pageinatedData = tableContents.slice(start,end);
  console.log("Converted data is" , tableContents);

  let tableData = "";
  let i = start;

  pageinatedData.map((values) => {
    i++;

    totalItems++;

    let slNumber = i > 9 ? `#${i}` : `#0${i}`;

    tableData+= `<tr>
        <th id="id">${slNumber}</th>
        <td id="Name"><img class="emp-img" src="http://localhost:3000/employees/${values.id}/avatar"> ${values.salutation} ${values.firstName} ${values.lastName}</td>
        <td id="Email">${values.email}</td>
        <td id="Mob">${values.phone}</td>
        <td id="Gender">${values.gender}</td>
        <td id="Dob">${values.dob}</td>
        <td id="Country">${values.country}</td>
        <td><div class="dropdown">
            <button class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu">
              <li onclick="viewEmployee('${values.id}')"><a class="dropdown-item" href="view.html?id=${values.id}">View Details</a></li>
              <li onclick="editEmployee('${values.id}')"><a class="dropdown-item" href="#">Edit </a></li>
              <li onclick="deleteEmployee('${values.id}')"><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
        </td>
    </tr>`

    // console.log("table"+"  " + objectData.length);

    });

    document.getElementById("tableBody").innerHTML = tableData;
    console.log("Fetch completed");
}


function pageNation(){
  let totalPages = Math.ceil(tableContents.length / itemsPerPage);
  const pageNationUl = document.getElementById('paginationContaioner')
  pageNationUl.innerHTML = '';

  // back skip button <

  const backskip = document.createElement('li');
  backskip.innerHTML = `<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span aria-hidden="true">&laquo;</span>
  </a>
</li>`;
pageNationUl.appendChild(backskip);

backskip.addEventListener('click', () => {
  if(currentPage > 1 ){
    currentPage--;
  }
  else{
    currentPage = 1;
  }
  displayData(currentPage);
});

// skip button " 1 2 3 "

for(let i = 1; i<=totalPages ;i++ ){
  const pageItems = document.createElement('li');
  pageItems.innerHTML =`<li class="page-item">
  <a class="page-link" href="#" aria-label="Previous">
    <span aria-hidden="true">${i}</span>
  </a>
</li>`;
  pageNationUl.appendChild(pageItems);
  pageItems.addEventListener('click' , () =>{
    currentpage = i ;
    displayData(currentPage);

  });
}

  // front skipp button

  const frontSkip = document.createElement('li');
  frontSkip.innerHTML = `<li class="page-item">
  <a class="page-link" href="#" aria-label="Next">
    <span aria-hidden="true">&raquo;</span>
  </a>
</li>`;

pageNationUl.appendChild(frontSkip);
frontSkip.addEventListener('click' , () => {
  if(currentPage <= totalPages - 1){
    currentPage++;
  }
  else{
    currentPage = totalPages;
  }
  displayData(currentPage);
});
}
        


// ---------------------------Add Form Validation-------------------------------

function addFormValidation(){
  const salutation = document.getElementById("addSalutation").value.trim(); 
    const firstName = document.getElementById("addFirstName").value.trim();
    const lastName = document.getElementById("addLastName").value.trim();
    const email = document.getElementById("addEmail").value.trim();
    const phone = document.getElementById("addPhone").value.trim();
    
    const address = document.getElementById("addAddress").value.trim();
    const country = document.getElementById("addCountry").value.trim();
    const state = document.getElementById("addState").value.trim();
    const city = document.getElementById("addCity").value.trim();
    const pin = document.getElementById("addPin").value.trim();
    const username = document.getElementById("adduserName").value.trim();
    const password = document.getElementById("addPassword").value.trim();
    const qualifications = document.getElementById("addqualification").value.trim();

  // DOB

  const dob = document.getElementById("addDob")
  const addDovValidation = document.getElementById('addDobError')
  const dobvalue = dob.value.trim();

  const gender = document.querySelector('input[name="gender"]:checked')
  const addGenderValidation = document.getElementById('errorGender')

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^\d{10}$/
  const namePattern = /^[A-Za-z]+$/

  let isValid = true;

  // validating DOB and Gender

  if(gender){
    addGenderValidation.textContent = ""

  }
  else{
    addGenderValidation.textContent = "* please select gender"
    isValid = false
  }

  if(dobvalue === ""){
    addDovValidation.textContent = "* please select Date of Birth"
    isValid = false
  }

  // validating rest

  if(!phonePattern.test(phone)){
    document.getElementById('addPhoneError').textContent = "* phone number should contain 10n digits"
    isValid = false
  }

  if(!emailPattern.test(email)){
    document.getElementById('addEmailError').textContent = "* Invalid email"
    isValid = false
  }

  if(!namePattern.test(firstName)){
    document.getElementById('addFirstNameError').textContent = "* please enter first name"
    isValid = false
  }

  if(!namePattern.test(lastName)){
    document.getElementById('addLastNameError').textContent = "* please enter first name"
    isValid = false
  }

  if(password == ""){
    document.getElementById('addPasswordError').textContent = "* please enter password"
    isValid = false
  }

  if(salutation == "" || salutation == "select"){
    document.getElementById('addSalutationError').textContent = "* saluration is needed"
  }

  if(username == ""){
    document.getElementById('adduserNameError').textContent = "* username is needed"
  }

  if(address == ""){
    document.getElementById('addAddressError').textContent = "* address is needed"
  }

  if(qualifications == ""){
    document.getElementById('addqualificationError').textContent = "* qualification is needed"
  }

  if(country == "" || country == "select"){
    document.getElementById('addCountryError').textContent = "* country is needed"
  }

  if(state == "" || state == "select"){
    document.getElementById('addStateError').textContent = "* state is needed"
  }

  if(city == "" || city == "select"){
    document.getElementById('addCityError').textContent = "* city is needed"
  }

  if(pin == ""){
    document.getElementById('addPinError').textContent = "* pin is needed"
  }

  // validation text event

  document.getElementById('addEmployee').addEventListener('input' , (event) =>{
    inputId = event.target.id;
    const errorId = `${inputId}Error`;
    console.log("error id is ", errorId);
    document.getElementById(errorId).textContent = "";  
  })

  // gender validation

  const male = document.getElementById("forMale")
  const female = document.getElementById("forFemale")

  male.addEventListener("click" , () =>{
    document.getElementById("errorGender").textContent = "";
  })

  female.addEventListener("click" , () =>{
    document.getElementById("errorGender").textContent = "";
  })

  return isValid;
}

// ------------------------------ADD EMPLOYEE ---------------------------------

const addEmployeeSubmit = document.getElementById('addEmployeeBtn');
addEmployeeSubmit.addEventListener('click' , () =>{
  const validation = addFormValidation();
  console.log(validation);
  if(!validation){
    return;
  }else{
    addEmpsubmit()
  }
})

function addEmpsubmit() {
  
    const salutation = document.getElementById("addSalutation").value; 
    const firstName = document.getElementById("addFirstName").value;
    const lastName = document.getElementById("addLastName").value;
    const email = document.getElementById("addEmail").value;
    const dob = document.getElementById("addDob").value;
    const phone = document.getElementById("addPhone").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const address = document.getElementById("addAddress").value;
    const country = document.getElementById("addCountry").value;
    const state = document.getElementById("addState").value;
    const city = document.getElementById("addCity").value;
    const pin = document.getElementById("addPin").value;
    const username = document.getElementById("adduserName").value;
    const password = document.getElementById("addPassword").value;

    const qualifications = document.getElementById("addqualification").value;
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
 console.log("the data we need" + newData.address);
 postData(newData);
    
 }
// }



//  post data -------------------------- 

 function postData(newData) {
     fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => {
        return response.json();

        
    })
    .then(data => {
        console.log("Data posted successfully:", data);

        // getting id of the created employee

        var user = data.id;
        newData.id = user;
        console.log(newData);

        // image upload-------------------------------------

        const profileImg = document.getElementById('img-upload');
        var imgObject = new FormData();
        imgObject.append("avatar", profileImg.files[0]);
        console.log("img added succesfully" , imgObject);

         fetch(`http://localhost:3000/employees/${data.id}/avatar`,{
            method: "POST",
            body: imgObject,
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
    });
    Close('addEmployee');
}


//  edit employee Get


 async function editEmployee(empid){

   console.log(empid);

   let a = document.getElementById('empEdit')
   a.style.display = "block";
  let b = document.getElementById('content')
  b.style.filter = "blur(3px)";

//   fetching data from json and planting it to empEdit

awaitfetch(`http://localhost:3000/employees/${empid}` , {
    method: "GET" ,
    headers: {
        "Content-Type": "application/json",
    },
}) //getting all the data in the id
    .then((response) => response.json())
    .then((data) => {
        console.log(data); //displaying all the data


        // var image = document.getElementById('img-upload').src
        // image = `http://localhost:3000/employees/${data.empid}/avatar`;


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

        // const gender = document.querySelector('input[name="gender"]:checked').value;
    })

    // image preview in edit employee form

    const editpreview = document.getElementById('image-box')
    editpreview.src = `http://localhost:3000/employees/${empid}/avatar`;


    let editsubmit = document.getElementById("saveEdit");
    editsubmit.addEventListener("click",() =>{
      const validation = EditFormValidation();
      console.log(validation);
  if(!validation){
    return;
  }else{
    saveChanges(empid);
  }
        
    }) 
   
}

function avatarPreview(){
    const preview = document.getElementById("image-box");
    preview.src = URL.createObjectURL(event.target.files[0]);

}


// Edit Employee Validation

function EditFormValidation(){
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

  const gender = document.querySelector('input[name="editGender"]:checked')
  const addGenderValidation = document.getElementById('editGenderError')

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^\d{10}$/
  const namePattern = /^[A-Za-z]+$/

  let isValid = true;

  // validating DOB and Gender

  if(gender){
    addGenderValidation.textContent = ""

  }
  else{
    addGenderValidation.textContent = "* please select gender"
    isValid = false
  }

  if(dobvalue === ""){
    addDovValidation.textContent = "* please select Date of Birth"
    isValid = false
  }

  // validating rest

  if(!phonePattern.test(phone)){
    document.getElementById('editPhoneError').textContent = "* phone number should contain 10n digits"
    isValid = false
  }

  if(!emailPattern.test(email)){
    document.getElementById('editEmailError').textContent = "* Invalid email"
    isValid = false
  }

  if(!namePattern.test(firstName)){
    document.getElementById('editFirstNameError').textContent = "* please enter first name"
    isValid = false
  }

  if(!namePattern.test(lastName)){
    document.getElementById('editLastNameError').textContent = "* please enter first name"
    isValid = false
  }

  if(password == ""){
    document.getElementById('editPasswordError').textContent = "* please enter password"
    isValid = false
  }

  if(salutation == "" || salutation == "select"){
    document.getElementById('editSalutationError').textContent = "* saluration is needed"
  }

  if(username == ""){
    document.getElementById('editUserNameError').textContent = "* username is needed"
  }

  if(address == ""){
    document.getElementById('editAddressError').textContent = "* address is needed"
  }

  if(qualifications == ""){
    document.getElementById('editQualificationError').textContent = "* qualification is needed"
  }

  if(country == "" || country == "select"){
    document.getElementById('editCountryError').textContent = "* country is needed"
  }

  if(state == "" || state == "select"){
    document.getElementById('editStateError').textContent = "* state is needed"
  }

  if(city == "" || city == "select"){
    document.getElementById('editCityError').textContent = "* city is needed"
  }

  if(pin == ""){
    document.getElementById('editPinError').textContent = "* pin is needed"
  }

  // validation text event

  document.getElementById('empEdit').addEventListener('input' , (event) =>{
    inputId = event.target.id;
    const errorId = `${inputId}Error`;
    console.log("error id is ", errorId);
    document.getElementById(errorId).textContent = "";  
  })

  // gender validation

  const male = document.getElementById("editMale")
  const female = document.getElementById("editFemale")

  male.addEventListener("click" , () =>{
    document.getElementById("editGenderError").textContent = "";
  })

  female.addEventListener("click" , () =>{
    document.getElementById("editGenderError").textContent = "";
  })

  return isValid;
}

// posting edited data to json


 function saveChanges(empid){
    console.log(empid);


    const salutation = document.getElementById("editSalutation").value;
    const firstName = document.getElementById("editFirstName").value;
    const lastName = document.getElementById("editLastName").value;
    const email = document.getElementById("editEmail").value;
    const dob = document.getElementById("editDob").value;
    const phone = document.getElementById("editPhone").value;
    const gender = document.querySelector('input[name="editGender"]:checked').value;
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

console.log(newData);

 fetch(`http://localhost:3000/employees/${empid}` , {
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

        // posting image through edit form----------------------------------

        const profileimg = document.getElementById('imge-upload');
        var imgObject = new FormData();
        imgObject.append("avatar", profileimg.files[0]);
        console.log("img added succesfully" , imgObject);

         fetch(`http://localhost:3000/employees/${empid}/avatar`,{
            method: "POST",
            body: imgObject,
        });
        // tableContents.unshift(newData);
        console.log(newData);
        // displayData(currentPage);

    })
    .then(() =>{
        swal.fire({
            icon: "success",
            title: "ADD EMPLOYEE SUCCESSFULL",
            showConfirmButton: false,
            timer: 1500,
        });
        // end of img posting ---------------------------------------
    })
    
    Close('empEdit');
}

// Deleting Data from Json

function deleteEmployee(empid){
    display('empDelete');

    let deleteEmploye = document.getElementById('deleteEmployee')
    deleteEmploye.addEventListener("click" , () =>{
        confirmDelete(empid);
    })
}


 function confirmDelete(id){
    console.log(id);

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
}


