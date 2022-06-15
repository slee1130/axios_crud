import LikeService from "../services/LikeService.js";
import ImageService from "../services/ImageService.js";
import { readCookie } from "../utils/cookie.js";

import addImage from "./images.js";

//global
imageList = document.querySelector(".fetchImagesWrapper");
let fetchedImages = [];

async function fetchImages() {
  try {
    const { results } = await ImageService.getSearchImages("korea");
    renderImages(results);
    fetchedImages = results;
    console.log(results);
  } catch (err) {
    console.log(err);
  }
}

function renderImages(images) {
  const output = images
    .map((image) => {
      return `
      <div class="fetchImagesWrapper">
        <img src=${image.urls.regular} class="image" id="image" />
          <div class="h_container">
            <i id="heart-btn" data-img="${image.id}" class="heart far fa-heart" data-icon="heart-icon"></i>
          </div>
      </div>
    `;
    })
    .join("");
  return (imageList.innerHTML = output);
}

fetchImages();

imageList.addEventListener("click", async (e) => {
  console.log("you clicked heart button", e.target);
  e.preventDefault();
  const heartBtn = e.target;
  if (heartBtn.classList.contains("far")) {
    heartBtn.classList.remove("far");
    heartBtn.classList.add("fas");
  } else {
    heartBtn.classList.remove("fas");
    heartBtn.classList.add("far");
  }
});

imageList.addEventListener("click", async (e) => {
  e.preventDefault();
  const heartBtn = e.target;
  const userEmail = readCookie("email");
  const [selectedImg] = fetchedImages.filter(
    ({ id }) => id === e.target.dataset.img
  );
  console.log("IS THIS WORKING?", selectedImg);
  if (heartBtn.classList.contains("fas")) {
    // debugger;
    try {
      await LikeService.likeImage({ userID: userEmail, image: selectedImg });
      console.log(emailCookie);
      // inputImage;
      alert("you saved this photo. please go check collect images");
    } catch (err) {
      console.log(err);
    }
  }
});
