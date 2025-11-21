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

// Lógica do FAQ (Accordion)
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const pergunta = item.querySelector('.faq-pergunta');
  const resposta = item.querySelector('.faq-resposta');

  pergunta.addEventListener('click', () => {
    // Fecha outros itens abertos (opcional)
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('ativo')) {
        otherItem.classList.remove('ativo');
        otherItem.querySelector('.faq-resposta').style.maxHeight = null;
      }
    });

    // Alterna o estado do item atual
    item.classList.toggle('ativo');

    if (item.classList.contains('ativo')) {
      resposta.style.maxHeight = resposta.scrollHeight + "px";
    } else {
      resposta.style.maxHeight = null;
    }
  });
});

// GERADO POR IA ARRUMAR DPS SE BUGAR
// ADICIONAR RESPONSIVIDADE AINDA