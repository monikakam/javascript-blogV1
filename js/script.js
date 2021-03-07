'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagArticleLink: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  authorArticle: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

const optArticleSelector = '.post'; /*pojedynczy artykul z id*/
const optTitleSelector = '.post-title'; /* tytul artykulu czyli Artykul 1 itd */
const optTitleListSelector = '.titles'; /*pierwotna lista linkow w html*/
const optArticleTagsSelector = '.post-tags .list'; /*pierwotna lista tagów pod każdym artykułem*/
const optTagsListSelector = '.tags .list';
const optArticleAuthorSelector = '.post-author'; /*wrapper dla autorow*/
const optCloudClassCount = '5';
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* remove class 'active' from all article links usuń klasę active ze wszystkich linków na liście tytułów */
  const activeLinks = document.querySelectorAll('.titles a.active');
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


function generateTitleLinks(customSelector = '') { /* customSelector = '' ozancza przypisanie domyślnej wartości jeśli np. jej nie podamy*/
/*remove contents of titleList usun zawartosc listy linkow w lewej kolumnie*/
const titleList = document.querySelector(optTitleListSelector);
titleList.innerHTML = '';
/* find all the articles and save them to variable - po dodaniu custom Selector funkcja wyszuka tylko te artykuły, które będą miały poszukiwany tag*/
/* w ten sposób uzyskamy np. selektor .post[data-tags~="cat"] jeśli funkcja została wywołana z argumentem '[data~="cat"]'. Jeśli natomiast nie podano argumentu - funkcja wyszuka wszystkie artykuły czyli wszystke .post*/
const articles = document.querySelectorAll(optArticleSelector + customSelector);
let html = '';
for(let article of articles) {
/*for each the article get the article id*/
article.querySelector(optArticleSelector);
  /*for each article find the title element id dla kazdego artykulu znajdz element z tytulem i zapisz jego zawartos do satlej*/
const articleId = article.getAttribute('id');
/*for each article get the title from the title element*/
const articleTitle = article.querySelector(optTitleSelector).innerHTML;
/*for each article create HTML of the link dla kazdego artykulu na podstawie tych informacji stworz kod HTML linka i zapisz go do stalej*/
//const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
const linkHTMLData = {id: articleId, title: articleTitle};
const linkHTML = templates.articleLink(linkHTMLData);
/*for each article insert link into titleListdla kazdego artykulu wstaw stworzony kod html do listy linkow w lewj kolumnie*/
html = html + linkHTML;
}
  titleList.innerHTML = html;

  
const links = document.querySelectorAll('.titles a'); //kod odpowiedzialny za powiazanie klikniecia w linki z funkcja titleClickHandler - jesli jest wyzej to funkcja nie zadzaila
  for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

}
generateTitleLinks();



function calculateTagsParams(tags){
  
  const params = {min: 999999, max: 1};
    
  for(let tag in tags){
  //console.log(tag + ' is used ' + tgs[tag] + ' times');
  params.max = Math.max(tags[tag], params.max);
  params.min = Math.min(tags[tag], params.max);
  }
    
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  
  return optCloudClassPrefix + classNumber;  
}



function calculateAuthorsParams(authors){
  const params = {min: 999999, max: 1};
    
  for(let author in authors){
  //console.log(tag + ' is used ' + tgs[tag] + ' times');
  params.max = Math.max(authors[author], params.max);
  params.min = Math.min(authors[author], params.max);
  }
    
  return params;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  //console.log(allTags);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper w ktorym maja znalezc sie linki*/
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagArticleLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this tag is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  //let allTagsHTML = '';
  const allTagsData = {tags: []};
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' </li> ';
    //const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();


  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant czyli np. z '#tag-cat' chcemy uzyskać 'cat'; ten kod pozwoli zamienic #tag na pusty ciąg znaków*/
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active "^=" oznacza "atrybut href zaczynajacy sie od "#tag-"*/
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for(let tagLink of tagLinks){
      /* remove class active */
      tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant - w nawiasie oznacza wszystkie linki tego samego taga*/
    const activeLinksFound = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let tagLinkFound of activeLinksFound) {
      /* add class active */
      tagLinkFound.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument - znalezienie artykulów tylko z podanym tagiem*/
    /* `= oznacza: znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo tag*/
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');  
    /* START LOOP: for each link */
    for (let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);  
    /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  
  function generateAuthors(){
    /* Generate new object allAuthors */
    const allAuthors = {};

    /* Find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* Start LOOP for every article */
    for(let article of articles){     
      
      /* Find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* Make empty html variable*/
      let html = '';

      /* Get author from data-author atribute */
      const author = article.getAttribute('data-author');

      /* Generate html link code for author */
      //const authorHTML = '<a href="#author-' + author +'"> ' + author + '</a>';
      const linkHTMLData = {id: author, title: author};
      const authorHTML = templates.authorArticle(linkHTMLData);

      /* Add html author code to empty html variable*/
      html = html + authorHTML;
      /* Check if author is not already in allAuthors */
      if(!allAuthors[author]){

        /* Add author to allAuthors */
        allAuthors[author] = 1;
      }else{
        allAuthors[author]++;
      }

      

      /* Display html in wrapper*/
      authorWrapper.innerHTML = html;

    /* End LOOP for every article */
    }
    /* Find Author list wrapper */
    const authorList = document.querySelector(optAuthorsListSelector);
    const authorsParams = calculateAuthorsParams(allAuthors);
    /* Create empty HTML variable for all links */
    //let authorsListHTML = '';
    const allAuthorsData = {authors: []};

    /* Start LOOP for every author in allAuthors */
    for(let author in allAuthors){

      /* Generate HTML code for every author and add it into html code */
      //authorsListHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateTagClass(allAuthors[author], authorsParams)
      });
    }

    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    //console.log(allAuthorsData);

  }
  generateAuthors();


  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');    
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');    
    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');    
    /* START LOOP: for each active author link */
    for(let authorLink of authorLinks){
      /* remove class active */
      authorLink.classList.remove('active');
    /* END LOOP: for each active author link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinksFound = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for(let authorLinkFound of authorLinksFound) {
      /* add class active */
      authorLinkFound.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  function addClickListenersToAuthors(){
    /* find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');  
    /* START LOOP: for each link */
    for (let authorLink of authorLinks){
      /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler); 
    /* END LOOP: for each link */
    }
 }
  addClickListenersToAuthors();

  