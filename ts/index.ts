const bigCatsJson = [
    { "species": "Big Cats", "name": "Tiger", "size": "10 ft", "location": "Asia" },
    { "species": "Big Cats", "name": "Lion", "size": "8 ft", "location": "Africa" },
    { "species": "Big Cats", "name": "Leopard", "size": "5 ft", "location": "Africa and Asia" },
    { "species": "Big Cats", "name": "Cheetah", "size": "5 ft", "location": "Africa" },
    { "species": "Big Cats", "name": "Caracal", "size": "3 ft", "location": "Africa" },
    { "species": "Big Cats", "name": "Jaguar", "size": "5 ft", "location": "Amazon" }
];

const dogsJson = [
    { "species": "Dog", "name": "Rottweiler", "size": "2 ft", "location": "Germany" },
    { "species": "Dog", "name": "German Shepherd", "size": "2 ft", "location": "Germany" },
    { "species": "Dog", "name": "Labrador", "size": "2 ft", "location": "UK" },
    { "species": "Dog", "name": "Alabai", "size": "4 ft", "location": "Turkey" }
];

const bigFishJson = [
    { "species": "Big Fish", "name": "Humpback Whale", "size": "15 ft", "location": "Atlantic Ocean" },
    { "species": "Big Fish", "name": "Killer Whale", "size": "12 ft", "location": "Atlantic Ocean" },
    { "species": "Big Fish", "name": "Tiger Shark", "size": "8 ft", "location": "Ocean" },
    { "species": "Big Fish", "name": "Hammerhead Shark", "size": "8 ft", "location": "Ocean" }
];

// Animals :- Big Cats, Dogs,  Big Fish (Species)
// Properties
// Species
// Name
// Size
// Location
// animal Image

/**
 * Base Animal class having these properties (species, name, size, location, image)
 *
 */
class Animal {
    species: string;
    name: string;
    size: number;
    location: string;
    image: string;
    constructor(
        species: string,
        name: string,
        size: number,
        location: string,
        image:string = "default-animal-image.jpg"
    ) {
        this.species = species;
        this.name = name;
        this.size = size;
        this.location = location;
        this.image = image;
    }
}

/**
 * Base Animal Table class
 */
class AnimalTable {
    containerId: string;
    animalsData: Animal[];
    constructor(containerId: string, animalData: Animal[]) {
        this.containerId = containerId;
        this.animalsData = animalData;
        this.render();  // Rendering of the element as soon as the Object instantiated
    }
    /**
     * 
     * Rendering of the Actual HTML content through DOM
     */
    render(){
        // First get the element by containerId
        const container = document.getElementById(this.containerId);

        // Element check
        if (!container) {
            console.error(`Element with ID "${this.containerId}" not found.`);
            return;
        }

        // first main goal is to render these data in the table
        let table = `<table><thead><tr>`;
        console.log(this.animalsData)
        // generate the heading
        Object.keys(this.animalsData[0]).forEach((heading,_)=>{
            table = table + `<th>${heading}</th>`
        })
        table = table + `</table></thead></tr>`;
 
        container.innerHTML = table
    }
}

/**
 * As Our JSON does not includes any images we have programmatically set the image to it
 */
const bigCatsAnimal = bigCatsJson.map(({species, name, size, location},_)=>{
    const newBigCatAnimal = new Animal(species, name, Number(size), location) // image is default taken
    return newBigCatAnimal;
})

const bigCatsTable = new AnimalTable("bigCatsTable",bigCatsAnimal);