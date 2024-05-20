import APIClass from "./APIClass.js"


export default class MyClass extends APIClass{

    ok="okok"

    constructor(props) {

        super()
        props && Object.assign(this,props)
        console.log(this)

        
        this.getWorks(this.renderWorksCards)
        this.getCategories(this.renderFilterCategory)


        this.attachHomepageEvents()


        this.renderModalGallery()
        this.renderEditionBar()
        
        
        this.loadHomepage()
        
    }
    
    attachHomepageEvents(){
        // ATTACH EVENT ON LOGIN/LOGOUT BUTTON 
        document.querySelector('#login-toggle').addEventListener("click", this.handleLogin)

        // ATTACH EVENT ON MODAL LINK BUTTON
        document.querySelector('#modalLink').addEventListener('click', async e => {
            e.preventDefault()
            
            this.renderTemplateModal()
            
            this.works.map(project => project.imageUrl)
                .forEach(this.renderModalWorksCards)
            
        })

    }

    loadHomepage(){
        const loginToggle = document.getElementById("login-toggle")
        const isLoggedIn = localStorage.getItem("tokenID")
        const filterButtons = document.getElementById("filter-buttons")
        const modalButton = document.querySelector("#modalLink")
        const editionBar = document.getElementById("modeEdition")

        if (isLoggedIn) {
            editionBar.style.display = 'block'
            modalButton.style.display = 'block'
            loginToggle.textContent = 'logout'
            projets.classList.add('off')
        } else {
            // alert(projets.classList)
            const loginToggle = document.getElementById("login-toggle")
            loginToggle.textContent = 'login'
            editionBar.style.display = 'none'
            modalButton.style.display = 'none' 
            loginToggle.style.display = 'block'
            projets.classList.remove('off')
        }
    }
    

    // logoutUser = () => {
    logout = () => {
        localStorage.removeItem('tokenID')
        this.loadHomepage()
    }

}
const machinchose = new MyClass()