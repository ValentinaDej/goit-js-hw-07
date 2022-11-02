import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");

const markupGalleryList = galleryItems
  .map(
    ({ original, preview, description }) => `<div class="gallery__item"> 
    <a class="gallery__link" href="${original}">
     <img
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
       alt="${description}"
     />
   </a>
 </div>`
  )
  .join("");

galleryList.insertAdjacentHTML("beforeend", markupGalleryList);
galleryList.addEventListener("click", onImgClick);

function onImgClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  createLightBox(e.target.dataset.source).show();
}

let onActiveImg;

const createLightBox = (original) => {
  const instance = basicLightbox.create(
    `
    <img src="${original}">
`,
    {
      onShow: () => {
        onActiveImg = onKeyPress.bind(this, instance);
        document.addEventListener("keydown", onActiveImg);
        document.body.classList.add("scroll-disable");
      },
      onClose: () => {
        document.removeEventListener("keydown", onActiveImg);
        document.body.classList.remove("scroll-disable");
      },
    }
  );
  return instance;
};

const onKeyPress = function (instance) {
  if (event.key === "Escape") {
    instance.close();
  }
};
