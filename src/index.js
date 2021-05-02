import './styles.css';
import getRefs from './js/get-refs';
import imgCardTpl from './templates/img-card.hbs';
import ImgsApiService from './js/fetch-imgs';

const refs = getRefs();


const imgsApiService = new ImgsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.buttonForLoad.addEventListener('click', onLoadMore);

function onSearch(elm) {
    elm.preventDefault();
    imgsApiService.query = elm.currentTarget.elements.query.value;

    if (imgsApiService.query === "") {
        return alert('ДУРНА НАЗВА. ПОВТОРИ СПРОБУ');
    }

    imgsApiService.resetPage();

    imgsApiService.featchArticles().then(articles => {
        clearArticlesContainer();
        appendArticlesMarkup(articles);
    });

}

function onLoadMore() {
    imgsApiService.featchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup() {
    refs.galleryList.insertAdjasentHTML('beforeend', imgCardTpl(articles));
}

function clearArticlesContainer() {
    refs.galleryList.innerHTML = "";
}