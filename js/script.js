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
optTitleListSelector = '.titles', /*lista linkow*/
optArticleTagsSelector = '.post-tags .list'; /*lista tagów pod każdym artykułem*/

function generateTitleLinks(customSelector = '') {
  console.log(generateTitleLinks);
/*remove contents of titleList usun zawartosc listy linkow w lewej kolumnie*/
const titleList = document.querySelector(optTitleListSelector);

titleList.innerHTML = '';
/* find all the articles and save them to variable*/
const articles = document.querySelectorAll(optArticleSelector + customSelector);

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
  
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll('article');
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        console.log(tag);
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        console.log(html);
      
      /* END LOOP: for each tag */
    }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
  }
  generateTags();


  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clicledElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(tagLinks);
    /* START LOOP: for each active tag link */
    for(let taglink of tagLinks){
      /* remove class active */
      taglink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
  const tagLinks = document.querySelectorAll('.sidebar .list a');
  console.log(tagLinks);
    /* START LOOP: for each link */
    for (let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
    tagLink.classList.add('tagClickHandler');  
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  