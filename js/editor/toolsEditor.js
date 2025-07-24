import {toolsInformation} from "../variables.js";
import {setupTools} from "../tools.js";

export function setupToolsEditor(container, tools) {
    const createEditBlock = (tool, iterator) => {
        const block = document.createElement('span')
        block.className = 'block'

        block.innerHTML = `
            <span class="tool-bar">
                <span class="input-span">
                    <label>Tool name:</label>
                    <input id="toolInput" type="text" value="${tool.name}">
                </span>
                <span class="input-span">
                    <label>Image URLs:</label>
                    <div class="urls-container" id="urls-container-${iterator}"></div>
                    <button class="waves-effect waves-tea add-button">
                        <img src="./x.svg">
                    </button>
                </span>
                <span class="buttons">
                    <button class="waves-effect waves-tea edit-button">
                        <img src="./pencil.svg">
                    </button>
                    <button class="waves-effect waves-tea delete-button">
                        <img src="./delete.svg">
                    </button>
                </span>
                <p id="tools-symbol" style="display: none">${JSON.stringify(tool)}</p>
            </span>
        `

        const urlsContainer = block.querySelector(`#urls-container-${iterator}`)

        const renderUrls = () => {
            urlsContainer.innerHTML = ''

            tool.images.forEach((url, urlIndex) => {
                const urlRow = document.createElement('div')
                urlRow.className = 'url-row'
                urlRow.innerHTML = `
                    <input type="text" value="${url}" class="url-input">
                    <button class="waves-effect waves-tea remove-url-button">
                        <img src="./x.svg" >
                    </button>
                `

                const urlInput = urlRow.querySelector('.url-input')
                const removeBtn = urlRow.querySelector('.remove-url-button')

                urlInput.addEventListener('change', () => {
                    tool.images[urlIndex] = urlInput.value
                })

                removeBtn.addEventListener('click', () => {
                    tool.images.splice(urlIndex, 1)
                    renderUrls()
                })

                urlsContainer.appendChild(urlRow)
            })
        }

        if (!tool.images) {
            tool.images = []
        }
        renderUrls()

        block.querySelector('.add-button').addEventListener('click', () => {
            tool.images.push('')
            renderUrls()
        })

        block.querySelector('.edit-button').addEventListener('click', () => {
            toolsInformation[iterator] = {
                'name': block.querySelector('#toolInput').value,
                'images': tool.images
            }
            setupTools(document.querySelector('.tools-container'), toolsInformation)
        })

        block.querySelector('.delete-button').addEventListener('click', () => {
            let indexToRemove = tools.indexOf(tools.find(item => item.name ===
                JSON.parse(block.querySelector('#education-symbol').innerText).name
            ))
            tools.splice(indexToRemove, 1)

            toolsInformation[iterator] = tools
            setupToolsEditor(container, tools)
            setupTools(document.querySelector('.tools-container'), toolsInformation)
        })

        return block
    }

    container.innerHTML = ''
    
    const validTools = tools.filter(tool => tool)

    for (let i = 0; i < validTools.length; i++) {
        container.appendChild(createEditBlock(validTools[i], i))
    }
}