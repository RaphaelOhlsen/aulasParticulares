const currentPage = location.pathname;
const menuItens = document.querySelectorAll('header .links a')
const formDelete = document.querySelector('#form-delete');

menuItens.forEach(item => {
 if(currentPage.includes(item.getAttribute('href')))
  item.classList.toggle('active');
})

formDelete.addEventListener('submit', e => {
  const confirmation = confirm('Deseja Deletar?');
  if(!confirmation) e.preventDefault();
})
