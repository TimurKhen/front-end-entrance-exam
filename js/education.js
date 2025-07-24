import '../css/education.css'

export function setupEducation(container, educationData) {
    const createEducationBlock = (education) => {
        const block = document.createElement('span')
        block.className = 'education-box'
        block.dataset.currentName = education.name

        block.innerHTML = `
            <span class="education-block" 
                style="--backgroundColor: ${education.favourite ? '#28D979' : 'white'}; 
                    --textColor: ${education.favourite ? 'white' : 'black'};
                    --tagsColor: ${education.favourite ? '#EBF9F2' : '#149063'};">
                <span class="date-and-is-favourite">
                    <p class="date">${education.yearStart} ${education.yearEnd === '' ? '' : '- ' + education.yearEnd}</p>
                    <img id="education-favourite" src="likeIcon.svg" style="--isLikedDisplay: ${education.favourite ? 'flex' : 'none'}">
                </span>
                <span class="name-and-tags">
                    <h2>${education.name}</h2>
                    <p id="tags">${education.tags.join(' ')}</p>
                </span>
                <p>${education.place}</p>
            </span>
        `

        block.updateFavourite = function(isFavourite) {
            const eduImage = this.querySelector('#education-favourite')
            if (eduImage) {
                eduImage.style.setProperty('--isLikedDisplay', `${isFavourite ? 'flex' : 'none'}`)
            }
        }

        return block 
    } 

    container.innerHTML = '' 
    educationData.forEach(education => {
        container.appendChild(createEducationBlock(education)) 
    }) 
}