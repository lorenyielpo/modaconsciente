const resultado = document.querySelector('#resultadosIndice')
const secoes = document.querySelector('#secoesIndice')
const visoes = document.querySelector('#visoesIndice')
const fazer = document.querySelector('#oqFazerIndice')
const root = document.querySelector('#indice')


resultado.addEventListener('click', () => {

    fetch('https://api-indice-itbm.herokuapp.com/resultado')
        .then(response => response.json())
        .then(resultados => {
            resultados.forEach(resultado => {

                console.log(resultado)
                const box = document.createElement('div')
                box.setAttribute('class', 'show-indice')
                
                const fechar = document.createElement('p')
                fechar.setAttribute('class', 'btn-fechar')
                fechar.innerHTML = 'x'
                box.appendChild(fechar)

                resultado.porcentagem_final.forEach(dado => {
                    const card = document.createElement('div')
                    card.setAttribute('class', 'card')
                    const titulo = document.createElement('h4')
                    titulo.innerHTML = dado.nome
                    const texto = document.createElement('p')
                    texto.innerHTML = dado.porcentagem_final
                    const barra = document.createElement('hr')
                    const fecharCard = document.createElement('p')
                    fecharCard.innerHTML = 'x'
                    fecharCard.style.display = 'none'

                    root.appendChild(box)
                    box.appendChild(card)
                    card.appendChild(titulo)
                    card.appendChild(barra)
                    card.appendChild(texto)
                    card.appendChild(fecharCard)

                    card.addEventListener('click', () => {
                        card.setAttribute('id', 'cardSelecionado')
                        fecharCard.style = 'block'

                        resultado.resumo_porcentagem.forEach(info => {

                            console.log(info.porcentagem)
                            const valores = info.porcentagem.split('-', 3)
                            const valor1 = valores[0]
                            const valor2 = valores[1].replace('%', '')

                            console.log(valor1)
                            console.log(valor2)


                            if (dado.porcentagem_final >= valor1 && dado.porcentagem_final <= valor2) {
                                titulo.innerHTML = info.porcentagem
                                texto.innerHTML = info.resumo

                                console.log(info.porcentagem)
                                console.log(info.resumo)

                            }
                        })

                        card.addEventListener('click', (e) => {
                            e.preventDefault()
                            texto.innerHTML = dado.porcentagem_final
                            titulo.innerHTML = dado.nome
                            card.removeAttribute('id', 'cardSelecionado')
                            card.removeChild(fecharCard)
                        })

                    })
                })

                fechar.addEventListener('click', () => {
                    root.removeChild(box)
                })

            })

        })
        .catch(error => console.log(error))
})