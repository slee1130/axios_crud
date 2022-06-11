const imageContainer = document.getElementById("image-card");

function addImage(images) {
  const output = images
    .map((image) => {
      return `
      <h5 class="card-title">Images that you liked ❤️</h5>
      <div class="image" id="image-card">
        <img class="card-img-top" src="${image.src}"  alt="Card image cap">
        <div class="card-body">
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        </div>
      </div>
    `;
    })
    .join("");
  return (imageContainer.innerHTML = output);
}
