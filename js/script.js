'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-authors-list').innerHTML),
};

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorListSelector = '.list.authors';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');

  };

  const generateTitleLinks = function(customSelector =''){
    //event.preventDefault();

    /* remove links list */

    const linksList = document.querySelector(optTitleListSelector);
    linksList.innerHTML= '';

    /* read article id and save it as const */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){
      const articleId = article.getAttribute('id');

      /* find element with title and save it as const */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* write html code from both const */

      //const linkHTML = '<li><a href="#' + articleId + ' "><span>' + articleTitle + '</span></a></li>';
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* input html code to column */

      html = html + linkHTML;
    }

    // titleList.innerHTML = html;
    linksList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  const calculateTagsParams = function(tags){
    const params = {
      max: 0,
      min: 999999,
    };
    for(let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;

  };

  const calculateTagClass = function(count, params){
    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      let tagsWrapper = article.querySelector(optArticleTagSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const tagsList = article.getAttribute('data-tags');

      /* split tags into array */
      const tagsArray = tagsList.split(' ');

      /* START LOOP: for each tag */
      for(let tag of tagsArray){

        /* generate HTML of the link */
        //let tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        const linkHTMLData = {tagId: tag, tagTitle: tag};
        const tagHTML = templates.tagLink(linkHTMLData);

        /* add generated code to html variable */
        html = html + tagHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]){

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        }else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* Find  peak and pit*/
    const tagsParams = calculateTagsParams(allTags);

    /* [NEW] create variable for all links HTML code */
    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '  ' + ' </a></li>';
      allTagsData.tags.push({
        tag: tag,
        count : allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);

  };

  generateTags();

  const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

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
    for(let tagLink of tagLinks){

      /* remove class active */
      tagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    let tagLinksActive = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let tagLinkActive of tagLinksActive){

      /* add class active */
      tagLinkActive.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function(){
    /* find all links to tags */
    let links = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for( let link of links){

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
    }

  };

  addClickListenersToTags();

  /* Add Authors Params */

  const generateAuthors = function(){
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
      const linkHTMLData = {authorId: author, author: author};
      const authorHTML = templates.authorLink(linkHTMLData);

      /* Check if author is not already in allAuthors */
      if(!allAuthors[author]){

        /* Add author to allAuthors */
        allAuthors[author] = 1;
      }else{
        allAuthors[author]++;
      }

      /* Add html author code to empty html variable*/
      html = html + authorHTML;

      /* Display html in wrapper*/
      authorWrapper.innerHTML = html;

    /* End LOOP for every article */
    }
    /* Find Author list wrapper */
    const authorWrapper = document.querySelector(optAuthorListSelector);

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
      });
    }

    authorWrapper.innerHTML = templates.authorListLink(allAuthorsData);
    console.log(allAuthorsData);

  };

  generateAuthors();

  const authorClickHandler = function(event){

    /* Add prevent default function to event */
    event.preventDefault();

    /* Make clicked element variable and asign 'this value to it' */
    const clickedElement = this;

    /* Read href atribute of clicked element */
    const authorhref = clickedElement.getAttribute('href');
    console.log(authorhref);

    /* Make author variable and extract author from href atribute */
    const author = authorhref.replace('#author-', '');
    console.log(author);

    /* Find all active author links */
    let authorLinks = document.querySelectorAll('a.active[data-author=""]');

    /* Start LOOP for every active author links */
    for(let authorLink of authorLinks){

      /* Remove active class */
      authorLink.classList.remove('active');

    /* End LOOP */
    }

    /* Find all author articles */
    const aritclesAuthorList = document.querySelectorAll('a[data-author="' + author + '"');

    /* Start LOOP for every author article */
    for(let articleAuthor of aritclesAuthorList){

      /* Add active class */
      articleAuthor.classList.add('active');

    /* End LOOP */
    }

    /* execute function "generateTitleLinks" with author selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  };

  const addClickListenersToAuthors = function(){

    /* Find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* Start LOOP for every author link */
    for(let authorLink of authorLinks){

      /* Add authorClickHandler to link as event listener */
      authorLink.addEventListener('click', authorClickHandler);

    /* End LOOP */
    }

  };

  addClickListenersToAuthors();

}