const navbar = document.querySelector('#nav')

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop >= 760) {
        navbar.setAttribute('class', 'navScroll')
    }

    if (document.documentElement.scrollTop < 760) {
        navbar.removeAttribute('class', 'navScroll')
    }
})




