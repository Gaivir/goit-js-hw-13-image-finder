import './styles.css';
import getRefs from './js/get-refs';
import imgCardTpl from './templates/img-card.hbs';
import ImgsApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import { error } from './js/notofications';
import './js/pnotify';


const refs = getRefs();

const imgsApiService = new ImgsApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
console.log(loadMoreBtn);




refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fechImgs);




function onSearch(elm) {
    elm.preventDefault();

    imgsApiService.query = elm.currentTarget.elements.query.value;
    clearImagesContainer();

    if (imgsApiService.query === ' '|| imgsApiService.query === '') {
       error({ text: 'Cant find nothing. Please try again' });
         loadMoreBtn.hide();
        return 
    };
    
    loadMoreBtn.show();
    imgsApiService.resetPage();
    fechImgs();
    }



function fechImgs() {
    loadMoreBtn.disable();
    imgsApiService.featchImages().then(hits => {
        appendImagesMarkup(hits);
        loadMoreBtn.enable();
    });
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



