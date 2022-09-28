import http from '../http-commons';

class TipoDataService {
	async buscarTodos() {
		let reposta = await http.get('/tipos');
		return reposta.data;
	}

	async buscarPeloId(id) {
		let reposta = await http.get('/tipos/' + id);
		return reposta.data;
	}
	async buscarPeloNome(nome) {
		let reposta = await http.put('/tipos?termo=' + nome);
		return reposta.data;
	}

	async criar(tipo) {
		let reposta = await http.post('/tipos', tipo);
		return reposta.data;
	}

	async atualizar(id, tipo) {
		let reposta = await http.put('/tipos/' + id, tipo);
		return reposta.data;

	}

	async remover(id) {
		await http.delete('/tipos/' + id);

	}

	async removerPeloNome(nome) {
		http.delete('/tipos?termo=' + nome);
	}
}
export default new TipoDataService();