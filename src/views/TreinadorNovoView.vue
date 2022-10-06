<script>
    import TreinadorDataService from'../services/TreinadorDataService';
    import TreinadorRequest from '../models/TreinadorRequest';
    import Loading from "vue-loading-overlay";
    export default{
        name:'treinadores-novo',
        data(){
            return{ 
    
                treinador: new Treinador(),
                salvo: false
            }
        },
        methods:{
            salvar(){
              TreinadorDataService.criar(this.tipo)
              .then(resposta => {
                this.treinador.id = resposta.id;
                console.log(this.treinador);
                this.salvo = true;
              })
              .catch(erro => {
                console.log(erro);
                this.salvo = false;
              })
            },
    
            novo(){
              this.treinador = new Treinador();
              this.salvo = false;
            },
              voltar() {
          this.$router.push({ name: "treinadores-lista" });
        },
    
        },
    }
    </script>
    <template>
      <div v-if="!salvo"> 
       <form>
      <div class="mb-3">
        <label for="nome" 
        class="form-label">Nome do Tipo</label>
        <input type="text" 
        required
        class="form-control" 
        v-model="treinador.nome"
        id="nome" >
      </div>
      <button @click.prevent="salvar"  class="btn btn-success">Salvar</button>
    </form>
    </div>
    
    <div v-else>
      <h4>Salvo com sucesso!</h4>
      <span>Treinador id: {{treinador.id}}</span>
      <div class="row-sm">
        <button @click="novo" class="btn btn-primary">Novo</button>
      </div>
    </div>
    
    </template>