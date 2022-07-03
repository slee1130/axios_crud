import LikeService from "../services/LikeService.js";
import ImageService from "../services/ImageService.js";
import { readCookie } from "../utils/cookie.js";

let observer;
let page = 1;
const listEnd = document.querySelector("#endList");

function getImageList() {
  return document.querySelector(".fetchImagesWrapper");
}

async function fetchAndRender(page) {
  const fetchedImages = (await fetchImages(page)) ?? [];
  renderImages(fetchedImages);
  addEvent(fetchedImages);
}

async function fetchImages(page) {
  try {
    const { results, total_pages } = await ImageService.getSearchImages({
      page,
      query: "korea",
    });

    if (page >= total_pages) {
      observer.unobserve(listEnd);
    }
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

  return imageList.insertAdjacentHTML("beforeend", output);
}

function addEvent(fetchedImages) {
  const imageList = getImageList();
  imageList.addEventListener("click", async (e) => {
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
      //heart delete 구현하기
      await ImageService.delete();
    }
  });
}

function main() {
  addImageListMutationObserver();
  fetchAndRender(page);
}

main();

function infiniteScroll() {
  const option = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const io = (entries) => {
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting) return;

      page = page + 1;
      fetchAndRender(page);
    });
  };

  observer = new IntersectionObserver(io, option);
  observer.observe(listEnd);
}

function addImageListMutationObserver() {
  const targetNode = getImageList();
  const config = { childList: true };
  let isInitIntersectionObserver = false;

  const callback = function (mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type === "childList" && !isInitIntersectionObserver) {
        infiniteScroll();
        isInitIntersectionObserver = true;
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}
