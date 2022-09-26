<script>
	import AtaqueDataService from '../services/AtaqueDataService';
	import AtaqueRequest from '..//models/Ataque'
	import TipoDataService from '../services/TipoDataService';
	export default {
		name: 'ataques-novo',
		data() {
			return {
				ataqueRequest: new AtaqueRequest(),
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
				tipos: []
			}
		},
		methods: {
			salvar() {
				AtaqueDataService.criar(this.ataqueRequest)
					.then(resposta => {
						console.log(this.ataqueRequest);
						this.salvo = true;
					})
					.catch(erro => {
						console.log(erro);
						console.log(this.ataqueRequest);
						this.salvo = false;
					})
			},
			novo(){
				this.ataqueRequest = new AtaqueRequest();
				this.salvo = false;
			},
			carregarTipo() {
				this.tipos = TipoDataService.buscarTodos()
					.then(resposta => {
						this.tipos = resposta;
						this.ataqueRequest.tipoId = this.tipos[0].id;
					})
					.catch(erro => {
						console.log(erro);
					});
			},
		},
		mounted() {
			this.ataqueRequest.categoria = this.categorias[1].nomeBanco;
			this.carregarTipo();
		}
	}
	</script>
	
	<template>
		<h2 class="mt-4 mb-4">Cadastrar um novo Ataque</h2>
		<div class="border p-2 rounded row-1 col-6 ">
			<div v-if="!salvo">
				<form class="row g-3">
					<div class="col-12">
						<label for="nome" class="form-label">Nome do Ataque: </label>
						<input type="Text" class="form-control" v-model="ataqueRequest.nome" id="nome"
							placeholder="ex. Choque do trovão" required>
					</div>
					<div class="col-6">
						<label for="forca" class="form-label">Força:</label>
						<input type="Text" class="form-control" v-model="ataqueRequest.forca" id="forca"
							placeholder="0 - 50" required>
					</div>
					<div class="col-6">
						<label for="acuracia" class="form-label">Acurácia: </label>
						<input type="Text" class="form-control" v-model="ataqueRequest.acuracia" id="acuracia"
							placeholder="0 - 100" required>
					</div>
					<div class="col-9">
						<label for="categoria" class="form-label">Categoria: </label>
						<select id="categoria" class="form-select" aria-label="Default select example"
							v-model="ataqueRequest.categoria">
							<option v-for="categoria in categorias" :key="categoria.indice" :value="categoria.nomeBanco">
								{{categoria.nome}}</option>
						</select>
					</div>
					<div class="col-3">
						<label for="pp" class="form-label">PP: </label>
						<input type="number" class="form-control" v-model="ataqueRequest.pontosDePoder" id="pp" required>
					</div>
					<div class="col-12">
						<label for="categoria" class="form-label">Tipo do ataque: </label>
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