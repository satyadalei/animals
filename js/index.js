"use strict";
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
    constructor(species, name, size, location, image = "default-animal-image.jpg") {
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
    constructor(containerElement, animalData, tableName) {
        this.containerElement = containerElement;
        this.animalsData = animalData;
        this.tableName = tableName;
        this.render(); // Rendering of the element as soon as the Object instantiated
    }
    /**
     *
     * Rendering of the Actual HTML content through DOM
     */
    render() {
        // Element check
        // Validate the container element
        if (!this.containerElement) {
            console.error(`Container element is not provided.`);
            return;
        }
        // first main goal is to render these data in the table
        let mainHeading = `<h3>${this.tableName}</h3>`;
        let table = `<table><thead><tr>`;
        console.log(this.animalsData);
        // generate the headings of table
        Object.keys(this.animalsData[0]).forEach((heading, _) => {
            table = table + `<th>${heading}</th>`;
        });
        // end of Heading
        table = table + `</tr></thead>`;
        // Rendering of rows
        // Each row
        this.animalsData.forEach((animal, _) => {
            let columnsInASingleRow = ``;
            // Each columns of Row
            Object.keys(animal).forEach((animalPropertyName, _) => {
                const key = animalPropertyName;
                columnsInASingleRow = columnsInASingleRow + `<td>
                  ${animal[key]}
               </td>`;
            });
            table = table + `<tr>${columnsInASingleRow}</tr>`;
        });
        // Ending of Table
        table = table + `</table>`;
        // Render rows
        const ElementsGroup = mainHeading + table;
        this.containerElement.innerHTML = ElementsGroup;
    }
}
/**
 * As Our JSON does not includes any images we have programmatically set the image to it
 */
const bigCatsAnimalJSONWithImage = bigCatsJson.map(({ species, name, size, location }, _) => {
    const newBigCatAnimal = new Animal(species, name, size, location); // image is default taken
    return newBigCatAnimal;
});
const dogsAnimalJSONWithImage = dogsJson.map(({ species, name, size, location }, _) => {
    const newDogAnimal = new Animal(species, name, size, location); // image is default taken
    return newDogAnimal;
});
const bigFishAnimalJSONWithImage = bigFishJson.map(({ species, name, size, location }, _) => {
    const newBigFishAnimal = new Animal(species, name, size, location); // image is default taken
    return newBigFishAnimal;
});
const bigCatsContainerDivElement = document.getElementById("bigCatsTable");
const dogsContainerDivElement = document.getElementById("dogsTable");
const bigFishContainerDivElement = document.getElementById("bigFishTable");
if (bigCatsContainerDivElement) {
    console.log("---------- Rendering Big Cats ------------");
    const bigCatsTable = new AnimalTable(bigCatsContainerDivElement, bigCatsAnimalJSONWithImage, "Big Cats");
}
if (dogsContainerDivElement) {
    console.log("---------- Rendering ------------");
    const dogsTable = new AnimalTable(dogsContainerDivElement, dogsAnimalJSONWithImage, "Big Cats");
}
if (bigFishContainerDivElement) {
    console.log("----------------------");
    const bigFishTable = new AnimalTable(bigFishContainerDivElement, bigFishAnimalJSONWithImage, "Big Cats");
}
