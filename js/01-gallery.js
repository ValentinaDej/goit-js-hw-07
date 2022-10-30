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

const list = document.querySelector(".gallery");
list.insertAdjacentHTML("beforeend", markup);
console.log(galleryItems);
