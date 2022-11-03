import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");

const markupGalleryList = galleryItems
  .map(
    ({ original, preview, description }) => `<div class="gallery__item"> 
    <a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
    </div>`
  )
  .join("");

const createLightbox = new SimpleLightbox(".gallery a", {});

galleryList.insertAdjacentHTML("beforeend", markupGalleryList);
galleryList.addEventListener("click", onImgClick);

function onImgClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  createLightbox();
}
