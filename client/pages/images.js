import LikeService from "../services/LikeService.js";
import { readCookie } from "../utils/cookie.js";

const userEmail = readCookie("email");
const imageContainer = document.getElementById("image-card");

async function fetchLikedImages() {
  try {
    const likes = await LikeService.getLikes();
    const sameUser = likes.filter((like) => like.userID === userEmail);
    renderLikedImages(sameUser);
  } catch (err) {
    console.log(err);
  }
}

fetchLikedImages();

function renderLikedImages(likes) {
  const output = likes
    .map((like) => {
      return `
      <h5 class="card-title">Images that ${like.userID} liked ❤️</h5>
      <div class="image-card" id="image-card">
        <img src=${like.image.urls.regular} class="image" id="image"
        data-img=${like.image.id} />
      </div>
    `;
    })
    .join("");
  // console.log("대체 되는건 뭐니?????", output);
  return (imageContainer.innerHTML = output);
}
