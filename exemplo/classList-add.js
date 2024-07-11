// add
const element = document.getElementById('meuElemento');
element.classList.add('minhaClasse');

//remove
const element = document.getElementById('meuElemento');
element.classList.remove('minhaClasse');

//altera
const element = document.getElementById('meuElemento');
element.classList.toggle('minhaClasse');

// está presente
const element = document.getElementById('meuElemento');
if (element.classList.contains('minhaClasse')) {
  // A classe 'minhaClasse' está presente no elemento
  // Faça algo aqui...
}

//substituindo
const element = document.getElementById('meuElemento');
element.classList.remove('classeAntiga');
element.classList.add('classeNova');

// várias classes 
const element = document.getElementById('meuElemento');
element.classList.add('classe1', 'classe2', 'classe3');
element.classList.remove('classe2', 'classe3');
