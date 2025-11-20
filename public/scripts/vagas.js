const gridVagas = document.getElementById('grid-vagas');
const filtroTitulo = document.getElementById('filtro-titulo');
const filtroNivel = document.getElementById('filtro-nivel');
const filtroModelo = document.getElementById('filtro-modelo');
const filtroAfirmativa = document.getElementById('filtro-afirmativa');

let todasAsVagas = []; // Armazena todas as vagas carregadas

// Verifica se estamos na página de vagas
if (gridVagas) {
  carregarVagas();

  // Adiciona listeners para os filtros
  if (filtroTitulo) filtroTitulo.addEventListener('change', filtrarVagas);
  if (filtroNivel) filtroNivel.addEventListener('change', filtrarVagas);
  if (filtroModelo) filtroModelo.addEventListener('change', filtrarVagas);
  if (filtroAfirmativa) filtroAfirmativa.addEventListener('change', filtrarVagas);
}

async function carregarVagas() {
  try {
    // Ajuste o caminho conforme necessário. Se estiver na pasta pages, sobe dois níveis.
    // Se estiver rodando localmente sem servidor, o fetch pode ser bloqueado por CORS.
    // Assumindo que o arquivo vagas.json está na raiz do projeto.
    const response = await fetch('../../vagas.json');
    todasAsVagas = await response.json(); // Salva na variável global

    renderizarVagas(todasAsVagas);
  } catch (error) {
    console.error("Erro ao carregar vagas:", error);
    gridVagas.innerHTML = "<p>Erro ao carregar as vagas. Tente novamente mais tarde.</p>";
  }
}

function filtrarVagas() {
  const tituloSelecionado = filtroTitulo.value;
  const nivelSelecionado = filtroNivel.value;
  const modeloSelecionado = filtroModelo.value;
  const afirmativaSelecionada = filtroAfirmativa ? filtroAfirmativa.value : "";

  const vagasFiltradas = todasAsVagas.filter(vaga => {
    const matchTitulo = tituloSelecionado === "" || vaga.titulo === tituloSelecionado;
    const matchNivel = nivelSelecionado === "" || vaga.nivel === nivelSelecionado;
    const matchModelo = modeloSelecionado === "" || vaga.modelo === modeloSelecionado;

    let matchAfirmativa = true;
    if (afirmativaSelecionada === "") {
      matchAfirmativa = true;
    } else if (afirmativaSelecionada === "Não afirmativas") {
      matchAfirmativa = !vaga.afirmativa; // Verifica se é null, undefined ou vazio
    } else {
      matchAfirmativa = vaga.afirmativa === afirmativaSelecionada;
    }

    return matchTitulo && matchNivel && matchModelo && matchAfirmativa;
  });

  renderizarVagas(vagasFiltradas);
}

function renderizarVagas(vagas) {
  gridVagas.innerHTML = '';

  if (vagas.length === 0) {
    gridVagas.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Nenhuma vaga encontrada com os filtros selecionados.</p>';
    return;
  }

  vagas.forEach(vaga => {
    const card = document.createElement('div');
    card.classList.add('card-vaga');

    // Adiciona evento de clique para abrir o modal
    card.addEventListener('click', () => abrirModalVaga(vaga));

    card.innerHTML = `
      <h3>${vaga.titulo}</h3>
      <span class="empresa">${vaga.empresa}</span>
      <div class="detalhes-resumo">
        <span class="tag-info"><i class="ph ph-briefcase"></i> ${vaga.nivel}</span>
        <span class="tag-info"><i class="ph ph-map-pin"></i> ${vaga.modelo}</span>
        ${vaga.afirmativa ? `<span class="tag-info"><i class="ph ph-heart"></i> ${vaga.afirmativa}</span>` : ''}
      </div>
    `;

    gridVagas.appendChild(card);
  });
}

// Elementos do Modal
const modalOverlay = document.getElementById('modal-vaga');
const btnFecharModal = document.getElementById('fechar-modal');

// Elementos internos do modal para preencher
const modalTitulo = document.getElementById('modal-titulo');
const modalEmpresa = document.getElementById('modal-empresa');
const modalTags = document.getElementById('modal-tags');
const modalNivel = document.getElementById('modal-nivel');
const modalModelo = document.getElementById('modal-modelo');
const modalSalario = document.getElementById('modal-salario');
const modalDescricao = document.getElementById('modal-descricao');
const modalLink = document.getElementById('modal-link');

function abrirModalVaga(vaga) {
  if (!modalOverlay) return;

  // Preencher dados
  modalTitulo.textContent = vaga.titulo;
  modalEmpresa.textContent = vaga.empresa;
  modalNivel.textContent = vaga.nivel;
  modalModelo.textContent = vaga.modelo;
  modalSalario.textContent = vaga.salario;
  modalDescricao.textContent = vaga.descricao;
  modalLink.href = vaga.link;

  // Limpar e preencher tags
  modalTags.innerHTML = '';
  vaga.tags.forEach(tag => {
    const span = document.createElement('span');
    span.classList.add('tag-skill');
    span.textContent = tag;
    modalTags.appendChild(span);
  });

  // Mostrar modal
  modalOverlay.classList.add('aberto');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('aberto');
  document.body.style.overflow = '';
}

// Eventos do Modal
if (btnFecharModal) {
  btnFecharModal.addEventListener('click', (e) => {
    e.stopPropagation();
    fecharModal();
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      fecharModal();
    }
  });

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('aberto')) {
      fecharModal();
    }
  });
}

// Alert de envio de formulário da Jobsletter
document.getElementById('form-jobsletter').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Inscrição realizada com sucesso! Em breve você receberá as vagas no seu WhatsApp.');
  this.reset();
});