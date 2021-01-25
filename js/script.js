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
  
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles usuń klasę active ze wszystkich artykułów*/
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link z klikniętego linka weź zawartość atrybutu href, np. #article-2*/
  const articleSelector = clickedElement.getAttribute('href');
  
  /* find the correct article using the selector (value of 'href' attribute) najdź na stronie element pasujący do selektora takiego, jak wartość atrybutu href, np. #article-2 – czyli szukamy elementu o id="article-2"*/
  const targetArticle = document.querySelector(articleSelector);
  
  /* add class 'active' to the correct article dodaj klasę active do znalezionego artykułu*/
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post'; /*pojedynczy artykul z id*/
const optTitleSelector = '.post-title'; /* tytul artykulu czyli Artykul 1 itd */
const optTitleListSelector = '.titles'; /*pierwotna lista linkow w html*/
const optArticleTagsSelector = '.post-tags .list'; /*pierwotna lista tagów pod każdym artykułem*/
const optTagsListSelector = '.tags .list';
const optArticleAuthorsSelector = '.sidebar .authors';
const optCloudClassCount = '5';
const optCloudClassPrefix = 'tag-size- ';


function generateTitleLinks(customSelector = '') {
  
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

/*for each article insert link into titleListdla kazdego artykulu wstaw stworzony kod html do listy linkow w lewj kolumnie*/
html = html + linkHTML;

}
  titleList.innerHTML = html;
}
  generateTitleLinks();

  const links = document.querySelectorAll('.titles a'); //kod odpowiedzialny za powiazanie klikniecia w linki z funkcja titleClickHandler
  
    for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
}

  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll('article');
    
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
              
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
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    
    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    
    /* START LOOP: for each active tag link */
    for(let tagLink of tagLinks){
      /* remove class active */
      tagLink.classList.remove('active');
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
  const tagLinks = document.querySelectorAll('.post-tags .list a');
  
    /* START LOOP: for each link */
    for (let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);  
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthors(){
    /* find all articles */
    /*const articles = document.querySelectorAll('article');*/
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const authorsWrapper = document.querySelector(optArticleAuthorsSelector);
      console.log(authorsWrapper);
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);
      /* split tags into array */
      /*const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);*/
      /* START LOOP: for each tag */
      for(let author of articleAuthor){
        /* generate HTML of the link */
        console.log(author);
        const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
        /*const linkHTML = '<li><a href=" + articleAuthor + ">' + articleAuthor + '</a></li>';*/
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        console.log(html);
      
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the authors wrapper */
      authorsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
      }
  }
  generateAuthors();


 
  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(tag);
    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log(authorLinks);
    /* START LOOP: for each active author link */
    for(let authorLink of authorLinks){
      /* remove class active */
      authorLink.classList.remove('active');
    /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for(let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  function addClickListenersToAuthors(){
    /* find all links to authors */
  const authorLinks = document.querySelectorAll('.sidebar .authors a');
  console.log(authorLinks);
    /* START LOOP: for each link */
    for (let authorLink of authorLinks){
      /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', tagClickHandler); 
    /* END LOOP: for each link */
    }
 }
  addClickListenersToAuthors();

  


  function calculateTagsParams(tags){
    const params = {
      max: 0,
      min: 999999,
    }
    for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
    params.max = tags[tag];
    }
    if(tag[tag] < params.min) {
      params.min = tags[tag];
    }
    }
    return params;
    }
  calculateTagsParams();

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
  
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        /* [NEW] check if this link is NOT already in allTags "czytamy: jesli allTags nie ma klucza tag"*/
       if(!allTags.hasOwnProperty(tag)){
          /* [NEW] add generated code to allTags array */
         allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
  
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
      }
    /* [NEW] find list of tags in right column */
   const tagList = document.querySelector('.tags');
  
   const tagsParams = calculateTagsParams(allTags);
   console.log('tagsParams:', tagsParams);
   /*[NEW] create variable for all links HTML code */
   let allTagsHTML = '';

   /*[NEW] START LOOP: for each tag in allTags: */
   for(let tag in allTags){
     /*[NEW] generate code of a link and add it to allTagsHTML */
     allTagsHTML += tagLinkHTML;
     const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
     console.log('taglinkHTML:', tagLinkHTML);
   }
   /*[NEW] END LOOP: for each tag in allTags: */

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    tagList.innerHTML = allTagsHTML;
  }

  