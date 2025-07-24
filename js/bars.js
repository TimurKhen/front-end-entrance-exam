import '../css/bars.css'

export function setupBars(container, languages) {
    const createBarBlock = (language) => {
      const block = document.createElement('div')
      block.className = 'block'
      block.dataset.language = language.language

      block.innerHTML = `
      <span class="language-bar">
        <p>${language.language}</p>
        <span class="bar-canvas" style="--level: ${language.level};"></span>
      </span>
    `

      block.updateLevel = function(newLevel) {
        const barCanvas = this.querySelector('.bar-canvas')
        if (barCanvas) {
          barCanvas.style.setProperty('--level', newLevel)
        }
      }

    return block
    }

    container.innerHTML = ''
    languages.forEach(language => {
      if (language) {
        container.appendChild(createBarBlock(language))
      }
    })
}