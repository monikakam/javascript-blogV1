'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links usuń klasę active ze wszystkich linków na liście tytułów */
  const activeLinks = document.querySelectorAll('.titles a.acive');
  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link dodaj klasę active do klikniętego linka*/
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles usuń klasę active ze wszystkich artykułów*/
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link z klikniętego linka weź zawartość atrybutu href, np. #article-2*/
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) najdź na stronie element pasujący do selektora takiego, jak wartość atrybutu href, np. #article-2 – czyli szukamy elementu o id="article-2"*/
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  /* add class 'active' to the correct article dodaj klasę active do znalezionego artykułu*/
  targetArticle.classList.add('active');
}

/*const links = document.querySelectorAll('.titles a');
console.log(links);

for(let link of links){
  link.addEventListener('click', titleClickHandler);
} przeniesiona na miejsce po funkcji generateTitleLinks*/

const optArticleSelector = '.post', /*pojedynczy artykul z id*/
optTitleSelector = '.post-title', /* tytul artykulu czyli Artykul 1 itd */
optTitleListSelector = '.titles'; /*lista linkow*/

function generateTitleLinks() {
  console.log(generateTitleLinks);
/*remove contents of titleList usun zawartosc listy linkow w lewej kolumnie*/
const titleList = document.querySelector(optTitleListSelector);

titleList.innerHTML = '';
/* find all the articles and save them to variable*/
const articles = document.querySelectorAll(optArticleSelector);

let html = '';
for(let article of articles) {
/*for each the article get the article id*/
article.getAttribute(optArticleSelector);
  /*for each article find the title element id dla kazdego artykulu znajdz element z tytulem i zapisz jego zawartos do satlej*/
const articleId = article.getAttribute('id');
/*for each article get the title from the title element*/
const articleTitle = article.querySelector(optTitleSelector).innerHTML;
/*for each article create HTML of the link dla kazdego artykulu na podstawie tych informacji stworz kod HTML linka i zapisz go do stalej*/
const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
console.log(linkHTML);
/*for each article insert link into titleListdla kazdego artykulu wstaw stworzony kod html do listy linkow w lewj kolumnie*/
html = html + linkHTML;
console.log(html);
}
  titleList.innerHTML = html;
}
  generateTitleLinks();

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }  
