<script>
import AtaqueDataService from '../services/AtaqueDataService';
import TipoDataService from '../services/TipoDataService';
export default {
	name: "lista-tipos",
	data() {
		return {
			tipos: [],
			tipoSelecionado: this.inicializarTipo(),
			isLoading: false,
			fullPage: false
		};
	},
	components: {
		Loading,
	},
	methods: {
		buscarTipos() {
			this.isLoading = true;
			TipoDataService.buscarTodos()
				.then((resposta) => {
					this.tipos = resposta;
					this.isLoading = false;
				})
				.catch((erro) => {
					console.log(erro);
					this.isLoading = false;
				});
		},
		editar(id) {
			this.$router.push({ name: 'tipos-edit', params: { id: id } });
		},
		selecionar(tipo) {
			this.ataqueSelecionado.id = ataque.id;
			this.ataqueSelecionado.nome = ataque.nome;
		},
	},
	selecionar(tipo) {
		this.tipoSelecionado.id = tipo.id;
		this.tipoSelecionado.nome = tipo.nome;
	},
	inicializarTipo() {
		return {
			id: null,
			nome: null
		}
	},
	removerTipoSelecionado() {
		this.isLoading = false;
		TipoDataService.remover(this.tipoSelecionado.id)
			.then(() => {
				this.tipo = this.tipo.filter(tipo => tipo.id != this.tipoSelecionado.id);
				this.inicializarTipo();
				this.isLoading = false;
			})
			.catch(() => {
				this.inicializarTipo();
				this.isLoading = false;
			});
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
							<td class="text-center">{{tipo.nome}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</main>
</template>
		