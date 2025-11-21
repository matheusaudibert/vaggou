const btnMobile = document.querySelector('.btn-menu-mobile');
const navLinks = document.querySelector('.links-nav');
const iconMenu = btnMobile.querySelector('i');

if (btnMobile && navLinks) {
  btnMobile.addEventListener('click', () => {
    navLinks.classList.toggle('ativo');

    // Troca o ícone de lista para X e vice-versa
    if (navLinks.classList.contains('ativo')) {
      iconMenu.classList.replace('ph-list', 'ph-x');
    } else {
      iconMenu.classList.replace('ph-x', 'ph-list');
    }
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('ativo');
      iconMenu.classList.replace('ph-x', 'ph-list');
    });
  });
}