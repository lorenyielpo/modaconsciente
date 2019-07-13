const btnEtiqueta = document.querySelector('#etiqueta')
const token = localStorage.getItem('token')
const email = localStorage.getItem('email')

fetch('http://localhost:3000/consumidores')
    .then(response => response.json())
    .then(consumidores => {
        
        const consumidor = consumidores.find(consumidor => {
            return consumidor.email == email
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

            fetch(`http://localhost:3000/consumidores/adicionar-etiqueta/${consumidor._id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Barear ${token}`
                },
                body: JSON.stringify(etiqueta)
            })
        })

    })
    .catch(error => console.log(error))
btnEtiqueta.addEventListener('click', (e) => {
    e.preventDefault()


})
