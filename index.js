
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

fetchDaata();
// fetching data from the json
function fetchDaata(){




fetch('http://localhost:3000/employees').then((data) => {
    // console.log(data);
    return data.json();
}).then((objectData) => {
    // console.log(objectData[0].salutation);

    let sl = 0;

console.log(objectData);

    let tableData = "";
    objectData.map((values) => {
        tableData += `<tr class="position-relative">
        <td id="id">${'#' + ++sl} </td>
        <td id="Name">${values.salutation + " " + values.firstName + " " + values.lastName}</td>
        <td id="Email">${values.email}</td>
        <td id="Mob">${values.phone}</td>
        <td id="Gender">${values.gender}</td>
        <td id="Dob">${values.dob}</td>
        <td id="Country">${values.country}</td>

        <td class=""><i class="fa-solid fa-ellipsis" onclick="display('detailBox')"></i></td>
        <div class="card  position-absolute z-3 p-3" id="detailBox">
            <div class="d-flex gap-3 align-items-center mb-2"><i
                    class="fa-solid fa-eye"></i> <span>View Details</span></div>
            <div class="d-flex gap-3 align-items-center mb-2"
                onclick="display('empEdit')"><i class="fa-solid fa-pen"></i>
                <span>Edit</span></div>
            <div class="d-flex gap-3 align-items-center mb-2"
                onclick="display('empDelete')"><i class="fa-solid fa-trash"></i>
                <span>Delete</span></div>
        </div>

        </tr>`;
    });

    document.getElementById("tableBody")
        .innerHTML = tableData;
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

postData(newData)
 
 }

//  post data

// function postData(newData){
//     fetch('http://localhost:3000/employees',{
//         method: 'POST',
//         headers:{
//             'content-type':'application/json'
//         },
//         body:JSON.stringify(newData)
//          })
         
//          .then(data =>{
//             if(!Response.ok){
//                 throw new Error("Error");
//             }
           
//             return data.json()
//          })
//          .catch(error => {
//             console.error("Error:", error);       
//          })
//          console.log(newData);
//     }

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
  
}



