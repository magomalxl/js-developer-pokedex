const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetails = document.getElementById('pokemonDetails')

const maxRecords = 151
const limit = 10
let offset = 0


function convertPokemonToDetailed(pokemon) {
    return `
        <div  id = "ajuste" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img class = "poke" src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <ul class="detalhes">
                <li>Altura: ${pokemon.height} m</li>
                <li>Peso: ${pokemon.weight} kg</li>
            </ul>

            <div class="datespoke">
                <h3>Detalhes</h3>
                <table class="stats">
                    <tr>
                        <td>Vida</td>
                        <td><progress class="progress-is-danger" value="${pokemon.base_stats.hp}" max="100">90%</progress>
                        </td>
                    </tr>
                    <tr>
                        <td>Ataque</td>
                        <td>
                        <progress class="progress-is-danger" value="${pokemon.base_stats.attack}" max="100">90%</progress>
                </td>
                    </tr>
                    <tr>
                        <td>Defesa</td>
                        <td>
                        <progress class="progress-is-danger" value="${pokemon.base_stats.defense}" max="100">90%</progress>
                        </td>
                    </tr>
                    <tr>
                        <td>Ataque especial</td>
                        <td><progress class="progress-is-danger" value="${pokemon.base_stats.specialAttack}" max="100">90%</progress>
                        </td>
                    </tr>
                    <tr>
                        <td>Defesa especial</td>
                        <td>
                        <progress class="progress-is-danger" value="${pokemon.base_stats.specialDefense}" max="100">90%</progress>
                        </td>
                    </tr>
                    <tr>
                        <td>velocidade</td>
                        <td>
                        <progress class="progress-is-danger" value="${pokemon.base_stats.speed}" max="100">90%</progress></td>
                    </tr>
                </table>
            </div>
        </div>
    `
}


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <a href="javascript:loadPokemonDetails(${pokemon.number})">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </a>
            </div>
        </li>
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


function loadPokemonDetails(pokemonId) {
    if (pokemonId > 0)
    {
        pokeApi.getPokemons(pokemonId-1, 1).then((pokemon) => {
            const newHtml = pokemon.map(convertPokemonToDetailed)
            pokemonDetails.innerHTML = newHtml
        })

      
        window.scrollTo(0, 0)
    }
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})