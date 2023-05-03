function getData() {
  axios
    .get("http://127.0.0.1:8001/pins")
    .then((response) => {
      const pins = response.data.pins;
      const table = document.querySelector("#pins-table tbody");
      pins.forEach((pin) => {
        const row = table.insertRow();
        const idCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const bodyCell = row.insertCell(2);
        const imageCell = row.insertCell(3);
        const userIdCell = row.insertCell(4);
        const addedDateCell = row.insertCell(5);

        idCell.innerHTML = pin["pin_id"];
        titleCell.innerHTML = pin["title"];
        bodyCell.innerHTML = pin["body"];
        imageCell.innerHTML = pin["image"];
        userIdCell.innerHTML = pin["user_id"];
        addedDateCell.innerHTML = pin["added_date"];

        row.addEventListener("click", () => {
          getPinData(pin["pin_id"]);
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function getPinData(pin_id) {
  axios
    .get("http://127.0.0.1:8001/pins/" + pin_id)
    .then((response) => {
      //   console.log(response.data.pin);
      const pin = response.data.pin;
      const modal = document.querySelector("#myModal");
      const span = document.querySelector(".close");
      const pinId = document.querySelector("#pin-id");
      const pinTitle = document.querySelector("#pin-title");
      const pinBody = document.querySelector("#pin-body");
      const pinImage = document.querySelector("#pin-image");
      const pinUserId = document.querySelector("#pin-user-id");
      const pinAddedDate = document.querySelector("#pin-added-date");

      pinId.textContent = "Pin ID : " + pin["pin_id"];
      pinTitle.textContent = "Pin Title : " + pin["title"];
      pinBody.textContent = "Pin Body : " + pin["body"];
      //   pinImage.textContent = "Pin Image : " + pin[3];
      pinUserId.textContent = "User ID : " + pin["user_id"];
      pinAddedDate.textContent = "Pin Added Date : " + pin["added_date"];

      const imageUrl = pin["image"];
      if (imageUrl) {
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = "Pin Image";
        pinImage.appendChild(image);
      }

      modal.style.display = "block";

      span.onclick = function () {
        modal.style.display = "none";
        pinImage.innerHTML = "";
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
          pinImage.innerHTML = "";
        }
      };
    })
    .catch((error) => {
      console.error(error);
    });
}

window.onload = function () {
  getData();
};
