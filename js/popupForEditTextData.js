import '../css/editor.css'
import {
    educationInformation,
    experienceInformation,
    interests,
    languagesLevel,
    toolsInformation,
    userData
} from "./variables.js";
import {setupLanguageEditor} from "./editor/languageEditor.js";
import {setupExperienceEditor} from "./editor/experienceEditor.js";
import {setupToolsEditor} from "./editor/toolsEditor.js";
import {setupEducationEditor} from "./editor/educationEditor.js";
import {setupInterestsEditor} from "./editor/interestsEditor.js";

export function setupPopup(container) {
    const createPopup = () => {
        const block = document.createElement('span')
        block.className = 'popup'
        block.innerHTML = `
      <p>Change info:</p>
      <span class="editor">
        <label class="header">Name</label>
        <span class="user-data-input">
            <input id="name-input" value=${userData.name}>
            <button id="name-input-button" class="waves-effect waves-tea edit-button">
                <img src="./pencil.svg">
            </button>    
        </span>
        
        <label class="header">Job</label>
        <span class="user-data-input">
            <input id="job-input" value=${userData.job}>
            <button id="job-input-button" class="waves-effect waves-tea edit-button">
                <img src="./pencil.svg">
            </button>
        </span>
        
        <label class="header">Email</label>
        <span class="user-data-input">
            <input id="email-input" value=${userData.email}>
            <button id="email-input-button" class="waves-effect waves-tea edit-button">
                <img src="./pencil.svg">
            </button>
        </span>
        
        <span class="content-span">
            <label class="header">Languages</label>
            <span id="language-editor"></span> 
            <button class="waves-effect waves-tea add-button" id="add-language">
                <img src="./x.svg">
            </button>
        </span>
        
        <span class="content-span">
            <label class="header">Experience</label>
            <span id="experience-editor"></span>
            <button class="waves-effect waves-tea add-button" id="add-experience">
                <img src="./x.svg">
            </button>
        </span> 
        
        <span class="content-span">
            <label class="header">Tools</label>
            <span id="tools-editor"></span>
            <button class="waves-effect waves-tea add-button" id="add-tools">
                <img src="./x.svg">
            </button>
        </span> 
        
        <span class="content-span">
            <label class="header">Education</label>
            <span id="education-editor"></span>
            <button class="waves-effect waves-tea add-button" id="add-education">
                <img src="./x.svg">
            </button>
        </span> 

        <span class="content-span">
            <label class="header">Interests</label>
            <span id="interests-editor"></span>
            <button class="waves-effect waves-tea add-button" id="add-interests">
                <img src="./x.svg">
            </button>
        </span>
      </span>
    `
        block.querySelector('#name-input-button').addEventListener('click', () => {
            userData.name = block.querySelector('#name-input').value
            document.querySelector('#user-name').textContent = userData.name
        })
        block.querySelector('#job-input-button').addEventListener('click', () => {
            userData.job = block.querySelector('#job-input').value
            document.querySelector('#user-job').textContent = userData.job
        })
        block.querySelector('#email-input-button').addEventListener('click', () => {
            userData.email = block.querySelector('#email-input').value
            document.querySelector('#user-email').textContent = userData.email
        })

        block.querySelector('#add-language').addEventListener('click', (e) => {
            languagesLevel.push({
                "language": "",
                "level": "1%"
            })
            setupLanguageEditor(block.querySelector('#language-editor'), languagesLevel)
        })
        block.querySelector('#add-experience').addEventListener('click', (e) => {
            experienceInformation.push({
                "name": "",
                "placeOfWork": "",
                "workTime": "",
                "startDate": "",
                "endDate": "",
                "workedOn": [""]
            })
            setupExperienceEditor(block.querySelector('#experience-editor'), experienceInformation)
        })
        block.querySelector('#add-tools').addEventListener('click', (e) => {
            toolsInformation.push({
                "name": "",
                "images": [""]
            })
            setupToolsEditor(block.querySelector('#tools-editor'), toolsInformation)
        })
        block.querySelector('#add-education').addEventListener('click', (e) => {
            educationInformation.push({
                'name': '',
                'yearStart': '',
                'yearEnd': '',
                'tags': [''],
                'place': '',
                'favourite': false
            })
            setupEducationEditor(block.querySelector('#education-editor'), educationInformation)
        })
        block.querySelector('#add-interests').addEventListener('click', (e) => {
            interests.push('')
            setupInterestsEditor(block.querySelector('#interests-editor'), interests)
        })

        setupLanguageEditor(block.querySelector('#language-editor'), languagesLevel)
        setupExperienceEditor(block.querySelector('#experience-editor'), experienceInformation)
        setupToolsEditor(block.querySelector('#tools-editor'), toolsInformation)
        setupEducationEditor(block.querySelector('#education-editor'), educationInformation)
        setupInterestsEditor(block.querySelector('#interests-editor'), interests)


        return block
    }

    container.appendChild(createPopup())
}

export function hidePopup(container) {
    const popup = container.querySelector('.popup')
    if (popup) {
        container.removeChild(popup)
    }
}

export function togglePopup(container) {
    const popup = container.querySelector('.popup');
    if (popup) {
        hidePopup(container);
        return false;
    } else {
        setupPopup(container);
        return true;
    }
}