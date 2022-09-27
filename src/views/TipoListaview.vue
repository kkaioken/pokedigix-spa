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
			<h2 class=" mb-2 mt-2">Lista de Tipos</h2>
			<div class="container row-3 col-0 ">
				<table class="table"> 
					<thead>
						<tr>
							<th scope="col">Id</th>
							<th scope="col" class="text-center">Tipo</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="tipo in tipos" :key="tipo.id">
							<td>{{tipo.id}}</td>
							<td class="text-center" >{{tipo.nome}}</td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
	</main>
</template>
		