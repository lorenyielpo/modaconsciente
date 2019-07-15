const btnEtiqueta = document.querySelector('#cadastrar-etiqueta')
const buscaEtiqueta = document.querySelector('#buscar-etiqueta')
const boxEtiquetas = document.querySelector('.box-etiquetas')
const token = localStorage.getItem('token')
const email = localStorage.getItem('email')

fetch('https://api-etiquetas.herokuapp.com/consumidores')
    .then(response => response.json())
    .then(consumidores => {
        consumidores.forEach(consumidor => {

            const usuario = consumidores.find(usuario => usuario.email == email)
            if (usuario) {
                localStorage.setItem('nome', usuario.nome)
                localStorage.setItem('sobrenome', usuario.sobrenome)
                localStorage.setItem('id', usuario._id)
            }

            buscaEtiqueta.addEventListener('click', (e) => {
                e.preventDefault()

                consumidor.etiquetas.forEach(etiqueta => {
                    const marca = document.querySelector('#marca').value
                    const razao_social = document.querySelector('#razao').value
                    const cnpj = document.querySelector('#cnpj').value
                    const pais_de_fabricacao = document.querySelector('#fabricado').value

                    if ((etiqueta.marca.includes(marca) && marca !== '') || (etiqueta.razao_social.includes(razao_social) && razao_social !== '') || (etiqueta.cnpj.includes(cnpj) && cnpj !== '') || (etiqueta.pais_de_fabricacao.includes(pais_de_fabricacao) && pais_de_fabricacao !== '')) {
                        const card = document.createElement('div')
                        card.setAttribute('class', 'card-etiqueta')
                        const marca = document.createElement('h4')
                        marca.innerHTML = etiqueta.marca
                        const barra = document.createElement('hr')
                        const razao = document.createElement('p')
                        razao.innerHTML = `Razão Social: <strong>${etiqueta.razao_social}</strong>`
                        const cnpj = document.createElement('p')
                        cnpj.innerHTML = `CNPJ: <strong>${etiqueta.cnpj}</strong>`
                        const pais = document.createElement('p')
                        pais.innerHTML = `País de Fabricação: <strong>${etiqueta.pais_de_fabricacao}</strong>`
                        boxEtiquetas.appendChild(card)
                        card.appendChild(marca)
                        card.appendChild(barra)
                        card.appendChild(razao)
                        card.appendChild(cnpj)
                        card.appendChild(pais)
                    }
                })
                
            })


        })

    })
    .catch(error => console.log(error))


btnEtiqueta.addEventListener('click', (e) => {
    e.preventDefault()

    const marca = document.querySelector('#marca').value
    const razao_social = document.querySelector('#razao').value
    const cnpj = document.querySelector('#cnpj').value
    const pais_de_fabricacao = document.querySelector('#fabricado').value

    const etiqueta = {
        marca,
        razao_social,
        cnpj,
        pais_de_fabricacao
    }

    fetch('https://api-etiquetas.herokuapp.com/consumidores')
        .then(response => response.json())
        .then(consumidores => {

                const usuario = consumidores.find(usuario => usuario.email == email)
                if (usuario) {
                    localStorage.setItem('nome', usuario.nome)
                    localStorage.setItem('sobrenome', usuario.sobrenome)
                    localStorage.setItem('id', usuario._id)
                }

                fetch(`https://api-etiquetas.herokuapp.com/consumidores/adicionar-etiqueta/${usuario._id}`, {
                    method: 'POST',
                    body: JSON.stringify(etiqueta),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                })

                location.reload()
            })
        .catch(error => console.log(error))
})
