const lista = document.querySelector('#termos')
const cadastrar = document.querySelector('#cadastrar-termo')
const buscar = document.querySelector('#buscar-termo')
let nomeTermo = document.querySelector('#nome-termo')
let significadoTermo = document.querySelector('#significado-termo')
let fonteTermo = document.querySelector('#fonte-termo')

fetch('https://glossario-api.herokuapp.com/glossario')
    .then(response => response.json())
    .then(termos => {

        const index = document.createElement('dl')
        index.setAttribute('class', 'grid-glossario')
        termos.forEach(termo => {
            const palavra = document.createElement('dt')
            const boxTermos = document.createElement('div')
            palavra.innerHTML = `<strong>${termo.termo}</strong>`
            const significado = document.createElement('dd')
            significado.innerHTML = `${termo.significado}`
            const fonte = document.createElement('dd')
            fonte.innerHTML = `<em>Fonte: </em>${termo.fonte}`

            lista.appendChild(index)
            index.appendChild(boxTermos)
            boxTermos.appendChild(palavra)
            boxTermos.appendChild(significado)
            boxTermos.appendChild(fonte)

            buscar.addEventListener('click', () => {
                boxTermos.remove()

                console.log(termo.termo.includes(nomeTermo.value))
                if ((nomeTermo.value !== '' && termo.termo.includes(nomeTermo.value)) || (significadoTermo.value !== '' && termo.significado.includes(significadoTermo.value))|| (termo.fonte.includes(fonteTermo.value) && fonteTermo.value !== '')){
                    const palavra = document.createElement('dt')
                    const boxTermos = document.createElement('div')
                    palavra.innerHTML = `<strong>${termo.termo}</strong>`
                    const significado = document.createElement('dd')
                    significado.innerHTML = `${termo.significado}`
                    const fonte = document.createElement('dd')
                    fonte.innerHTML = `<em>Fonte: </em>${termo.fonte}`

                    index.appendChild(boxTermos)
                    boxTermos.appendChild(palavra)
                    boxTermos.appendChild(significado)
                    boxTermos.appendChild(fonte)
                }

            })
        })
    })
    .catch(error => console.log(error))

cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const novoTermo = {
        "termo": `"${nomeTermo.value}"`,
        "significado": `"${significadoTermo.value}"`,
        "fonte": `"${fonteTermo.value}"`
    }

    fetch('https://glossario-api.herokuapp.com/glossario', {
        method: 'POST',
        body: JSON.stringify(novoTermo),
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        
    })
    .then(()=>{
        location.reload()
    })
    .catch(error => console.log(error))
    
})

