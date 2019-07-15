const resultado = document.querySelector('#resultadosIndice')
const secoes = document.querySelector('#secoesIndice')
const fazer = document.querySelector('#oqFazerIndice')
const root = document.querySelector('#indice')

const box = () => {
    const modal = document.createElement('div')
    modal.setAttribute('class', 'show-indice')
    root.appendChild(modal)
    return modal
}

const modalX = () => {
    const fechar = document.createElement('p')
    fechar.setAttribute('class', 'btn-fechar')
    fechar.innerHTML = 'x'
    return fechar
}
const fechar = modalX()

const criarCard = () => {
    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    return card
}

const cardX = () => {
    const fecharCard = document.createElement('p')
    fecharCard.innerHTML = 'x'
    return fecharCard
}

resultado.addEventListener('click', () => {
    const modal = box()
    modal.appendChild(fechar)
    fetch('http://localhost:5001/resultado')
        .then(response => response.json())
        .then(resultados => {
            resultados.forEach(resultado => {
                resultado.porcentagem_final.forEach(dado => {
                    const card = criarCard()
                    const fecharCard = cardX()
                    fecharCard.style.display = 'none'
                    const titulo = document.createElement('h4')
                    titulo.innerHTML = dado.nome
                    const texto = document.createElement('p')
                    texto.innerHTML = dado.porcentagem_final
                    const barra = document.createElement('hr')
                    modal.appendChild(card)
                    card.appendChild(titulo)
                    card.appendChild(barra)
                    card.appendChild(texto)
                    card.appendChild(fecharCard)
                    card.addEventListener('click', () => {
                        card.setAttribute('id', 'cardSelecionado')
                        fecharCard.style.display = 'block'
                        resultado.resumo_porcentagem.forEach(info => {
                            const valores = info.porcentagem.split('-', 3)
                            if (dado.porcentagem_final >= valores[0] && dado.porcentagem_final <= valores[1]) {
                                titulo.innerHTML = info.porcentagem
                                texto.innerHTML = info.resumo
                            }
                            card.addEventListener('click', () => {
                                texto.innerHTML = dado.porcentagem_final
                                titulo.innerHTML = dado.nome
                                card.removeAttribute('id', 'cardSelecionado')
                                card.removeChild(fecharCard)
                            })
                        })
                    })
                })
            })
        })
        .catch(error => console.log(error))
    fechar.addEventListener('click', ()=> modal.remove())
})

secoes.addEventListener('click', () => {
    const modal = box()
    modal.appendChild(fechar)
    fetch('http://localhost:5001/secoes')
        .then(response => response.json())
        .then(secoes => {
            secoes.forEach(secao => {
                const botao = document.createElement('button')
                botao.setAttribute('class', 'btn-modal')
                botao.innerHTML = secao.nome
                modal.appendChild(botao)
                botao.addEventListener('click', () => {
                    const card = criarCard()
                    const lista = document.createElement('ul')
                    card.appendChild(lista)
                    modal.appendChild(card)
                    secao.questoes_analisadas.forEach(item => {
                        const texto = document.createElement('li')
                        texto.innerHTML = item
                        lista.appendChild(texto)
                    })
                    card.addEventListener('click', () => {
                        card.removeChild(lista)
                    const fecharCard = cardX()
                        card.appendChild(fecharCard)
                        secao.porcentagem_final.forEach(empresa => {
                            const dados = document.createElement('p')
                            dados.innerHTML = `<strong>${empresa.marca}</strong>: ${empresa.porcentagem_final}`
                            card.appendChild(dados)
                        })
                        card.addEventListener('click', () => modal.removeChild(card))
                    })
                })
            })
        })
        .catch(error => console.log(error))
    fechar.addEventListener('click', ()=> modal.remove())
})

fazer.addEventListener('click', () => {
    const modal = box()
    modal.appendChild(fechar)
    fetch('http://localhost:5001/atitudes')
        .then(response => response.json())
        .then(atitudes => {
            atitudes.forEach(atitude => {
                const card = criarCard()
                const titulo = document.createElement('h4')
                titulo.innerHTML = atitude.quem
                const lista = document.createElement('ul')
                const barra = document.createElement('hr')
                const fecharCard = cardX()
                modal.appendChild(card)
                card.appendChild(titulo)
                card.appendChild(barra)
                card.appendChild(lista)
                card.appendChild(fecharCard)
                atitude.atitudes.forEach(item => {
                    const texto = document.createElement('li')
                    texto.innerHTML = item
                    lista.appendChild(texto)
                    card.appendChild(fecharCard)
                    card.addEventListener('click', () => modal.removeChild(card))
                })
            })
        })
        .catch(error => console.log(error))
    fechar.addEventListener('click', ()=> modal.remove())
})