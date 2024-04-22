///////////////////   A D D   W O R K S   /////////////


function getWorks() {
  const works = "http://localhost:5678/api/works"
  fetch(works)
    .then((r) => r.json())
    .then((data) => {
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
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error)
    })
}







//////////////////   A D D   C A T E G O R I E   /////////////////  


function filterGallery(event) {
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

function getCategories(){
const categories = "http://localhost:5678/api/categories"
fetch(categories)
  .then((r) => r.json())
  .then((categories) => {
    const filter = document.createElement("div")
    filter.id = "filter-buttons"

    const allButton = document.createElement("button")
    allButton.textContent = "Tous"
    allButton.id = "buttons"
    allButton.dataset.category = "all"
    allButton.addEventListener("click", filterGallery)
    filter.appendChild(allButton)

    categories.forEach((category) => {
      const button = document.createElement("button")
      button.id = "buttons"
      button.textContent = category.name
      button.dataset.category = category.id
      button.addEventListener("click", filterGallery)
      filter.appendChild(button)
    })

    const main = document.querySelector("#portfolio h2")
    main.insertBefore(filter, main.secondChild)
  })

  .catch((error) => {
    console.error("Erreur lors de la récupération des catégories :")
  })
}

getWorks()
getCategories()









/////////////////////////////   L O G I N   ///////////////////////////////


const loginButton = document.querySelector('#login-toggle')
function addLogin() {
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
  header.innerHTML += stringLiteralLogin 
  
 
  const submitButton = document.getElementById("submit")
  submitButton.addEventListener("click", loginUser)
  document.body.style.overflow = "hidden"
}

const loginToggle = document.getElementById("login-toggle")

function toggleLoginLogoutButtons() {
    const isLoggedIn = localStorage.getItem('tokenID')
    if (isLoggedIn) {
        loginToggle.textContent = 'logout'       
    } 
    else {
        loginToggle.style.display = 'inline-block'
    }
}

const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }
}

const loginUser = () => {
  const email = document.getElementById("email").value          // sophie.bluel@test.tld
  const password = document.getElementById("password").value    // S0phie
  const data = {email, password}
  requestOptions.body = JSON.stringify(data)
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
          console.log("La connexion a échoué.")
          console.log("Invalid credentials!")
      }})
     
  .catch(error => console.log(error))
}

const logoutUser = () => {
    localStorage.removeItem('tokenID')
    toggleLoginLogoutButtons()
    window.location.href = "index.html"
}

toggleLoginLogoutButtons()
loginToggle.addEventListener("click", () => {
    if (!localStorage.getItem('tokenID')) {
        addLogin() 
    } else {
        logoutUser()
    }  
})













/////////////////////////////   M O D A L   ///////////////////////////////


const modalButton = document.querySelector('#modalLink')
async function loadWorks() {
  const modalWorks = "http://localhost:5678/api/works"
  try {
    const r = await fetch(modalWorks)
    return await r.json()
  } catch (error) {
    console.error('Error fetching works:', error)
  }
}

function addModal() {
  const header = document.querySelector("header")

  modalButton.addEventListener('click', async e => {
    e.preventDefault()
    const stringLiteralModal = `<div class="modal">
    <button class="js-modal-close"><i class="fa-solid fa-x"></i></i></button>
        <h1 class="modal-title">Galerie photo</h1>
        <div id="modal-gallery" class="modal-gallery"></div>
        <input type="submit" class="addpicture" value="Ajouter une photo">
      </div>  
      </div>`
    header.insertAdjacentHTML('beforeend', stringLiteralModal)

    try {
      const data = await loadWorks()
      const modalGalleryDiv = document.getElementById("modal-gallery")
      const imageUrls = data.map(project => project.imageUrl)

      imageUrls.forEach(imageUrl => {
        const container = document.createElement("div")
        container.classList.add("image-container")

        const img = document.createElement("img")
        img.src = imageUrl
        img.alt = "Image"
        container.appendChild(img)

        const hideButton = document.createElement("button")
        hideButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        hideButton.classList.add("hide-button")
        container.appendChild(hideButton)

        modalGalleryDiv.appendChild(container)
      })

      async function deleteWork(workId) {
        const url = `http://localhost:5678/api/works/${workId}`
        try {
          const token = localStorage.getItem('tokenID')
          if (!token) {
            throw new Error('Token not found')
          }
          
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          console.log("Delete work response:", response)
          if (!response.ok) {
            throw new Error('Failed to delete work')
          }
          return true 
        } catch (error) {
          console.error('Error deleting work:', error)
          return false 
        }
      }

      const hideButtons = document.querySelectorAll('.hide-button')
      hideButtons.forEach(hideButton => {
        hideButton.addEventListener("click", async () => {
          const container = hideButton.parentElement
          container.style.display = "none"
  
          const imageUrl = container.querySelector('img').src
          
          const workId = data.find(project => project.imageUrl === imageUrl)?.id
            if (workId) {
            const deleted = await deleteWork(workId)
            if (!deleted) {
              container.style.display = "block"
            }
          }
        })
      })

      const modal = document.querySelector('.modal')
      const closeButton = document.querySelector('.js-modal-close')

      closeButton.addEventListener('click', () => {
        modal.parentNode.removeChild(modal)
      })

      document.addEventListener('click', (event) => {
        const modal = document.querySelector('.modal')
        if (modal && !modal.contains(event.target) && event.target !== modalButton) {
          modal.parentNode.removeChild(modal)
        }
      })

      const addPictureButton = document.querySelector('.addpicture')
      addPictureButton.addEventListener('click', () => {
        addPhotoModal()
      })
    } catch (error) {
      console.error('Error loading works:', error)
    }
  })
}
addModal()  


