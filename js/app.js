class Doggo {
    constructor() {
        this.apiUrl = 'https://dog.ceo/api';
        this.imgElement = document.querySelector('.featured-dog img');
        this.backgroundElement = document.querySelector('.featured-dog__background');
        this.tilesElement = document.querySelector('.tiles');
        this.spinnerElement = document.querySelector('.spinner');
        this.init();
    }
    showLoading() {
        this.spinnerElement.classList.add('spinner--visible');
    };
    hideLoading() {
        this.spinnerElement.classList.remove('spinner--visible');
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
    showImageWhenReady(src) {
        this.imgElement.setAttribute('src', src);
        this.backgroundElement.style.background = `url("${src}")`;
        this.hideLoading();
    };
    addBreed(breed, subBreed) {
        let name, type;
        if (typeof subBreed === 'undefined') {
            name = breed;
            type = breed;
        } else {
            name = `${breed} ${subBreed}`;
            type = `${breed}/${subBreed}`;
        }

        const tile = document.createElement('div');
        tile.classList.add('tiles__tile');
        const tileContent = document.createElement('div');
        tileContent.classList.add('tiles__tile-content');

        tileContent.innerText = name;
        tileContent.addEventListener('click', () => {
            window.scrollTo(0, 0);
            this.showLoading();
            this.getRandomImageByBreed(type)
                .then(src => this.showImageWhenReady(src));
        });
        tile.appendChild(tileContent);
        this.tilesElement.appendChild(tile);
    };

    showAllBreeds() {
        this.listAllBreeds()
            .then(breeds => {
                for (const breed in breeds) {
                    if (breeds[breed].length === 0) {
                        this.addBreed(breed);
                    } else {
                        for (const subBreed of breeds[breed]) {
                            this.addBreed(breed, subBreed);
                        }
                    }
                }
            })
    };
    init() {
        this.showLoading();
        this.getRandomImage()
            .then(src => this.showImageWhenReady(src));
        this.listAllBreeds()
            .then(breeds => console.log(breeds));
        this.showAllBreeds();
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new Doggo();
});