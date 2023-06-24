// https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png
// https://pokeapi.co/api/v2/

const searchInput = document.getElementById("pokemon-input");
const searchBtn = document.getElementById("poke-btn");
const pokemonContainer = document.querySelector(".pokemon-container");
const pokemonCount = 500;

const initPokemons = async () => {
    for(let i = 1; i <= pokemonCount; i++){
        await getPokemons(i);
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCards(data);
}

const createPokemonCards = (pokemon) => {
    const pokemonElement = document.createElement("div");
    const pokemonId = pokemon.id.toString().padStart(3,"0");

    pokemonElement.classList.add("pokemon-box");
    pokemonElement.innerHTML = 
    `
        <img class="pokemon-image" src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId}.png"
        alt="">
        <h3 class="pokemon-name">${pokemon.name}</h3>
        <p class="pokemon-id">#${pokemonId}</p>
        <p class="pokemon-type">Type: ${pokemon.types[0].type.name}</p>
    `;
    pokemonContainer.appendChild(pokemonElement);
}

searchInput.addEventListener("input", () => {
    const pokemonNames = document.querySelectorAll(".pokemon-name");
    const searchValue = searchInput.value.toLowerCase();
    pokemonNames.forEach((pokemonName) => {
        pokemonName.parentElement.style.display = "block";
        if (!pokemonName.innerHTML.includes(searchValue)) {
            pokemonName.parentElement.style.display= "none";
        }
    });
});

initPokemons();