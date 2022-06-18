import LikeService from "../services/LikeService.js";
import ImageService from "../services/ImageService.js";
import { readCookie } from "../utils/cookie.js";

console.log(location.pathname);
function getImageList() {
  return document.querySelector(".fetchImagesWrapper");
}

async function fetchImages() {
  try {
    const { results } = await ImageService.getSearchImages("korea");
    return results;
  } catch (err) {}
}

function renderImages(images) {
  const imageList = getImageList();
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

function addEvent(fetchedImages) {
  const imageList = getImageList();
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
    if (!userEmail) {
      location.href = "/login.html";
    }

    if (heartBtn.classList.contains("fas")) {
      try {
        await LikeService.likeImage({ userID: userEmail, image: selectedImg });
        alert("you saved this photo. please go check collect images");
      } catch (err) {
        console.log(err);
      }
    } else {
      // TODO: delete image
    }
  });
}

async function main() {
  const fetchedImages = (await fetchImages()) ?? [];
  renderImages(fetchedImages);
  addEvent(fetchedImages);
}

main();
console.log(readCookie("abc"));
