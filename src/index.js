import './styles.css';
import getRefs from './js/get-refs';
import imgCardTpl from './templates/img-card.hbs';
import ImgsApiService from './js/fetch-imgs';
import { error } from './js/notofications';






const refs = getRefs();

const imgsApiService = new ImgsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.buttonForLoad.addEventListener('click', onLoadMore);




function onSearch(elm) {
    elm.preventDefault();
    if (imgsApiService.query === "") {
        return error({text: 'Cant find nothing. Please try again'});
        
    };
    
    clearImagesContainer();

    imgsApiService.query = elm.currentTarget.elements.query.value;
    imgsApiService.resetPage();
    imgsApiService.featchImages().then(appendImagesMarkup);
    
    
  
    }

function onLoadMore() {
     imgsApiService.featchImages().then(appendImagesMarkup);
}


function appendImagesMarkup(hits) {
    refs.galleryList.insertAdjacentHTML('beforeend', imgCardTpl(hits));
    window.scrollBy({
    top: document.documentElement.scrollHeight,
    left: 100,
    behavior: 'smooth'
});
}

function clearImagesContainer() {
    refs.galleryList.innerHTML = "";
}

