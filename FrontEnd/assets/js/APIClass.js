import DOMClass from "./DOMClass.js"

export default class APIClass extends DOMClass{
    // VOICI LA LISTE DES DIFFÉRENTS TYPE DE PRORPRIÉTÉ QUE L'ON PEUT DÉFINIR DANS UNE CLASS JAVASCRIPT
    /* PUBLIC FIELD DECLARATIONS */
    // publicField = 0;
    /* PUBLIC STATIC FIELD DECLARATIONS */
    // static staticField = 0;
    /* PRIVATE FIELD DECLARATIONS */
    // #privateField = 0;
    /* PRIVATE STATIC FIELD DECLARATIONS */
    // static #privateStaticField = 0;

    //CI-DESSUS LES PROPRIÉTÉS DE LA CLASS (ON LES DÉFINIT EN 1ER, ENSUITE, LE CONSTRCUTOR, ENFIN LES MÉTHODES)
    // LES PROPRIÉTÉS DÉFINITS DANS CETTE CLASSE SONT ACCÉSSIBLE PAR 
    // - TOUTES LES CLASSES PARENTES (ICI, DOMClass uniquement). 
    // - TOUTES LES INSTANCES DE CETTE CLASSE, OU DE LA CLASSE PARENTE
    #works_endpoint = "http://localhost:5678/api/works"
    #categories_endpoint = "http://localhost:5678/api/categories"
    requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        }
    } 
    works = [] // 
    categories = []



    // LE constructor D'UNE CLASSE S'ÉXÉCUTE LORSQUE L'ON INITIALISE LA CLASSE 
    // (rf: VOIR DERNIÈRE LIGNE DU FICHIER)
    constructor(props) {
        // LA FONCTION super() PERMET D'APPELER LE CONSTRUCTEUR PARENT (ICI, DOMClass)
        super()
        //RÉCUPÉRER SIMPLEMENT TOUT LES PARAMÈTRE PASSÉ LORS DE L'INITIALISATION DE LA CLASSE (ICI, RIEN N'EST ATTENDU)
        props && Object.assign(this,props)


        console.log(this)
    }
    


    /**
     * RÉCUPÉRER DE L'API LES WORKS, SUR LE ENDPOINT http://localhost:5678/api/works"
     * @param {CONTIENT LES DIFFÉRENTES CATÉGORIES (PAR DÉFAUT parameter VAUT undefined)} 
     */
    getWorks(callback) {
        const works = "http://localhost:5678/api/works"
        fetch(works)
            .then((r) => r.json())
            .then(callback)
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error)
            })
            
/*
        // SI parameter VAUT undefined (L'OPÉRATION DE GAUCHE), ALORS RÉCUPÉRER L'OPÉRATION DE DROITE
        console.log(parameter||this.#works_endpoint)
        
        fetch(parameter||this.#works_endpoint)
            .then(response => response.json())
            .then(this.renderWorksCards)
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error)
            })
*/
    }
    
    /**
     * RÉCUPÉRER DE L'API LES CATÉGORIES, SUR LE ENDPOINT http://localhost:5678/api/categories"
     * 
     * getCategories EST UNE MÉTHODE ASYNCHRONE, 
     * DANS CELLE-CI IL SERA ALORS POSSIBLE D'UTILISE LE KEYWORD "await" 
     * JUSTE AVANT L'APPEL À UNE FONCTION ASYNCHRONE TEL QUE FETCH()
     * @param {CONTIENT LES DIFFÉRENTES CATÉGORIES (PAR DÉFAUT parameter VAUT undefined)} 
     */
    async getCategories(callback) {
        const categories = "http://localhost:5678/api/categories"
        fetch(categories)
            .then((r) => r.json())
            .then(callback)
        
/* 
        // SI parameter VAUT undefined (L'OPÉRATION DE GAUCHE), ALORS RÉCUPÉRER L'OPÉRATION DE DROITE
        console.log(parameter||this.#categories_endpoint)

        // JE RÉCUPÈRE LES DONNÉES DU RÉSEAU DANS data
        // PUIS JE LES TRANSFORMENT EN JSON DANS categories
        // EN UTILISANT LE MOT-CLÉ "await"
        let data = await fetch(parameter||this.#categories_endpoint)
        , categories = await data.json()

        // J'APPELLE LA MÉTHODE DE LA CLASSE PARENTE DOMClass: DOMClass.renderFilterCategory
        // PS: j'utilise this, car this. fait référence à l'objet APIClass, 
        // qui est enfant de DOMClass, 
        // donc toutes les propriétés et méthodes de DOMClass sont disponible pour APIClass. 
        // Ceci n'est pas réciproque. La méthode APIClass.renderFilterCategory() n'est pas accéssible dans DOMClass.
        this.renderFilterCategory(categories)
*/
    }
    
    // loginUser = () => {
    submitLoginForm = () => {
        const email = document.getElementById("email").value                          /// sophie.bluel@test.tld
        const password = document.getElementById("password").value                   /// S0phie
        const data = {email, password}
        
        const errorMessage = document.createElement("div")
        errorMessage.textContent = ""
        errorMessage.id = "error-message"
        
        const checkErrorMessage = document.getElementById("error-message")
        if (checkErrorMessage) {
            checkErrorMessage.remove()
        }
        
        this.requestOptions.body = JSON.stringify(data)
        fetch("http://localhost:5678/api/users/login", this.requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem("tokenID", data.token)
                console.log("Token recupéré:", data.token)  
                // window.location.href = "index.html" 
                document.querySelector('.login-container').remove()
                this.loadHomepage()
            } 
            else {
                errorMessage.textContent = "Utilisateur ou mot de passe incorrect !"
                errorMessage.style.color = "red"
                console.log("La connexion a échoué.")
                const loginContainer = document.querySelector(".login-container")
                const titleLogin = document.getElementById("loginLink")
                        loginContainer.insertBefore(errorMessage, titleLogin.nextSibling)
            }})
        
            .catch(error => console.log(error))
    }
    
    async deleteWork(workId) {                                                 /// delete work
        const urlWork = `http://localhost:5678/api/works/${workId}`
        try {
            const token = localStorage.getItem('tokenID')
            if (!token) {
            throw new Error('Token not found')
            }
            
            const response = await fetch(urlWork, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            console.log("Delete work response:", response)
            if (!response.ok) {
            throw new Error('Failed to delete work')
            }
            alert('ok')

            return true 
        } catch (error) {
            console.error('Error deleting work:', error)
            return false 
        }
        
    }
    
    
}
// const chose = new DOMClass()