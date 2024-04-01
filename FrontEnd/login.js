const data = {
    "email" : "sophie.bluel@test.tld",
    "password" : "S0phie"
}

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    },
    body: JSON.stringify(data)
}


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
localStorage.setItem('tokenID', token);

const tokenRecupere = localStorage.getItem('tokenID');
console.log("Token récupéré : ", tokenRecupere);


const button = document.getElementById("submit")
const loginsubmit = e=>{
    console.log("fonction");
    fetch ("http://localhost:5678/api/users/login",requestOptions)
    .then(response => response.json()) 
    .then(data => {
        console.log(data); 
        if (data.token) {
            window.location.href = "homepage.html";
        } else {
            console.log("La connexion a échoué.");
        }
    })
    .catch(error => console.log(error));
}
console.log(button);
button.addEventListener("click",loginsubmit)