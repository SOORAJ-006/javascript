


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
// fetching data from the json
function fetchData(){

fetch('http://localhost:3000/employees').then((data) => {
    // console.log(data);
    return data.json();
}).then((objectData) => {
    // console.log(objectData[0].salutation);

    let sl = 0;

console.log(objectData);

    let tableData = "";
    objectData.map((values) => {

        // <img src="/imges/Elipse 5.png" alt=""> 

        // expoted

        tableData+= `<tr>
        <th id="id">#${++sl}</th>
        <td id="Name">${values.salutation} ${values.firstName} ${values.lastName}</td>
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
          </div></td>
    </tr>`

    });

    document.getElementById("tableBody").innerHTML = tableData;
})
}



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

 console.log(newData);


 postData(newData);
    
 }

//  post data  


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
        // Additional actions if needed after successful posting
    })
    Close('addEmployee');
}


// edit employee


//  edit employee Get

function editEmployee(empid){

   console.log(empid);

   let a = document.getElementById('empEdit')
   a.style.display = "block";
  let b = document.getElementById('content')
  b.style.filter = "blur(3px)";

//   fetching data from json and planting it to empEdit

fetch(`http://localhost:3000/employees/${empid}` , {
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

        // const gender = document.querySelector('input[name="gender"]:checked').value;
    })

    let editsubmit = document.getElementById("saveEdit");
    editsubmit.addEventListener("click",() =>{
        saveChanges(empid);
    }) 
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

//  view page


