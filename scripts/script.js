const pokemons = ["pikachu", "bulbasaur", "charmander", "diglett"];

pokemons.forEach((pokemon, index) => {
  const pokemonNumber = index + 1;
  createPokemonCard(pokemon, pokemonNumber);
  fillPokemonData(pokemon, pokemonNumber);
});

async function fillPokemonData(name, order) {
  
  const pokemonData = await getPokemonData(name);
  
  document.querySelector(`#imagen-pokemon-${order}`).src = pokemonData.imagen;

  animarBarra("hp", order, obtenerPuntos(pokemonData, "hp"));
  animarBarra("ataque", order, obtenerPuntos(pokemonData, "ataque"));
  animarBarra("defensa", order, obtenerPuntos(pokemonData, "defensa"));
  animarBarra("velocidad", order, obtenerPuntos(pokemonData, "velocidad"));
}

function obtenerPuntos(data, tipo) {
  return data.stats.find(t => {
    if (t.name === tipo)
      return t;
  }).amount;
}

function animarBarra(tipoBarra, order, puntos) {
  const barra = document.querySelector(`#barra-${tipoBarra}-${order}`);
  const tiempoCarga = 2000;
  const progresoCarga = tiempoCarga / 100;
  let width = 0;
  let intervalo = setInterval(aumentarProgreso, progresoCarga);

  function aumentarProgreso() {
    if (width >= puntos) {
      clearInterval(intervalo);
    } else {
      if (width < 35) {
        barra.classList.add("rojo");
        barra.classList.remove("amarillo");
        barra.classList.remove("verde");
      } else if (width <= 70) {
        barra.classList.add("amarillo");
        barra.classList.remove("rojo");
        barra.classList.remove("verde");
      } else {
        barra.classList.add("verde");
        barra.classList.remove("amarillo");
        barra.classList.remove("rojo");
      }
      width++;
    }
    barra.style.width = width + "%";
  }
}

