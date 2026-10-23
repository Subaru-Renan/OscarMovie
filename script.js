const API_KEY = "bf563d464483ddf9ab158f8e8b6117a9";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

const filmes = document.querySelectorAll(".filme");

filmes.forEach(function (filme) {
  const titulo = filme.querySelector("h3").textContent;
  const ano = filme.querySelector(".filme__ano").textContent;
  buscarPoster(filme, titulo, ano);
});

async function buscarPoster(filme, titulo, ano) {
  const url =
    "https://api.themoviedb.org/3/search/movie" +
    "?api_key=" +
    API_KEY +
    "&language=pt-BR" +
    "&query=" +
    encodeURIComponent(titulo) +
    "&year=" +
    ano;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    const resultado = dados.results[0];

    if (resultado && resultado.poster_path) {
      const img = document.createElement("img");
      img.src = IMG_URL + resultado.poster_path;
      img.alt = "Pôster de " + titulo;

      filme.querySelector(".filme__capa").prepend(img);
    }
  } catch (erro) {
    console.log("Não foi possível carregar o pôster de " + titulo);
  }
}
