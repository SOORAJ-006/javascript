
function Close(id){
    let idd = id;
    document.getElementById(idd).style.display = "none";
    document.getElementById('content').style.filter = "blur(0px)" ;
}

function display(id){
    let idd = id;
    document.getElementById(idd).style.display = "block";
    document.getElementById('content').style.filter = "blur(3px)" ;
}

// let s = 0;

// let form = document.getElementById('form');
// form.addEventListener('submit' , function(event){
//     event.preventDefault();

//     let salutation = document.getElementById('salutation').value;
//     let fName = document.getElementById('fName').value;
//     let lName = document.getElementById('lName').value;
//     let email = document.getElementById('email').value;
//     let mob = document.getElementById('mob').value;
//     let dob = document.getElementById('dob').value;
//     let address = document.getElementById('address').value;
//     let country = document.getElementById('country').value;
//     let state = document.getElementById('state').value;
//     let city = document.getElementById('city').value;
//     let pin = document.getElementById('pin').value;
//     let gender = document.querySelector('input[name="inlineRadioOptions"]:checked').value;

//     // showing data in the home page

//     let Namee = salutation + ' ' +  fName +  ' ' + lName
//         console.log(Namee);
    
//     // document.getElementById('Name').innerHTML = Namee;
//     // let Email = document.getElementById('email');
//     // let Mob = document.getElementById('mob');
//     // let Dob = document.getElementById('dob');
//     // let Country = document.getElementById('country');

//     let tr = document.createElement('tr');
//     let tds = tr.appendChild(document.createElement('td'));
//     let td1 = tr.appendChild(document.createElement('td'));
//     let td2 = tr.appendChild(document.createElement('td'));
//     let td3 = tr.appendChild(document.createElement('td'));
//     let td4 = tr.appendChild(document.createElement('td'));
//     let td5 = tr.appendChild(document.createElement('td'));
//     let td6 = tr.appendChild(document.createElement('td'));
//     let td7 = tr.appendChild(document.createElement('td'));



//     tds.innerHTML = ++s;
//     td1.innerHTML = Namee;
//     td2.innerHTML = email;
//     td3.innerHTML = mob;
//     td4.innerHTML = gender;
//     td5.innerHTML = dob;
//     td6.innerHTML = country;
//     //  
//     document.getElementById('tbl').appendChild(tr);
    
// })




fetch("http://localhost:3000/employees").then((data) =>{
    console.log(data);
})