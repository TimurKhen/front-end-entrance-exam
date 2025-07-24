import {setupBars} from "../bars.js"

export function setupLanguageEditor(container, languages) {
    const createEditBlock = (language, iterator) => {
        const block = document.createElement('span')
        block.className = 'block'
        block.innerHTML = `
      <span class="language-bar">
        <h2>${iterator + 1}</h2>
        <span class="input-span">
            <label>Name of language:</label>
            <input id="languageInput" type="text" value="${language.language}">
        </span>
        <span class="input-span">
            <label>Your level in %:</label>
            <input id="levelInput" type="number" value="${parseInt(language.level)}">
        </span>
           
        <span class="buttons">
            <button class=" waves-effect waves-tea edit-button">
                <img src="./pencil.svg">
            </button>
            <button class=" waves-effect waves-tea delete-button">
                <img src="./delete.svg">
            </button>
        </span>
        <p id="language-symbol" style="display: none">${JSON.stringify(language)}</p>
      </span>
    `
        block.querySelector('.edit-button').addEventListener('click', () => {
            const updatedLanguage = block.querySelector('#languageInput').value
            const updatedLevel = block.querySelector('#levelInput').value + '%'

            languages[iterator] = {
                'language': updatedLanguage,
                'level': updatedLevel
            }

            const barsContainer = document.querySelector('.languages-bars')

            const languageBlocks = barsContainer.querySelectorAll('.language-bar')
            languageBlocks.forEach(block => {
                if (block.dataset.language === updatedLanguage) {
                    block.updateLevel(updatedLevel)
                }
            })
        })

        block.querySelector('.delete-button').addEventListener('click', () => {
            let indexToRemove = languages.indexOf(languages.find(item => item.name ===
                JSON.parse(block.querySelector('#language-symbol').innerText).name
            ))
            languages.splice(indexToRemove, 1)
            container.removeChild(block)
            setupBars(document.querySelector('.languages-bars'), languages.filter(lang => lang))
        })


        return block
    }

    container.innerHTML = ''

    for (let i = 0; i < languages.length; i++) {
        container.appendChild(createEditBlock(languages[i], i))
    }
}