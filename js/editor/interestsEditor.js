import {interests} from "../variables.js";
import {setupInterests} from "../interests.js";

export function setupInterestsEditor(container, interestsArray) {
    const createEditBlock = (interes, iterator) => {
        const block = document.createElement('span')
        block.className = 'block'
        block.innerHTML = `
      <span class="interes-bar">
        <input id="interes-input" value="${interes}">
        <span class="buttons">
            <button class="waves-effect waves-tea edit-button">
                <img src="./pencil.svg">
            </button>
            <button class="waves-effect waves-tea delete-button" title="Delete">
                <img src="./delete.svg" alt="Delete">
            </button>
            <p id="interes-symbol" style="display: none">${interes}</p>
        </span>
      </span>
    `
        block.querySelector('.edit-button').addEventListener('click', () => {
            interests[iterator] = block.querySelector('#interes-input').value
            setupInterests(document.querySelector('.interests-container'), interests)
        })

        block.querySelector('.delete-button').addEventListener('click', () => {
            interestsArray.splice(
                interestsArray.indexOf(block.querySelector('#interes-symbol')
                    .textContent), 1)
            container.removeChild(block)
            setupInterests(document.querySelector('.interests-container'), interests)
        })
        return block
    }

    container.innerHTML = ''

    for (let i = 0; i < interestsArray.length; i++) {
        container.appendChild(createEditBlock(interestsArray[i], i))
    }
}