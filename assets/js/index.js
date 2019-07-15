const navbar = document.querySelector('#nav')
let show = document.querySelectorAll('.show')
const consumidor = document.querySelector('.inicio-texto')
const logado = document.querySelector('#logado')
const cadastroNews = document.querySelector('#cadastrar-news')

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 650) {
        navbar.setAttribute('class', 'navScroll')
    }
    if (document.documentElement.scrollTop < 650) {
        navbar.removeAttribute('class', 'navScroll')
    }
})

const emailLogado = localStorage.getItem('email')
const authLogado = localStorage.getItem('auth')
const nome = localStorage.getItem('nome')
const sobrenome = localStorage.getItem('sobrenome')


if(authLogado){
    show.forEach(elemento => {
        elemento.style.display = 'block'
    });
    const boasVindas = document.createElement('h3')
    boasVindas.innerHTML = `Olá, ${nome} ${sobrenome}`
    logado.innerHTML = 'Logout'

    logado.addEventListener('click', () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('nome')
        localStorage.removeItem('sobrenome')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        
        logado.innerHTML = 'Login'
        show.style.display = 'none'
    })
}

cadastroNews.addEventListener('click', ()=>{
    const nome = document.querySelector('#nome-news').value
    const email = document.querySelector('#email-news').value

    const dadosNews = {
        nome,
        email
    }

    fetch('http://localhost:6001/send-email', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosNews)
    })
    .then(()=>{
        nome = ''
        email = ''
    })
})