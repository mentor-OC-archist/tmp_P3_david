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
        const handleModalbtn = async e => {
            e.preventDefault()
            
            this.renderTemplateModal()
            
            this.works.map(project => project.imageUrl)
                .forEach(this.renderModalWorksCards)
            
        }
        // ATTACH EVENT ON LOGIN/LOGOUT BUTTON 
        document.querySelector('#login-toggle').addEventListener("click", this.handleLogin)

        // ATTACH EVENT ON MODAL LINK BUTTON
        document.querySelector('#modalLink').addEventListener('click', handleModalbtn)

    }

    

    // logoutUser = () => {
    logout = () => {
        localStorage.removeItem('tokenID')
        this.loadHomepage()
    }

}
const machinchose = new MyClass()