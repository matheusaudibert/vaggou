const botaoAlternarTema = document.getElementById('alternar-tema');
const iconeSol = document.querySelector('.icone-sol');
const iconeLua = document.querySelector('.icone-lua');
const corpo = document.body;

const temaSalvo = localStorage.getItem('theme');
if (temaSalvo === 'dark') {
  corpo.classList.add('modo-escuro');
  iconeSol.style.display = 'block';
  iconeLua.style.display = 'none';
} else {
  iconeSol.style.display = 'none';
  iconeLua.style.display = 'block';
}

botaoAlternarTema.addEventListener('click', () => {
  corpo.classList.toggle('modo-escuro');

  if (corpo.classList.contains('modo-escuro')) {
    localStorage.setItem('theme', 'dark');
    iconeSol.style.display = 'block';
    iconeLua.style.display = 'none';
  } else {
    localStorage.setItem('theme', 'light');
    iconeSol.style.display = 'none';
    iconeLua.style.display = 'block';
  }
});


// GERADO POR IA ARRUMAR DPS SE BUGAR
// ADICIONAR RESPONSIVIDADE AINDA