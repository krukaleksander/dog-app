class Doggo {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api';
        this.imgElement = document.querySelector('.featured-dog img');
        this.backgroundElement = document.querySelector('.featured-dog__background');
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
    showAllBreeds() {
        this.listAllBreeds()
            .then(breeds => {
                for (const breed in breeds) {
                    // stop here 9.40
                    console.log(breed);
                }
            })
    }
    init() {
        this.getRandomImage()
            .then(src => {
                this.imgElement.setAttribute('src', src);
                this.backgroundElement.style.background = `url("${src}")`;
            });
        this.listAllBreeds()
            .then(breeds => console.log(breeds));
        this.showAllBreeds();
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new Doggo();
});