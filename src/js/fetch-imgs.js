const API_KEY = 21437628 - '6b5d18d73303110f60ba80b32';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImgsApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    featchArticles() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`;

        return fetch(url).then(response => response.json()).then(({ articles }) => {
            this.incrementPage();
            return articles;
        });
    }



incrementPage() {
    this.page += 1;
}

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

