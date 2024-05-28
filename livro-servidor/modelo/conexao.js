const banco = require('mongoose');
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}
const dbURI = "mongodb+srv://narsheehsran:VIzZg8DpWMxTnG1A@cluster.dzascef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

banco.connect(dbURI, options)
.then(() => {
  console.log("Conexão estabelecida com sucesso!");
})
.catch((err) => {
  console.log("Erro ao conectar ao banco de dados: ", err)
});

module.exports = banco;