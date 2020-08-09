const listAllBreeds = () => {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(resp => resp.json())
        .then(data => data.message);

};

function getRandomImage() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(resp => resp.json())
        .then(data => data.message)
};

function getRandomImageByBreed(breed) {
    return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(resp => resp.json())
        .then(data => data.message);
};

getRandomImageByBreed('boxer')
    .then(src => console.log(src))