let socket = io();
let pseudo = "";
let room = window.location.pathname.substring(1);

function joinChat() {
    pseudo = document.getElementById("pseudo").value;

    if (pseudo.trim() === "") return;

    socket.emit("join", {
        pseudo: pseudo,
        room: room
    });

    document.getElementById("login").style.display = "none";
    document.getElementById("chat").style.display = "block";
}

function sendMessage() {
    let message = document.getElementById("message").value;

    if (message.trim() === "") return;

    socket.emit("send_message", {
        pseudo: pseudo,
        message: message,
        room: room
    });

    document.getElementById("message").value = "";
}

socket.on("message", function(data) {
    let li = document.createElement("li");

    if (data.pseudo === "SYSTEM") {
        li.innerHTML = "<span style='color:orange'>" + data.message + "</span>";
    } else {
        li.innerHTML = "<span style='color:#38bdf8'>" + data.pseudo + "</span> : " + data.message;
    }

    document.getElementById("messages").appendChild(li);
});