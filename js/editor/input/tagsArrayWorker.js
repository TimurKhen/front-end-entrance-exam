import {educationInformation} from "../../variables.js";
import {setupEducation} from "../../education.js";

export function setupTagEditor(container, tagsArray, iterator) {
    if (container) {
        container.innerHTML = ''
    }

    const renderTags = () => {
        container.innerHTML = ''

        if (!tagsArray) {
            tagsArray = []
        }

        tagsArray.forEach((tag, index) => {
            const tagRow = document.createElement('div')
            tagRow.className = 'tag-row'
            tagRow.innerHTML = `
                <input type="text" value="${tag}" class="tag-input">
                <button class="waves-effect waves-tea remove-tag-button">
                    <img src="./x.svg">
                </button>
            `

            const input = tagRow.querySelector('.tag-input')
            const removeBtn = tagRow.querySelector('.remove-tag-button')

            input.addEventListener('change', () => {
                tagsArray[index] = input.value.trim()
                educationInformation[iterator].tags = tagsArray
                setupEducation(document.querySelector('.education-container'), educationInformation)
            })

            removeBtn.addEventListener('click', () => {
                tagsArray.splice(index, 1)
                renderTags()
                educationInformation[iterator].tags = tagsArray
                setupEducation(document.querySelector('.education-container'), educationInformation)
            })

            container.appendChild(tagRow)
        })
    }

    renderTags()
}