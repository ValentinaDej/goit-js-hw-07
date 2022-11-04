import { galleryItems } from "./gallery-items.js";
// Change code below this line
import { GalleryItemsAdditional } from "./addGallery-items.js";

const galleryItemsCommon = [...galleryItems, ...GalleryItemsAdditional];
const galleryList = document.querySelector(".gallery");

const markupGalleryList = galleryItemsCommon
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

lazyLoading();

function lazyLoading() {
  const lazyImg = document.querySelectorAll("img.gallery__image");

  if ("loading" in HTMLImageElement.prototype) {
    lazyImg.forEach((el) => el.setAttribute("loading", "lazy"));
  } else {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    script.integrity =
      "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    script.crossorigin = "anonymous";
    script.referrerpolicy = "no-referrer";

    document.body.appendChild(script);

    lazyImg.forEach((el) => {
      el.setAttribute("data-src", el.src);
      el.classList.add("lazyload");
    });
  }
}
