window.onload = function () {
  /**
   * Executes the getData() function when the window has finished loading.
   */
  getData();
};
function getData() {
  /**
   * Retrieves data from the specified endpoint using Axios and populates a table with the received data.
   */

  const table = document.querySelector("#pins-table tbody");
  table.innerHTML = "";
  axios
    .get("http://127.0.0.1:8001/pins")
    .then((response) => {
      // console.log(response.status);
      if (response.status === 200) {
        const data = response.data;
        if (data && data.pins && Array.isArray(data.pins)) {
          const pins = data.pins;
          const table = document.querySelector("#pins-table tbody");
          if (table) {
            pins.forEach((pin) => {
              const row = table.insertRow();
              const cellData = [
                "pin_id",
                "title",
                "body",
                "image",
                "user_id",
                "added_date",
              ];

              cellData.forEach((property, index) => {
                const cell = row.insertCell(index);
                cell.innerHTML = pin[property];
              });

              row.addEventListener("click", () => {
                getPinData(pin["pin_id"]);
              });
            });
          } else {
            const errorMessage =
              "Table element not found. Please try again later.";
            alert(errorMessage);
          }
        } else {
          const errorMessage =
            "An error occurred while retrieving data. Please try again later.";
          alert(errorMessage);
        }
      } else {
        const errorMessage =
          "An error occurred while retrieving data. Please try again later.";
        alert(errorMessage);
      }
    })
    .catch((error) => {
      console.error(error);
      const errorMessage =
        "An error occurred while retrieving data. Please try again later.";
      alert(errorMessage);
    });
}

function getPinData(pin_id) {
  /**
   * Retrieves additional data for a specific pin by making a request to the API endpoint with the provided pin ID.
   */
  axios
    .get("http://127.0.0.1:8001/pins/" + pin_id)
    .then((response) => {
      //   console.log(response.data.pin);
      if (response.status === 200) {
        const data = response.data;
        if (data && data.pin) {
          const pin = data.pin;

          const elementIds = [
            "#myModal",
            ".close",
            "#pin-id",
            "#pin-title",
            "#pin-body",
            "#pin-image",
            "#pin-user-id",
            "#pin-added-date",
          ];
          const elements = [];

          for (let i = 0; i < elementIds.length; i++) {
            const element = document.querySelector(elementIds[i]);

            if (element !== null) {
              elements.push(element);
            } else {
              console.error(
                `Element with ID '${elementIds[i]}' was not found.`
              );
            }
          }

          elements[2].textContent = "Pin ID : " + pin["pin_id"];
          elements[3].textContent = "Pin Title : " + pin["title"];
          elements[4].textContent = "Pin Body : " + pin["body"];
          //   pinImage.textContent = "Pin Image : " + pin[3];
          elements[6].textContent = "User ID : " + pin["user_id"];
          elements[7].textContent = "Pin Added Date : " + pin["added_date"];

          const imageUrl = pin["image"];
          if (imageUrl) {
            const image = document.createElement("img");
            image.src = "images/" + imageUrl;
            image.alt = "Pin Image";
            elements[5].appendChild(image);
          }

          elements[0].style.display = "block";

          elements[1].onclick = function () {
            refresh_modal_and_image(elements[0], elements[5]);
          };

          window.onclick = function (event) {
            if (event.target == elements[0]) {
              refresh_modal_and_image(elements[0], elements[5]);
            }
          };
        } else {
          const errorMessage =
            "An error occurred while retrieving pin data. Please try again later.";
          alert(errorMessage);
        }
      } else {
        const errorMessage =
          "An error occurred while retrieving pin data. Please try again later.";
        alert(errorMessage);
      }
    })
    .catch((error) => {
      console.error(error);
      const errorMessage =
        "An error occurred while retrieving pin data. Please try again later.";
      alert(errorMessage);
    });
}

function refresh_modal_and_image(modal, image) {
  modal.style.display = "none";
  image.innerHTML = "";
}
