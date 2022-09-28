<script>
	import AtaqueDataService from '../services/AtaqueDataService';
	import AtaqueRequest from '../models/AtaqueRequest';
	import AtaqueResponse from '../models/AtaqueResponse';
	import TipoDataService from '../services/TipoDataService';
	import PokemonDataService from '../services/PokemonDataService';
	export default {
		name: 'pokemon-novo',
		data() {
			return {
				pokemonRequest: new PokemonRequest(),
				pokemonResponse: new PokemonResponse,
				salvo: false,
				categorias: [
					{
						indice: 1,
						nome: "Físico",
						nomeBanco: "FISICO"
					}, {
						indice: 2,
						nome: "Especial",
						nomeBanco: "ESPECIAL"
					}, {
						indice: 3,
						nome: "Efeito",
						nomeBanco: "EFEITO"
					}
				],
				tipos: [],
				desabilitarForca: true
			}
		},
		methods: {
			salvar() {
				AtaqueDataService.criar(this.ataqueRequest)
					.then(resposta => {
						this.ataqueResponse = resposta;
						this.salvo = true;
					})
					.catch(erro => {
						console.log(erro);
					});
			},
			novo() {
				this.salvo = false;
				this.desabilitarForca = false;
				this.ataqueRequest = new AtaqueRequest();
				this.ataqueRequest.categoria = this.categorias[1].nomeBanco;
				this.ataqueResponse = new AtaqueResponse();
			},
			carregarTipos() {
				TipoDataService.buscarTodos()
					.then(resposta => {
						this.tipos = resposta;
						this.ataqueRequest.tipoId = this.tipos[0].id;
					})
					.catch(erro => {
						console.log(erro);
					});
			},
			escolherCategoria() {
				if (this.ataqueRequest.categoria == "EFEITO") {
	
					this.desabilitarForca = true;
				} else {
					this.desabilitarForca = false;
				}
			}
		},
		mounted() {
			this.novo();
			this.carregarTipos();
		}
	}
	</script>
		
	<template>
		<h2 class="mt-4 mb-4">Cadastrar um novo Ataque</h2>
		<div class="border p-2 rounded row-1 col-6 ">
			<div v-if="!salvo">
				<form class="row g-3">
					<div class="col-12">
						<label for="nome" class="form-label">Nome do Pokemon;</label>
						<input type="Text" class="form-control" v-model="pokemonRequest.nome" id="nome"
							placeholder="ex. Pikachu" required>
					</div>
					<div class="col-6" v-show="mostrarForca">
						<label for="altura" class="form-label">Altura:</label>
						<imput type="test" class="form-control"
							v-model="pokemonRequest.forca" id="altura"> </imput>
					</div>
					<div class="col-6">
						<label for="peso" class="form-label">Peso: </label>
						<input type="Text" class="form-control" v-model="pokemonRequest.peso" id="peso"
							placeholder="peso(em kg)" required>
					</div>
					<div class="col-9">
						<label for="genero" class="form-label">Categoria: </label>
						<select id="genero" class="form-select" v-model="pokemonRequest.genero">
							<option v-for="genero in generos" :key="genero.indice" :value="genero.nomeBanco">
								{{genero.nome}}</option>
						</select>
					</div>
					<div class="col-3">
						<label for="pp" class="form-label">PP: </label>
						<input type="number" class="form-control" v-model="ataqueRequest.pontosDePoder" id="pp" required>
					</div>
					<div class="col-12">
						<label for="tipo" class="form-label">Tipo do ataque: </label>
						<select id="tipo" class="form-select" v-model="ataqueRequest.tipoId">
							<option v-for="tipo in tipos" :key="tipo.id" :value="tipo.id">
								{{tipo.nome}}
							</option>
						</select>
					</div>
					<div class="col-12">
						<label for="descricao" class="form-label">Descrição do Ataque: </label>
						<textarea class="form-control" id="descricao" v-model="ataqueRequest.descricao" rows="3"></textarea>
					</div>
	
					<div>
						<button @click.prevent="salvar" class="btn btn-danger row-1">Cadastrar</button>
					</div>
				</form>
			</div>
			<div v-else>
				<div class="row">
					<h4 class="mt-2">Ataque cadastrado com sucesso!</h4>
					<span>Ataque cadastrado: {{ataqueRequest.nome}}</span>
				</div>
				<div class="row-sm">
					<button @click="novo" class="btn btn-dark mt-2">Novo</button>
				</div>
			</div>
		</div>
	</template>