//HTML <form id="meuFormulario">
//HTML     <input type="text" name="nome" />
//HTML     <input type="submit" value="Enviar" />
//HTML  </form>

const meuFormulario = document.getElementById("meuFormulario");
meuFormulario.addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  const nome = event.target.elements.nome.value;
  alert(`O formulário foi enviado com o nome: ${nome}`);
});