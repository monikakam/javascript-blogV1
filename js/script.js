'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links usuń klasę active ze wszystkich linków na liście tytułów */
  const activeLinks = document.querySelectorAll('.titles a.acive');
  for (let aciveLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link dodaj klasę active do klikniętego linka*/

  /* remove class 'active' from all articles usuń klasę active ze wszystkich artykułów*/
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link z klikniętego linka weź zawartość atrybutu href, np. #article-2*/

  /* find the correct article using the selector (value of 'href' attribute) najdź na stronie element pasujący do selektora takiego, jak wartość atrybutu href, np. #article-2 – czyli szukamy elementu o id="article-2"*/

  /* add class 'active' to the correct article dodaj klasę active do znalezionego artykułu*/
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}