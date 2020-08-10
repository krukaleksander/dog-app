class Doggo {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api';
        this.imgElement = document.querySelector('.featured-dog img');
        this.init();
    }

    listAllBreeds() {
        return fetch(`${this.apiUrl}/breeds/list/all`)
            .then(resp => resp.json())
            .then(data => data.message);

    };

    getRandomImage() {
        return fetch(`${this.apiUrl}/breeds/image/random`)
            .then(resp => resp.json())
            .then(data => data.message)
    };

    getRandomImageByBreed(breed) {
        return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
            .then(resp => resp.json())
            .then(data => data.message);
    };
    init() {
        this.getRandomImage()
            .then(src => this.imgElement.setAttribute('src', src));
        this.listAllBreeds()
            .then(breeds => console.log(breeds));
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new Doggo();
});