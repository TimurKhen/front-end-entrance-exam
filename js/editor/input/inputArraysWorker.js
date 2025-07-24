import {experienceInformation} from "../../variables.js";
import {setupExperience} from "../../experience.js";

export function setupArrayInput(container, iterator, fieldName) {
    container.innerHTML = ''
    const renderInputs = () => {
        let array = experienceInformation[iterator].workedOn
        array = array.filter(iterator => iterator !== undefined)
        container.innerHTML = ''

        for (let i = 0; i < array.length; i++) {
            let item = array[i]
            const inputRow = document.createElement('span')
            inputRow.className = 'input-row'
            inputRow.innerHTML = `
                <span class="worked-on-input">
                    <input id="text-input" type="text" value="${item}">
                    <span class="action-buttons">
                        <button class="waves-effect waves-tea edit-button">
                            <img src="./pencil.svg">
                        </button>
                        <button class="waves-effect waves-tea delete-button" title="Delete">
                            <img src="./delete.svg" alt="Delete">
                        </button>
                    </span>    
                </span>
            `

            const input = inputRow.querySelector('#text-input')
            const editButton = inputRow.querySelector('.edit-button')
            const deleteButton = inputRow.querySelector('.delete-button')

            editButton.addEventListener('click', () => {
                experienceInformation[iterator].workedOn[i] = input.value
                renderInputs()
                setupExperience(document.querySelector('.experience-blocks'), experienceInformation)
            })

            deleteButton.addEventListener('click', () => {
                experienceInformation[iterator].workedOn.splice(i, 1)
                renderInputs()
                setupExperience(document.querySelector('.experience-blocks'), experienceInformation)
            })

            container.appendChild(inputRow)
        }

        const addButtonRow = document.createElement('div')
        addButtonRow.className = 'input-row'
        addButtonRow.innerHTML = `
            <button class="waves-effect waves-tea add-button">
                <img src="./x.svg">
            </button>
        `

        addButtonRow.querySelector('.add-button').addEventListener('click', () => {
            experienceInformation[iterator].workedOn.push('')
            renderInputs()
        })

        container.appendChild(addButtonRow)
    }

    renderInputs()
}