function addPhotoModal() {
  const photoModal = document.getElementById("modal-gallery")
  const modalTitle = document.querySelector('.modal-title')
  const addPictureButton = document.querySelector('.addpicture')

  photoModal.innerHTML = `
    <button class="js-modal-back"><i class="fa-solid fa-arrow-left"></i></button>
    <form id="addPhotoForm">
    <button id="butonImage">
    <input type="file" id="photo" name="photoFile" accept="image/*" style="display: none">
    <i class="fa-regular fa-image" id="imageAw"></i>
    <label for="photo" id="addphoto">+ Ajouter une photo</label>
    <p id="photoSize">jpg, png : 4mo max</p>
    </button>
      <label for="photoTitle" id="titlework">Titre</label>
      <input type="text" id="namework" required>
      <label for="photoCategory" id="titlecategorie">Catégorie</label>
      <select id="categoriework" required> </select>
      <hr>
      <button id="valider" type="submit">Valider</button>
    </form>`

  addPictureButton.style.display = 'none'
  modalTitle.textContent = 'Ajout photo'

  async function getCategories() {
    const categoriesUrl = "http://localhost:5678/api/categories"
    try {
      const response = await fetch(categoriesUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      const categories = await response.json()
      selectCategories(categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  function selectCategories(categories) {
    const selectElement = document.getElementById("categoriework")
    selectElement.innerHTML = ''

    categories.forEach(category => {
      const option = document.createElement("option")
      option.value = category.id
      option.textContent = category.name
      selectElement.appendChild(option)
    })
  }

  window.addEventListener('load', getCategories)

  getCategories()

  const photoForm = document.getElementById("addPhotoForm")

  photoForm.addEventListener('submit', async function(event) {
    event.preventDefault()
  
    const selectedImage = document.getElementById("photo").files[0]
    const titleValue = document.getElementById("namework").value
    const selectedCategoryId = document.getElementById("categoriework").value
  
    try {
      await fetchAddProject(titleValue, selectedImage, selectedCategoryId)
    } catch (error) {
      console.error('Erreur lors de l\'envoi du projet :', error)
    }
  })
  
  async function fetchAddProject(titleValue, selectedImage, selectedCategoryId) {
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
        addPhotoModal()
      } else {
        console.error('Problème de chargement :', response.status)
      }
    } catch (error) {
      console.error('Erreur lors de la requête fetch :', error)
    }
  }
 
  const backButton = document.querySelector('.js-modal-back')
  backButton.addEventListener('click', () => {
    loadWorks().then(data => {
      photoForm.style.display = "none"
      const modalGalleryDiv = document.getElementById("modal-gallery")
      const imageUrls = data.map(project => project.imageUrl)
      
      imageUrls.forEach(imageUrl => {
        const img = document.createElement("img")
        img.src = imageUrl
        img.alt = "Image"
        modalGalleryDiv.appendChild(img)
      })
    })
    modalTitle.textContent = 'Galerie photo'
    addPictureButton.style.display = 'inline'
    backButton.style.display = "none"
  })
}

document.addEventListener("DOMContentLoaded", function() {
})
