const btnEtiqueta = document.querySelector('#cadastrar-etiqueta')
const buscaEtiqueta = document.querySelector('#buscar-etiqueta')
const boxEtiquetas = document.querySelector('.box-etiquetas')
const token = localStorage.getItem('token')
const email = localStorage.getItem('email')

fetch('http://localhost:6001/consumidores')
    .then(response => response.json())
    .then(consumidores => {
        consumidores.forEach(consumidor => {

            buscaEtiqueta.addEventListener('click', (e) => {
                e.preventDefault()
                localStorage.setItem('nome', consumidor.nome)
                localStorage.setItem('sobrenome', consumidor.sobrenome)
                consumidor.etiquetas.forEach(etiqueta => {
                    const marca = document.querySelector('#marca').value
                    const razao_social = document.querySelector('#razao').value
                    const cnpj = document.querySelector('#cnpj').value
                    const pais_de_fabricacao = document.querySelector('#fabricado').value
                    if (etiqueta.marca.includes(marca) && marca !== '') {
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

                    if (etiqueta.razao_social.includes(razao_social) && razao_social !== '') {
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

                    if (etiqueta.cnpj.includes(cnpj) && cnpj !== '') {
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

                    if (etiqueta.pais_de_fabricacao.includes(pais_de_fabricacao) && pais_de_fabricacao !== '') {
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

            const usuario = consumidores.find(usuario => {
                return usuario.email == email
            })

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

                fetch(`http://localhost:6001/consumidores/adicionar-etiqueta/${usuario._id}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Barear ${token}`
                    },
                    body: JSON.stringify(etiqueta)
                })
            })
        })

    })
    .catch(error => console.log(error))
