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

    })


console.log("function id = " + id);
}




