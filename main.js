var login;

function newUser() {
  var username = document.inscription.username.value;
  var password = document.inscription.password.value;
  var email = document.inscription.email.value;
  var req = new XMLHttpRequest();
  req.open("POST", "http://143ea290.ngrok.io/subscribe");
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log(req.responseText);
      document.getElementById("container_connexion").style.display = "flex";
      document.getElementById("container_inscription").style.display = "none";
    } else {
      console.log(req.responseText);
    }
  };
  req.send(
    '{"password": "' +
      password +
      '", "username": "' +
      username +
      '", "email": "' +
      email +
      '"}'
  );
}

async function loginUser() {
  var username = document.connexion.username.value;
  var password = document.connexion.password.value;
  var req = new XMLHttpRequest();
  login = username;
  req.open("POST", "http://143ea290.ngrok.io/login");
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = async function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log(req.responseText);
      document.getElementById("container_connexion").style.display = "none";
      document.getElementById("createAccount").style.display = "none";
      document.getElementById("chat").style.display = "block";
      var ticket = await fetch("http://143ea290.ngrok.io/wsTicket", {
        method: "GET",
        credentials: "include"
      });

      const ticketValue = await ticket.text();
      console.log(ticketValue);
    }
  };
  req.send('{"password": "' + password + '", "username": "' + username + '"}');
}

function createAccount() {
  document.getElementById("container_inscription").style.display = "flex";
  setTimeout(() => {
    document
      .getElementById("container_inscription")
      .classList.add("horizTranslate");
  }, 0100);
  document.getElementById("container_connexion").style.display = "none";
  document.getElementById("createAccount").style.display = "none";
}

(function() {
  var ws = new WebSocket("ws://143ea290.ngrok.io");
  var form = document.querySelector(".form");

  form.onsubmit = function() {
    var input = document.querySelector(".inputChat");
    var text = input.value;
    if (login == undefined) {
      var random = Math.random();
      console.log(random.toString().substr(2));
      login = "Guest" + random.toString().substr(2);
    }
    ws.send(login + " :  " + text);
    input.value = "";
    input.focus();
    return false;
  };

  ws.onmessage = function(msg) {
    var response = msg.data;
    var messageList = document.querySelector(".messages");
    var li = document.createElement("li");
    li.textContent = response;
    messageList.appendChild(li);
  };
})();
