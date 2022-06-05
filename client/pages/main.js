import ImageService from "../services/ImageService.js";
// import UserService from "../services/UserService.js";

//global
const imageList = document.querySelector(".fetchImagesWrapper");

async function fetchImages() {
  try {
    const { results } = await ImageService.getSearchImages("korea");
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
  if (heartBtn.classList.contains("heart")) {
    if (heartBtn.classList.contains("far")) {
      heartBtn.classList.remove("far");
      heartBtn.classList.add("fas");
    } else {
      heartBtn.classList.remove("fas");
      heartBtn.classList.add("far");
    }
  }
});

//infinite scroll
// A) window.scrollY: How far the document has been scrolled from the top
// B) window.innerHeight: The visible part of the window
// C) document.body.offsetHeight: The height of the entire document

// window.addEventListener("scroll", async () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//     await fetchImages();
//   }
//   console.log(window.innerHeight);
//   console.log(window.scrollY);
//   console.log(document.body.offsetHeight);
// });
