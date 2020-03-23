const currentPage = location.pathname;
const menuItens = document.querySelectorAll('header .links a')

menuItens.forEach(item => {
 if(currentPage.includes(item.getAttribute('href')))
  item.classList.toggle('active');
})

function paginate(selectedPage, totalPages) {
  let pages = [],
      oldPage;
  for(let currentPage = 1; currentPage <= totalPages; currentPage++){

    const firstAndLastPage = currentPage == 1 || currentPage == 2 ||currentPage == totalPages - 1 || currentPage == totalPages;

    const pagesAfterSelectedPage = currentPage <= selectedPage + 1;

    const pagesBeforeSelectedPage = currentPage >= selectedPage -1;
    
    if(totalPages > 7) {
      if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
        if(oldPage && currentPage - oldPage > 1) pages.push('...');
        pages.push(currentPage);
        oldPage = currentPage;
      }
      if(currentPage == totalPages - 1 && currentPage - totalPages > 1) pages.push('...');
    } else pages.push(currentPage);
    
  }  
 return pages;
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);
  console.log(filter, page, total, pages);

  let elements = "";
  pages.forEach(page => {
    if(page === '...') {
      elements += `<span>${page}</span>`
    } else {
      if(filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
      } else {
        elements += `<a href="?page=${page}">${page}</a>`
      }
    }
  })
  pagination.innerHTML = elements;
}

const pagination = document.querySelector('.pagination');

if(pagination) {
  createPagination(pagination);
}

