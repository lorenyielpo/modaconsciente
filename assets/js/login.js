const status = document.querySelector('#statusLogin')
const btnCadastrar = document.querySelector('#cadastrar')
const btnLogin = document.querySelector('#login')



btnCadastrar.addEventListener('click', (e) => {

    e.preventDefault()

    const nome = document.querySelector('#nome').value
    const sobrenome = document.querySelector('#sobrenome').value
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value
    const idade = document.querySelector('#idade').value
    const cidade = document.querySelector('#cidade').value
    const estado = document.querySelector('#estado').value
    const pais = document.querySelector('#pais').value
    const profissao = document.querySelector('#profissao').value

    const consumidor = {
        nome,
        sobrenome,
        email,
        senha,
        idade,
        cidade,
        estado,
        pais,
        profissao
    }

    console.log(consumidor)

    fetch('http://localhost:3000/consumidores', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(consumidor)
    })
})


btnLogin.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.querySelector('#loginEmail').value
    const senha = document.querySelector('#loginSenha').value

    const dadosConsumidor = {
        email,
        senha,
    }

    fetch('http://localhost:3000/consumidores/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosConsumidor)
    })
        .then(response => response.json())
        .then(auth => {
            status.innerHTML = 'foi'
            let token = `${auth.token}`
            console.log(token)

            localStorage.setItem('token', token)
            localStorage.setItem('email', email)

            window.location.href = "cadastro_etiquetas.html"
        })
        .catch(error => console.log(error))
})

