const loginToggle = document.getElementById("login-toggle")
const logoutToggle = document.getElementById("logout-toggle")
const modalLogin = document.getElementById("js-modal")




function toggleLoginLogoutButtons() {
     const isLoggedIn = localStorage.getItem('tokenID')
     if (isLoggedIn) {
        loginToggle.style.display = 'none'
        logoutToggle.style.display = 'inline-block'
        modalLogin.style.display = "block"
    } 
    else {
        loginToggle.style.display = 'inline-block'
        logoutToggle.style.display = 'none'
    }
}

const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }
}

const button = document.getElementById("submit")

const loginUser = () => {
    const email = document.getElementById("email").value; // sophie.bluel@test.tld
    const password = document.getElementById("password").value; // S0phie
    const data = {email, password};
    requestOptions.body = JSON.stringify(data);
    fetch("http://localhost:5678/api/users/login", requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("tokenID", data.token)
            console.log("Token recupéré:", data.token)
            window.location.href = "index.html"
        } 
        
        else {
            const errorMessage = document.createElement('p')
            errorMessage.textContent = "L'email ou le mot de passe est incorrect !"
            errorMessage.style.color = "red"
            
            document.body.appendChild(errorMessage)
            onsole.log("La connexion a échoué.")
            console.log("Invalid credentials!")
        }
    })
    .catch(error => console.log(error))
}
const logoutUser = () => {
    localStorage.removeItem('tokenID')
    toggleLoginLogoutButtons()
    window.location.href = "index.html"
}

toggleLoginLogoutButtons()
logoutToggle.addEventListener('click', logoutUser)
button.addEventListener("click", loginUser)

/** */
