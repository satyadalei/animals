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
    constructor(containerElement, animalData, tableName, allSortableFields = []) {
        this.containerElement = containerElement;
        this.animalsData = animalData;
        this.tableName = tableName;
        this.allSortableFields = allSortableFields;
        this.dynamicIdForTableSortingSelectionElement = `select-${this.tableName.trim().split(" ").join("").toLowerCase()}`;
        this.render(); // Rendering of the element as soon as the Object instantiated
    }
    /**
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
        // Dropdown for sorting
        let selectDropdown = `<select id="${this.dynamicIdForTableSortingSelectionElement}">`; // id will be used for event handling
        this.allSortableFields.forEach((sortFiled, idx) => {
            selectDropdown = selectDropdown + `<option value="${sortFiled}" ${idx === 0 ? 'selected' : ''} >${sortFiled}</option>`;
        });
        selectDropdown = selectDropdown + `</select>`;
        let table = `<table><thead><tr>`;
        /**
         * Heading of the Table
         */
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
                // applying styles
                if (this.tableName === "Dogs" && key === "name") {
                    columnsInASingleRow = columnsInASingleRow + `<td class="bold" >
                      ${animal[key]}
                   </td>`;
                }
                else if (this.tableName === "Big Fish" && key === "name") {
                    columnsInASingleRow = columnsInASingleRow + `<td class="italic blue bold" >
                    ${animal[key]}
                 </td>`;
                }
                else {
                    columnsInASingleRow = columnsInASingleRow + `<td> ${animal[key]}</td>`;
                }
            });
            table = table + `<tr>${columnsInASingleRow}</tr>`;
        });
        // Ending of Table
        table = table + selectDropdown + `</table>`;
        // Render rows
        const ElementsGroup = mainHeading + table;
        this.containerElement.innerHTML = ElementsGroup;
        /**
         * Event Listener should at the end or after injecting the elements into DOM, other wise
         * event listener will not work.
         */
        /**
        * Event listener to sort animals when selection option changes
        */
        const selectElement = document.getElementById(this.dynamicIdForTableSortingSelectionElement);
        console.log("00", selectElement, this.dynamicIdForTableSortingSelectionElement);
        if (selectElement) {
            selectElement.addEventListener("change", (event) => {
                const selectedElement = event.target;
                const selectedValue = selectedElement.value;
                console.log("------------------");
                console.log(selectedValue);
                console.log("--------------------");
                console.log(this.animalsData);
                // based on the value sort the rows
                if (selectedValue === "name" || selectedValue === "species" || selectedValue === "location") {
                    this.animalsData.sort((a, b) => {
                        const key = selectedValue;
                        if (a[key] < b[key]) {
                            return -1;
                        }
                        else if (a[key] > b[key]) {
                            return 1;
                        }
                        return 0;
                    });
                }
                /**
                 * Special types of sorting incase of size which contains both numbers & string
                 */
                if (selectedValue === "size") {
                    // handle differently for size
                    this.animalsData.sort((a, b) => {
                        const key = selectedValue;
                        /**
                         * For ex:- "5 ft" we have to split it into "5" & "ft" & then compare
                         */
                        const oneValue = Number(a[key].split(" ")[0].trim());
                        const anotherValue = Number(b[key].split(" ")[0].trim());
                        console.log("---- One Value -----", oneValue); // 5
                        console.log("----- Another Value -------", anotherValue); //10
                        if (oneValue < anotherValue) {
                            return -1;
                        }
                        else if (oneValue > anotherValue) {
                            return 1;
                        }
                        return 0;
                    });
                }
                // console.log("----- After Sorting ----------");
                // console.log(this.animalsData)
                /**
                 * Now Sorting is done we have to inject sorted elements to DOM
                 */
            });
        }
        /**
        * End of Event listener to sort animals when selection option changes
        */
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
    const sortableFieldsForBigCats = ["name", "species", "size", "location"];
    const bigCatsTable = new AnimalTable(bigCatsContainerDivElement, bigCatsAnimalJSONWithImage, "Big Cats", sortableFieldsForBigCats);
}
if (dogsContainerDivElement) {
    console.log("---------- Rendering Dogs ------------");
    const dogsTable = new AnimalTable(dogsContainerDivElement, dogsAnimalJSONWithImage, "Dogs");
}
if (bigFishContainerDivElement) {
    console.log("---------- Rendering Big Fish ------------");
    const bigFishTable = new AnimalTable(bigFishContainerDivElement, bigFishAnimalJSONWithImage, "Big Fish");
}
