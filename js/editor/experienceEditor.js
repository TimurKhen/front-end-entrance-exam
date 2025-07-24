import {setupArrayInput} from "./input/inputArraysWorker.js";
import {setupExperience} from "../experience.js";
import {experienceInformation} from "../variables.js";

export function setupExperienceEditor(container, experiences) {
    const createEditBlock = (experience, iterator) => {
        const block = document.createElement('span')
        block.className = 'block'
        block.innerHTML = `
      <span class="experience-bar">
        <h2>${iterator + 1}</h2>
        <span class="input-span">
            <label>Name of experience:</label>
            <input id="nameInput" type="text" value="${experience.name}">
        </span>
        <span class="input-span">
            <label>Place of work:</label>
            <input id="placeOfWorkInput" type="text" value="${experience.placeOfWork}">
        </span>
        <span class="input-span">
            <label>Work time:</label>
            <input id="workTimeInput" type="text" value="${experience.workTime}">
        </span>
        <span class="input-span">
            <label>Start work date (Month, Year):</label>
            <input id="startDateInput" type="text" value="${experience.startDate}">
        </span>
        <span class="input-span">
            <label>End work date (Month, Year):</label>
            <input id="endDateInput" type="text" value="${experience.endDate}">
        </span>
        <span class="input-span worked-on-span">
            <label>Worked on:</label>
            <span class="worked-on"></span>
        </span>
        
           
        <span class="buttons">
            <button class=" waves-effect waves-tea edit-button">
                <img src="./pencil.svg">
            </button>
            <button class=" waves-effect waves-tea delete-button">
                <img src="./delete.svg">
            </button>
        </span>
        <p id="experience-symbol" style="display: none">${JSON.stringify(experience)}</p>
      </span>
    `

        block.querySelector('.edit-button').addEventListener('click', () => {
            experiences[iterator] = {
                'name': block.querySelector('#nameInput').value,
                'placeOfWork': block.querySelector('#placeOfWorkInput').value,
                'workTime': block.querySelector('#workTimeInput').value,
                'startDate': block.querySelector('#startDateInput').value,
                'endDate': block.querySelector('#endDateInput').value,
                'workedOn': experiences[iterator].workedOn
            }

            setupExperience(document.querySelector('.experience-blocks'), experienceInformation)
        })

        block.querySelector('.delete-button').addEventListener('click', () => {
            let indexToRemove = experiences.indexOf(experiences.find(item => item.name ===
                JSON.parse(block.querySelector('#experience-symbol').innerText).name
            ))
            experiences.splice(indexToRemove, 1)

            container.removeChild(block)
            setupExperience(document.querySelector('.experience-blocks'), experienceInformation)
        })
        setupArrayInput(block.querySelector('.worked-on'), iterator, 'worked on')

        return block
    }

    container.innerHTML = ''

    for (let i = 0; i < experiences.length; i++) {
        container.appendChild(createEditBlock(experiences[i], i))
    }
}