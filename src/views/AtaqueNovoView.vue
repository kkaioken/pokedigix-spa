<script>
import AtaqueDataService from '../services/AtaqueDataService';
import AtaqueRequest from '../models/AtaqueRequest';
import AtaqueResponse from '../models/AtaqueResponse';
import TipoDataService from '../services/TipoDataService';
import MensagemSucessoVue from '../components/MensagemSucesso.vue';
import MensagemErro from '../components/MensagemErro.vue';
import { Toast } from 'bootstrap';
export default {
    name: "ataques-novo",
    data() {
        return {
            ataqueRequest: new AtaqueRequest(),
            ataqueResponse: new AtaqueResponse(),
            salvo: false,
            categorias: [
                {
                    indice: 1,
                    nome: "Fisico",
                    nomeBanco: "FISICO"
                },
                {
                    indice: 2,
                    nome: "Especial",
                    nomeBanco: "ESPECIAL"
                },
                {
                    indice: 3,
                    nome: "Efeito",
                    nomeBanco: "EFEITO"
                }
            ],
            tipos: [],
            desabilitarForca: false,
            mensagemDeErro: "",
            tipo: "",
        };
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
                this.mensagemDeErro = erro.response.data.errors[0];
                this.tipo = erro.response.data.type;
                const toastLiveExample = document.getElementById("liveToast");
                const toast = new Toast(toastLiveExample);
                toast.show();
                this.salvo = false;
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
            }
            else {
                this.desabilitarForca = false;
            }
        }
    },
    mounted() {
        this.carregarTipos();
        this.novo();
    },
    components: { MensagemSucesso, MensagemErro }
}
</script>

<template>
    <div v-if="!salvo">
        <form class="row g-3" @submit.prevent="salvar">
            <div class="col-12">
                <label 
                    for="nome" 
                    class="form-label">Nome do Ataque</label>
                <input 
                    type="text"
                    placeholder="ex: Ataque do Trovao"
                    required 
                    class="form-control" 
                    v-model="ataqueRequest.nome"
                    id="nome" >
            </div>
            <div class="col-6">
                <label 
                    for="forca" 
                    class="form-label">Forca</label>
                <input 
                    type="text"
                    required :disabled="desabilitarForca"
                    class="form-control"
                    v-model="ataqueRequest.forca"
                    id="forca" >
            </div>
            <div class="col-6">
                <label 
                    for="acuracia" 
                    class="form-label">Acuracia</label>
                <input 
                    type="text"
                    required 
                    class="form-control" 
                    v-model="ataqueRequest.acuracia"
                    id="acuracia" >
            </div>
            <div class="col-3">
                <label 
                    for="pp" 
                    class="form-label">PP</label>
                <input 
                    type="number"
                    required 
                    class="form-control" 
                    v-model="ataqueRequest.pontosDePoder"
                    id="pp" >
            </div>
            <div class="col-9">
                <label for="categoria" class="form-label">Categoria</label>
                <select id="categoria" 
                    @change="escolherCategoria" 
                    class="form-select" 
                    v-model="ataqueRequest.categoria">
                    <option 
                        v-for="categoria in categorias" 
                        :key="categoria.indice" 
                        :value="categoria.nomeBanco"
                    >
                        {{categoria.nome}}
                    </option>
                </select>
            </div>
            <div class="col-12">
                <label for="tipo" class="form-label">Tipo do Ataque</label>
                <select id="tipo" class="form-select" v-model="ataqueRequest.tipoId">
                    <option 
                        v-for="tipo in tipos" 
                        :key="tipo.id" 
                        :value="tipo.id"
                    >
                        {{tipo.nome}}
                    </option>
                </select>
            </div>
            <div class="col-12">
                <label for="descricao" class="form-label">Descricao</label>
                <textarea class="form-control" 
                    id="descricao" 
                    rows="2" 
                    required
                    placeholder="ex: Esse ataque machuca"
                    v-model="ataqueRequest.descricao"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
        </form>
        <MensagemErro :mensagemDeErro="mensagemDeErro"></MensagemErro>
    </div>
    <div v-else>
        <MensagemSucesso urlListagem="ataques-lista" @cadastro="novo">
            <span>O ataque {{ataqueResponse.nome}} foi cadastrado com sucesso!</span>
        </MensagemSucesso>
    </div>
</template>