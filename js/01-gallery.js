import { galleryItems } from "./gallery-items.js";
// Change code below this line

const markup = galleryItems
  .map(
    (galleryItem) => `<div class="gallery__item">
<a class="gallery__link" href="${galleryItem.original}">
     <img
       class="gallery__image"
       src="${galleryItem.preview}"
       data-source="${galleryItem.original}"
       alt="${galleryItem.description}"
     />
   </a>
 </div>`
  )
  .join("");

const galleryItem = document.querySelector(".gallery");

galleryItem.insertAdjacentHTML("beforeend", markup);

galleryItem.addEventListener("click", hanleImgClick);

function hanleImgClick(e) {
  e.preventDefault();
  // if (!e.target.classList.contains("gallery__image")) {
  //   return;
  // }
  if (!e.target.dataset.source) {
    return;
  }

  const originalImg = e.target.dataset.source;
  createLightBox(originalImg).show();

  document.body.style.overflowY = "hidden";
  document.style.overflowY = "hidden";
}

const createLightBox = (originalImg) => {
  const instance = basicLightbox.create(`
    <img src="${originalImg}">
`);
  return instance;
};

document.body.onkeydown = function (e) {
  e = e || window.event;
  var c = e.keyCode;
  //Убирает эвент на стрелках, на pageDown, PageUp, Home, End
  if ((c > 36 && c < 41) || (c > 32 && c < 37)) {
    return false;
  }
};
