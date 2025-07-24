import {setupTagEditor} from "./input/tagsArrayWorker.js"
import {educationInformation, experienceInformation} from "../variables.js";
import {setupExperience} from "../experience.js";
import {setupEducation} from "../education.js";

export function setupEducationEditor(container, educations) {
    const createEditBlock = (education, iterator) => {
        const block = document.createElement('span')
        block.className = 'block'
        block.dataset.name = education.name
        block.innerHTML = `
      <span class="education-bar">
        <h2>${iterator + 1}</h2>
        <span class="input-span">
            <label>Name of education:</label>
            <input id="nameInput" type="text" value="${education.name}">
        </span>
        <span class="input-span">
            <label>Place of eductaion:</label>
            <input id="placeOfEducationInput" type="text" value="${education.place}">
        </span>
        <span class="input-span">
            <label>Year start</label>
            <input id="EducationYearStartInput" type="text" value="${education.yearStart}">
        </span>
        <span class="input-span">
            <label>Year end</label>
            <input id="EducationYearEndInput" type="text" value="${education.yearEnd}">
        </span>
        <span class="input-span" id="favourite-span">
            <label>Is favourite:</label>
            <img src="./likeIcon.svg" id="favourite-image">
        </span>
        <span class="input-span">
            <label>Tags:</label>
            <span class="tags"></span>
            <button class="waves-effect waves-tea add-button">
                <img src="./x.svg">
            </button>
        </span>
        
        <span class="buttons">
            <button class=" waves-effect waves-tea edit-button">
                <img src="./pencil.svg">
            </button>
            <button class=" waves-effect waves-tea delete-button">
                <img src="./delete.svg">
            </button>
        </span>
        <p id="education-symbol" style="display: none">${JSON.stringify(education)}</p>
      </span>
    `

        const tagsContainer = block.querySelector(`.tags`)
        setupTagEditor(tagsContainer, education.tags, iterator)

        const favouriteToggle = block.querySelector('#favourite-image');
        let isFavourite = education.favourite

        if (isFavourite) {
            favouriteToggle.classList.remove('inactive');
        } else {
            favouriteToggle.classList.add('inactive');
        }

        favouriteToggle.addEventListener('click', () => {
            isFavourite = !isFavourite
            if (isFavourite) {
                favouriteToggle.classList.remove('inactive');
            } else {
                favouriteToggle.classList.add('inactive');
            }
        })

        block.querySelector('.add-button').addEventListener('click', () => {
            education.tags.push('#')
            setupTagEditor(tagsContainer, education.tags, iterator)
        })

        block.querySelector('.edit-button').addEventListener('click', () => {
            educations[iterator] = {
                'name': block.querySelector('#nameInput').value,
                'place': block.querySelector('#placeOfEducationInput').value,
                'yearStart': block.querySelector('#EducationYearStartInput').value,
                'yearEnd': block.querySelector('#EducationYearEndInput').value,
                'favourite': isFavourite,
                'tags': educationInformation[iterator].tags
            }
            educationInformation[iterator] = educations[iterator]
            setupEducation(document.querySelector('.education-container'), educationInformation)
        })

        block.querySelector('.delete-button').addEventListener('click', () => {
            console.log(block.querySelector('#education-symbol'))
            let indexToRemove = educations.indexOf(educations.find(item => item.name ===
                block.dataset.name
            ))
            educations.splice(indexToRemove, 1)
            container.removeChild(block)
            setupEducation(document.querySelector('.education-container'), educationInformation)
        })


        return block
    }

    container.innerHTML = ''

    for (let i = 0; i < educations.length; i++) {
        container.appendChild(createEditBlock(educations[i], i))
    }
}