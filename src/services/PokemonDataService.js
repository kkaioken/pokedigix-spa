import http from '../http-commons';

class PokemondataService {
	async buscarTodos() {
		let reposta = await http.get('/pokemons');
		return reposta.data;
	}

	async buscarPeloId(id) {
		let reposta = await http.get('/pokemons/' + id);
		return reposta.data;
	}


	async criar(pokemon) {
		let reposta = await http.post('/pokemons', pokemon);
		return reposta.data;
	}

	async atualizar(id, pokemon) {
		let reposta = await http.put('/pokemons/'+ id, pokemon);
		return reposta.data;

	}


	async remover(id) {
		await http.delete('/pokemons/' + id);

	}


	async buscarPeloNome(nome) {
		let reposta = await http.put('/pokemons?termo=' + nome);
		return reposta.data;
	}


	async deletarPeloNome(nome) {
		http.delete('/pokemons?termo=' + nome);
	}

	async buscarPeloIdDoTipo(id) {
		let reposta = await http.get('/pokemons/' + id);
		return reposta.data;
	}

}
export default new PokemondataService();