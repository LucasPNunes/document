import "./App.css";
import { useState } from "react";
import Axios from "axios";

/** 
* Componente principal.
* Gerencia o state do resultado dos dados e o histórico de resultados.
*/
function App() {
    const [resultado, setResultado] = useState();
    const [resultados, setResultados] = useState([]);

    const dadosDisponiveis = [2, 4, 6, 10, 20, 100];

    /**
     * Função para rolar os dados.
     * Envia uma requisição GET para o backend passando o número de lados do dado e salva o resultado
     * @param {number} lados - Número de lados do dado.
     */
    function rolarDado(lados) {
        console.log(lados);

        Axios.get("http://localhost:3001/dado/" + lados)
            .then((res) => {
                let rolagem = { resultado: res.data.resultado, lados: lados };

                setResultado(rolagem);
                setResultados([rolagem, ...resultados]);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    return (
        <div className="App">
            <div id="dados">
                {dadosDisponiveis.map((dado) => {
                    return (
                        <button
                            onClick={() => {
                                rolarDado(dado);
                            }}
                        >
                            {`D${dado}`}
                        </button>
                    );
                })}
            </div>

            <div id="resultados">
                <div id="ultimoResultado">
                    Último resultado:{" "}
                    {resultado ? `${resultado.resultado} - D${resultado.lados}` : ""}
                </div>

                <div id="historicoResultado">
                    <h3>Histórico:</h3>

                    {resultados.map((result, i) => {
                        let lados = result.lados;
                        let resultado = result.resultado;
                        let id = i + 1;

                        return (
                            <p key={i}>
                                <span>{id}:</span>

                                <span>
                                    {resultado} - D{lados}
                                </span>
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
