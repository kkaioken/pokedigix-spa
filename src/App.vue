<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
export default {
  name: "ListaDePokemons",
  data() {
    return { pokemons: [] };
  },
  async created() {
    try {
      let resposta = await axios.get('http://localhost:8080/api/v1/pokemons');
      console.log(resposta);
      this.pokemons = resposta.data
    } catch (erro) {
      console.log(erro);
    }
  }
}
</script>

<template>
  <div class="container intro">
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">PokeDigix</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link active" aria-current="page">Início</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/pokemons-selvagens" class="nav-link">Pokemons selvagens</RouterLink>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Ataques
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" to="/ataques/novo">Novo</RouterLink></li>
                <li>
                  <RouterLink class="dropdown-item" to="/ataques/lista">Lista</RouterLink></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Tipos
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" to="/tipos/novo">Novo</RouterLink></li>
                <li>
                  <RouterLink class="dropdown-item" to="/tipos/lista">Lista</RouterLink></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Pokemons
              </a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" to="/pokemons/novo">Novo</RouterLink></li>
                <li>
                  <RouterLink class="dropdown-item" to="/pokemons/lista">Lista</RouterLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      <h2>Lista de Pokemon</h2>
      <ul>
        <li v-for="pokemon in pokemons" :key="pokemon.id">
          <img :src= "'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.numeroPokedex + '.png'" />
          {{pokemon.numeroPokedex}} - {{pokemon.nome}}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.intro {
  background-image: url("");
}
</style>
