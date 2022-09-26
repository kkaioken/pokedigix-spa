<script>
	import AtaqueDataService from '../services/AtaqueDataService';
	import TipoDataService from '../services/TipoDataService';
	export default {
		name: "lista-tipos",
		data() {
			return { tipos: [] };
		},
		methods: {
			salvar() {
				AtaqueDataService.criar(this.tipo)
					.then(resposta => {
						this.tipo.id = resposta.id;
						console.log(this.tipo);
						this.salvo = true;
					})
					.catch(erro => {
						console.log(erro);
						this.salvo = false;
					})
			},
			buscarTipos() {
				TipoDataService.buscarTodos()
					.then(resposta => {
						this.tipos = resposta
						console.log(this.tipos);
					})
					.catch(erro => {
						console.log(erro);
					})
			}
		},
		mounted() {
			this.buscarTipos();
		}
	}
	</script>
	
	<template>
		<main>
			<div>
				<h2 class=" mb-4 mt-4">Lista de Tipos</h2>
			</div >
			<div class="container row-3 col-0 ">
			<div class="card text-bg-light m-2 " style="max-width: 150px;" v-for="tipo in tipos" :key="tipo.id">
				<ul class="list-group list-group-flush">
					<li class="list-group-item  text-bg-light space-between" >Id: {{tipo.id}} - {{tipo.nome}} 
					</li>
				</ul>
			</div>
		</div>
		</main>
	</template>