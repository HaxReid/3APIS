const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messageList = document.getElementById("messages");

socket.addEventListener("chat message", (message) => {
  console.log("nouveau message : ", message);
  const li = document.createElement("li");
  li.textContent = message;
  messageList.appendChild(li);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});
