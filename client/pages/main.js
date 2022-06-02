import ImageService from "../services/ImageService.js";

const imageList = document.querySelector(".fetchImagesWrapper");

async function fetchImages() {
  try {
    const { results } = await ImageService.getSearchImages("london");
    renderImages(results);
  } catch (err) {
    console.log(err);
  }
}

function renderImages(images) {
  const output = images
    .map((image) => {
      return `
      <div class="fetchImagesWrapper">
        <img src=${image.urls.regular} class="image" />
          <div class="h_container">
            <i id="heart-btn" class="far fa-heart" data-icon="heart-icon"></i>
          </div>
      </div>
    `;
    })
    .join("");
  return (imageList.innerHTML = output);
}

fetchImages();

function heartIcon() {
  const heartBtn = document.querySelector(".fa-heart");
  console.log(heartBtn);
  if (heartBtn.classList.contains("far")) {
    heartBtn.classList.remove("far");
    heartBtn.classList.add("fas");
  } else {
    heartBtn.classList.remove("fas");
    heartBtn.classList.add("far");
  }
}

imageList.addEventListener("click", async (e) => {
  heartIcon();
  e.preventDefault();
  console.log("you clicked hearticon");
});
