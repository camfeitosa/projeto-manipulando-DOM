//HTML<input type="text" id="meuInput" />

const meuInput = document.getElementById("meuInput");
meuInput.addEventListener("keydown", function(event) {
  console.log(`Tecla pressionada: ${event.key}`);
});

// keydown: Ocorre quando uma tecla é pressionada. keyup: Ocorre quando uma tecla é solta. keypress: Ocorre quando uma tecla é pressionada e ainda não foi solta.