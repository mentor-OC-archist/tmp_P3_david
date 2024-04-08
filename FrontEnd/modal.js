const modalWorks = "http://localhost:5678/api/works";
fetch(modalWorks)
  .then((r) => r.json())
  .then((data) => {
    const modalGalleryDiv = document.getElementById("modal-gallery");
    
    const imageUrls = data.map(project => project.imageUrl);

    imageUrls.forEach(imageUrl => {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = "Image";

     modalGalleryDiv.appendChild(img);
    });
  })


let modal = null

const openModal = function(e) {
    e.preventDefault ()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute ('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function(e) {
    if (modal=== null) return
    e.preventDefault ()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListenner('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListenner('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListenner('click', stopPropagation)
}

const stopPropagation = function (e){
    e.stopPropagation()
}

document.querySelectorAll("js-modal").forEach(a=>{ 
    a.addEventListener("click", openModal)
})