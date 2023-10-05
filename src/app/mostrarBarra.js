import { conectaApi } from './conectaNecessidades.js';
import { conectaApi as conectaONG } from "./conectaOng.js";

const barra = document.querySelector('[data-ong-barra]');
const ongNome = document.querySelector('[data-ong-nome]');
const ongCategoria = document.querySelector('[data-ong-img]');
const ongDesc = document.querySelector('[data-ong-categoria]');
const ongNesc = document.querySelector('[data-ong-desc]');
const ondIdVoluntario = document.querySelector('[data-ong-nesc]');


async function populaBarra(id, nome, categoria, descricao, necessidades, logo, idONG) {
  const ong = await conectaONG.listaEspecificaONG(idONG);
  const card = document.createElement('div');
  card.className = 'box';
  card.dataset.categoria = categoria;
  card.dataset.card = '';
  card.innerHTML = `
    <div class="box__moldura">
      <img class="box__img" src="${ong[0].logo}" alt="">
    </div>
    <div class="box__conteudo">
      <h3 class="box__titulo">
        ${ong[0].nomeONG}
      </h3>
      <p class="box__txt">
        ${descricao}
      </p>
      <span class="box__categoria">
        ${ong[0].tipo}
      </span>
    </div>

    
  `

  card.addEventListener('click', () => {
    document.documentElement.classList.toggle('barra--ativa');
    ongBarra.classList.toggle('menu__barra--alt--ativo');
  });

  return card;
}

async function listaCards() {
  try {
    const listaApi = await conectaApi.listaONGs();
    listaApi.forEach(async (element) => {
      barra.appendChild(await criaCard(
        element.id,
        element.nome,
        element.categoria,
        element.descricao,
        element.necessidades,
        element.logo,
        element.idONG
      ))
    });

    return listaApi;
  } catch (e) {
    barra.innerHTML = `
      <h2 class="mensagem__titulo">
        Não foi possível carregar os vídeos
      </h2>
    `
  }
}

const contaLogada = JSON.parse(localStorage.getItem("userLogado"));
listaCards(contaLogada.idGastos)

export default listaCards;