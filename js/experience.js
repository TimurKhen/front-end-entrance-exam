import '../css/experience.css'
import {setupListElements} from "./listElement.js"
import {sortFunction} from "./sortByDate.js"

export function setupExperience(container, experienceData) {
    experienceData = experienceData.filter(experience => experience !== undefined)
    experienceData = sortFunction(experienceData)
    experienceData[0]["newwest"] = true

    container.innerHTML = ''

    const createExperienceBlock = (work) => {
        const block = document.createElement('div')
        block.className = 'block'

        block.innerHTML = `
            <span class="experience-block" style="
                --background-color: ${work["newwest"] ? '#28D979' : 'white'}; 
                --text-color: ${work["newwest"] ? 'white' : 'black'};
            ">
                <span class="date-information">
                    <p>${work.startDate} - ${work.endDate || 'Present'}</p>
                    ${work.newwest ? '<button>most recent</button>' : ''}
                </span>
                <span class="job-data">
                    <span class="name-of-work-position">
                        <h3>${work.name}</h3>
                        <p>${work.placeOfWork}${work.workTime ? ' | ' + work.workTime : ''}</p>
                    </span>
                    <ol class="work-responsibilities"></ol>
                </span>
            </span>
        `

        setupListElements(block.querySelector('.work-responsibilities'), work.workedOn)

        return block
    }

    experienceData.forEach(work => {
        const block = createExperienceBlock(work)
        container.appendChild(block)
    })
}