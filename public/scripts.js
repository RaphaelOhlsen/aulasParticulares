const currentPage = location.pathname;
const menuItens = document.querySelectorAll('header .links a')

menuItens.forEach(item => {
 if(currentPage.includes(item.getAttribute('href')))
  item.classList.toggle('active');
})