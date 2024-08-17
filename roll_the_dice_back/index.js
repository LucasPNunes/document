const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

/**
 * Permite que o express parseie requisições no formato json
 */
app.use(
    bodyParser.urlencoded({
        extended: true,
        type: "application/json",
    })
);

/**
 * Configura o cors e permite requisições de qualquer origem e métodos HTTP.
 */

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


/**
 * Metodo GET para rolar um dado com um número específico de lados.
 * @route GET /dado/:lados
 * @param {number} req.params.lados - Número de lados do dado
 * @returns {Object} JSON com o resultado da rolagem e o número de lados do dado.
 */
app.get("/dado/:lados", (req, res) => {
    try {
        let lados = req.params.lados;
        let ladosInt = Number(lados);

        if (Number.isNaN(ladosInt)) {
            res.status(404).send("Não foi enviado um número");
            return;
        }

        let rolar = Math.floor(Math.random() * ladosInt) + 1;

        let resultado = { resultado: rolar, lados: ladosInt };

        console.log(resultado);
        res.send(resultado);
    } catch (erro) {
        console.log("Ocorreu um erro:", erro);
        res.status(500).send("Ocorreu um erro");
    }
});

/**
 * Inicia o servidor na porta definida.
 * @listens
 */

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT);
});
