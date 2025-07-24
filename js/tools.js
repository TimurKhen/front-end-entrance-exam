import '../css/tools.css'

export function setupTools(container, toolsData) {
    const createToolBlock = (tool) => {
        const block = document.createElement('span') 
        block.className = 'tool' 
        block.innerHTML = `<span class="tools-block"><p>${tool.name}</p><span class='images-container'></span></span>` 

        const imagesContainer = block.querySelector('.images-container') 
        if (tool.images) {
            tool.images.forEach(image => {
                imagesContainer.innerHTML += `<img width="30px" height="30px" src=${image}>`
            })
        }

        return block 
    } 

    container.innerHTML = '' 
    toolsData.forEach(tool => {
        container.appendChild(createToolBlock(tool)) 
    }) 
}