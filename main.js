var login;

function newUser() {
  var username = document.inscription.username.value;
  var password = document.inscription.password.value;
  var req = new XMLHttpRequest();
  req.open("POST", "http://127.0.0.1:1337/subscribe", true);
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
  req.send('{"password": "' + password + '", "login": "' + username + '"}');
}

function loginUser() {
  var username = document.connexion.username.value;
  var password = document.connexion.password.value;
  var req = new XMLHttpRequest();
  login = username;
  req.open("POST", "http://127.0.0.1:1337/login", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.onreadystatechange = function() {
    if (req.readyState == 4 && req.status == 200) {
      console.log(req.responseText);
      document.getElementById("container_connexion").style.display = "none";
      document.getElementById("createAccount").style.display = "none";
      document.getElementById("chat").style.display = "block";
    } else {
      alert("bad login !");
    }
  };
  req.send('{"password": "' + password + '", "login": "' + username + '"}');
}

// document.getElementById("trraa").onclick = function() {
//   inscription.style.display = "block";
//   var translate = inscription.classList.add("horizTranslate");
//   translate.setTimeout(() => {}, 2000);
// };

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
  var ws = new WebSocket("ws://localhost:1338");
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
