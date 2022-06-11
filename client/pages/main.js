import ImageService from "../services/ImageService.js";
import UserService from "../services/UserService.js";
import addImage from "./images.js";

//global
export default imageList = document.querySelector(".fetchImagesWrapper");

async function fetchImages() {
  try {
    const { results } = await ImageService.getSearchImages("korea");
    renderImages(results);
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
  const image = document.getElementById("image").src;
  // console.log("IS THIS WORKING?", image);
  // debugger;
  for (let i = 0; i < heartBtn.length; i++) {
    if (heartBtn[i].className === "fas") {
      console.log(heartBtn[i].className);
      try {
        await UserService.postUser({
          image,
        });
        addImage(image);
      } catch (err) {
        console.log(err);
      }
    }
  }
});
