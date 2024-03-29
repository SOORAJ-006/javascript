
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

let form = document.getElementById('form');
form.addEventListener('submit' , function(event){
    event.preventDefault();

    let salutation = document.getElementById('salutation').value;
    let fName = document.getElementById('fName').value;
    let lName = document.getElementById('lName').value;
    let email = document.getElementById('email').value;
    let mob = document.getElementById('mob').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;
    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;
    let pin = document.getElementById('pin').value;
    let gender = document.getElementsByClassName('gender').value;

    // console.log(fName);
    // console.log(lName);
    // console.log(email);
    // console.log(mob);
    // console.log(dob);
    // console.log(address);
    // console.log(country);
    // console.log(state);
    // console.log(city);
    // console.log(pin);
    // console.log(salutation);
    // console.log(gender);

    let Namee = salutation + ' ' +  fName +  ' ' + lName
        console.log(Namee);
    
    document.getElementById('Name').innerHTML = Namee;
    let Email = document.getElementById('email');
    let Mob = document.getElementById('mob');
    let Dob = document.getElementById('dob');
    let Country = document.getElementById('country');

})


// function submit()
// {
//     submit.preventDefault();

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
//     let gender = document.getElementsByClassName('gender').value;

//     let Namee = salutation + ' ' +  fName +  ' ' + lName
//         console.log(Namee);
    
//     let Name = document.getElementById('Name').innerHTML;
//     let Email = document.getElementById('email');
//     let Mob = document.getElementById('mob');
//     let Dob = document.getElementById('dob');
//     let Country = document.getElementById('country');

//     Name = Namee;
// }
