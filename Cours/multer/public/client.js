function send(e) {
  // Eviter le comportement par défault :
  e.preventDefault();
  console.log("sending...");

  // Ajouter du body :
  const fileField = document.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append("username", "abc123");
  formData.append("avatar", fileField.files[0]);

  // Requête POST serveur :
  fetch("http://localhost:3000/api", {
    method: "POST",
    body: formData,
  })
    .then((response) => {response.json()})
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const form = document.querySelector("#form");

form.addEventListener("submit", send);
