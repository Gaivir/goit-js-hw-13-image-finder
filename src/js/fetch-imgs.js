const API_KEY = '21437628-6b5d18d73303110f60ba80b32';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImgsApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }


// метод який відповідає за HTTP запроси
    featchImages(searchQuery) {
        
    const API_KEY =  '21437628-6b5d18d73303110f60ba80b32';
    const BASE_URL = 'https://pixabay.com/api/';
    return fetch(`${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`)
            .then(r => r.json())
        .then(data => {
           
        this.incrementPage();
                return data.hits;
             });
  
    }

// метод додає сторінку
    incrementPage() {
        this.page += 1;
    }

    // метод скидає дані сторінки до дефолтних
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }



}


