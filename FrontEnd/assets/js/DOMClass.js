export default class DOMClass{

    constructor(props) {
        props && Object.assign(this, props)
        console.log(this)
    }
    handleLogin = () => {
        // if (!localStorage.getItem('tokenID')) {
        if (localStorage.getItem("tokenID")) {
            alert('out')
            this.logout()
        } else {
            this.renderLoginModal()
        }  
    }


    handleClickEvent_on_filterGallery(e) {
        const categoryId = event.target.dataset.category
        const galleryDiv = document.getElementById("gallery")
        const figures = galleryDiv.querySelectorAll("figure")
    
        figures.forEach((figure) => {
            const category = figure.dataset.id
            if (category.includes(categoryId) || categoryId === "all") {
                figure.style.display = "block"
            } else {
                figure.style.display = "none"
            }
        })
    }
    handleModalFormFileInput(){
                    
            const selectedFile = photoInput.files[0]
            const reader = new FileReader()
            reader.onload = function (event) {
                const imageUrl = event.target.result
                const buttonImage = document.getElementById("butonImage")
                const uploadedImage = document.createElement("img")
                uploadedImage.src = imageUrl
                uploadedImage.style.width = "35%"
                uploadedImage.style.height = "100%"
                while (buttonImage.firstChild) {
                    buttonImage.removeChild(buttonImage.firstChild)
                }
                buttonImage.appendChild(uploadedImage)
            }
            if (selectedFile) {
                reader.readAsDataURL(selectedFile)
            }
    }

    // renderWorksCards(works){ // CECI EST UNE MÉTHODE DE LA CLASSE
    renderWorksCards = (data) => { //MAIS CECI UNE PROPRIÉTÉ DE LA CLASSE, CONTENAT UNE FONCTION FLÉCHÉE (la différence se situe sur la valeur de la variable 'this')
        this.works = data
        const galleryDiv = document.getElementById("gallery")
        data.forEach((project) => {
            const figure = document.createElement("figure")

            figure.dataset.id = project.categoryId
            const img = document.createElement("img")
            img.src = project.imageUrl
            img.alt = project.title

            const figcaption = document.createElement("figcaption")
            figcaption.textContent = project.title

            figure.appendChild(img)
            figure.appendChild(figcaption)

            galleryDiv.appendChild(figure)
        })
    }

    // renderFilterCategory(categories){
    renderFilterCategory = (data) => {
        this.categories = data
        const filter = document.createElement("div")
        filter.id = "filter-buttons"
    
        const allButton = document.createElement("button")
        allButton.textContent = "Tous"
        allButton.id = "buttons"
        allButton.dataset.category = "all"
        allButton.addEventListener("click", this.handleClickEvent_on_filterGallery)
        filter.appendChild(allButton)
    
        this.categories.forEach((category) => {
            const button = document.createElement("button")
            button.id = "buttons"
            button.textContent = category.name
            button.dataset.category = category.id
            button.addEventListener("click", this.handleClickEvent_on_filterGallery)
            filter.appendChild(button)
        })
    
        const main = document.querySelector("#portfolio h2")
        !localStorage['tokenID']&&main.insertBefore(filter, main.firstChild.nextSibling)
    }

    renderEditionBar(){
        const modeEditionDiv = document.createElement("div")
        modeEditionDiv.id = "modeEdition"
        modeEditionDiv.textContent = "Mode édition"
        const iconElement = document.createElement("i")
        iconElement.classList.add("fa-regular", "fa-pen-to-square")
        document.body.prepend(modeEditionDiv)
        modeEditionDiv.appendChild(iconElement)
        modeEditionDiv.insertBefore(iconElement, modeEditionDiv.firstChild)
    }

    renderTemplateModal() {
        const main = document.querySelector("main")
        , overlay = document.createElement('div')                                        /// add background black transparent
        , closeModal = () => {
            const modal = document.querySelector('.modal')
            modal.parentNode.removeChild(modal)
            if (overlay) {
                overlay.parentNode.removeChild(overlay)
            }
        }
        , closeModal___ClickDocument = (event) => {                                       /// close modal event
            const modal = document.querySelector('.modal')
            const overlay = document.querySelector('.overlay')
            if (modal && !modal.contains(event.target) && event.target !== document.querySelector('#modalLink')) {
                modal.parentNode.removeChild(modal)
                if (overlay) {
                    overlay.parentNode.removeChild(overlay)
                }
            }
        }
        , stringLiteralModal = `<div class="modal">
            <button class="js-modal-close"><i class="fa-solid fa-x"></i></i></button>
            <h1 class="modal-title">Galerie photo</h1>
            <div id="modal-gallery" class="modal-gallery"></div>
            <input type="submit" class="addpicture" value="Ajouter une photo">
            </div>  
        </div>`
        main.insertAdjacentHTML('beforeend', stringLiteralModal)

        overlay.classList.add('overlay')
        document.body.appendChild(overlay)

        const closeButton = document.querySelector('.js-modal-close')                         /// close modal X
        closeButton.addEventListener('click', closeModal)
        document.addEventListener('click', closeModal___ClickDocument)


        const addPictureButton = document.querySelector('.addpicture')                       /// add picture click 
        addPictureButton.addEventListener('click', this.renderModalFormSelect)
    }
    renderLoginModal() {
        const header = document.querySelector("header")
        const stringLiteralLogin = `<div class="login-container">
        <h2 class="title-login" id="loginLink">Log In</h2>
        <form action="login" method="post">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" required />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" required />
        </form>
        <input type="submit" id="submit" value="Se connecter" />
        <a href="#">Mot de passe oublié</a>
        </div>`
        header.insertAdjacentHTML('beforeend', stringLiteralLogin)
        
    
        const submitButton = document.getElementById("submit")
        submitButton.addEventListener("click", this.submitLoginForm)
        document.body.style.overflow = "hidden"
    }

    renderModalWorksCards = (imageUrl) => {

        const modalGalleryDiv = document.getElementById("modal-gallery")
        , container = document.createElement("div")
        , img = document.createElement("img")
        , hideButton = document.createElement("button")
        , handleDelete = async () => {                              /// button delete work
            container.style.display = "none"
            const imageUrl = container.querySelector('img').src
            const workId = this.works.find(project => project.imageUrl === imageUrl)?.id
            if (workId) {
                const deleted = await this.deleteWork(workId)
                if (!deleted) {
                    container.style.display = "block"
                }
            }
        }
        
        img.src = imageUrl
        img.alt = "Image"
        
        hideButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        hideButton.classList.add("hide-button")

        container.classList.add("image-container")
        container.appendChild(img)
        container.appendChild(hideButton)

        modalGalleryDiv.appendChild(container)

        hideButton.addEventListener("click", handleDelete)

        
    }

    renderModalFormAddImage() {

        const photoModal = document.getElementById("modal-gallery")
        , modalTitle = document.querySelector('.modal-title')
        , addPictureButton = document.querySelector('.addpicture')
        , addReader = function () {
            // Vérifier si des fichiers ont été sélectionnés
            if (photo.files && photo.files[0]) {
                // Créer un objet URL pour l'image sélectionnée
                const reader = new FileReader();

                reader.onload = function (e) {
                    // Afficher l'image dans l'élément de prévisualisation
                    okimg.src = e.target.result;

                    // Masquer les autres éléments HTML
                    imageLogo.style.display = "none";
                }


                reader.readAsDataURL(photo.files[0]);
            }
        }

        photoModal.innerHTML = `
        <button class="js-modal-back"><i class="fa-solid fa-arrow-left"></i></button>
        <form id="addPhotoForm">
            <label id="butonImage" for="photo" id___="addphoto">
                <input type="file" id="photo" name="photoFile" accept="image/*" style="display: none">
                <i class="fa-regular fa-image" id="imageLogo"></i>
                <img id="okimg" />
                <span>+ Ajouter une photo</span>
                <p id="photoSize">jpg, png : 4mo max</p>
            </label>
            <label for="photoTitle" id="titlework">Titre</label>
            <input type="text" id="namework" required>
            <label for="photoCategory" id="titlecategorie">Catégorie</label>
            <select id="categoriework" required> </select>
            <button id="valider" type="submit">Valider</button>
        </form>`
        addPictureButton.style.display = 'none'
        modalTitle.textContent = 'Ajout photo'
        photo.addEventListener('change',addReader)
    }

    renderModalFormSelect = () => {
        this.renderModalFormAddImage()

        const photoForm = document.getElementById("addPhotoForm")
        photoForm.addEventListener('submit', fetchAddProject)




        const backButton = document.querySelector('.js-modal-back')                      /// back button modal 
        backButton.addEventListener('click', () => {
            const modalTitle = document.querySelector('.modal-title')
            const addPictureButton = document.querySelector('.addpicture')
            alert(this.works)
            // loadWorks()
            photoForm.style.display = "none"
            modalTitle.textContent = 'Galerie photo'
            addPictureButton.style.display = 'block'
            backButton.style.display = "none"
        })


        const selectElement = document.getElementById("categoriework")
        selectElement.innerHTML = ''
        console.log(selectElement.innerHTML)
        console.log(this.categories)
        console.log(this.works)
    

        this.categories.forEach(category => {
            const option = document.createElement("option")
            option.value = category.id
            option.textContent = category.name
            selectElement.appendChild(option)
        })


        async function fetchAddProject(event) {              /// add new work
            event.preventDefault()
            
            const selectedImage = document.getElementById("photo").files[0]
            const titleValue = document.getElementById("namework").value
            const selectedCategoryId = document.getElementById("categoriework").value
            
            const formData = new FormData()
            formData.append("image", selectedImage)
            formData.append("title", titleValue)
            formData.append("category", selectedCategoryId)
            const token = localStorage.getItem('tokenID')
            
            if (!token) {
                throw new Error('Token non trouvé')
            }
            try {
                const response = await fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': "application/json"
                    }
                })
                if (response.ok) {
                    console.log('Image chargée !')
                    this.renderModalFormAddImage()
                } else {
                    console.error('Problème de chargement :', response.status)
                }
            } catch (error) {
                console.error('Erreur lors de la requête fetch :', error)
            }
        }
    }

    renderModalGallery(){

        /*
        async function addCategories() {                                                           /// add category in select
            const categoriesUrl = "http://localhost:5678/api/categories"
            try {
                const response = await fetch(categoriesUrl)
                if (!response.ok) {
                throw new Error('Failed to fetch categories')
                }
                const categories = await response.json()
                this.renderModalFormSelect(categories)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        */
        // window.addEventListener('load', this.renderModalFormSelect)
        
        
        
        
        document.addEventListener('DOMContentLoaded', function () {
            const photoInput = document.getElementById("photo")                               /// show loaded image
            
            if (photoInput) { 
                photoInput.addEventListener('change', this.handleModalFormFileInput)
            }
        })
        
        
    }

}
// const chose = new DOMClass()