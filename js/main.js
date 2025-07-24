import '../css/style.css'

import {setupBars} from './bars.js'
import {setupExperience} from "./experience.js" 
import {setupTools} from "./tools.js" 
import {setupEducation} from "./education.js" 
import {setupInterests} from "./interests.js"

import {
    educationInformation,
    experienceInformation,
    interests,
    languagesLevel,
    toolsInformation,
    userData
} from "./variables.js"
import {togglePopup} from "./popupForEditTextData.js";

function downloadPDF() {
    const element = document.getElementById('container');
    const pdfWidth = 500; // Ширина A4 в мм
    // const pdfHeight = 297; // Высота A4 в мм

    const contentWidth = element.scrollWidth;
    const contentHeight = element.scrollHeight
    // const contentHeight = 1080;


    const defaultOptions = {
        margin: 0,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 1,
            width: contentWidth,
            height: contentHeight + 300,
            // height: element.scrollHeight,
            windowWidth: contentWidth,
            // windowHeight: contentHeight,
            useCORS: true,
            // scrollY: 1,
            x: contentWidth / 3 - 120,
            // y: -250
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        },
    };
    html2pdf().from(element).set(defaultOptions).save()
}

document.querySelector('#app').innerHTML = `
  <div class="content-container" id="container">
    <span class="content-box avatar x1x1">
        <img src="${userData.avatar}" width="124" height="124">
    </span>
    <span class="content-box name-and-speciality x1x1">
        <p class="hello-text">Hello👋🏻I'm</p>
        <span class="name-and-work">
            <h1 id="user-name">${userData.name}</h1>
            <p id="user-job">${userData.job}</p>
        </span>
    </span>
    <span class="content-box languages x2x1">
        <h2 class="languages-text title">Languages</h2>
        <span class="languages-bars"></span>
     </span>
    <span class="content-box experience x3x3">
        <h2 class="experience-text title">Experience</h2>
        <span class="experience-blocks"></span>
    </span>
    <span class="content-box tools x1x3">
        <h2 class="tools-text title">Tools</h2>
        <span class="tools-container"></span>
    </span>
    <span class="content-box education x2x2">
        <h2 class="education-text title">Education</h2>
        <span class="education-container"></span>
    </span>
    <span class="content-box interests x2x1">
        <h2 class="interests-text title">Interests</h2>
        <span class="interests-container"></span>
    </span>
    
    <span class="content-box contacts x2x1">
        <h2>Let's chat! I'm ready to work on exciting projects</h2>
        <p id="user-email">${userData.email}</p>
    </span>
  </div>
  <div class="interactable-container">
    <button class="edit-button waves-effect waves-tea">
        <img src="./pencil.svg">
    </button>
    <button class="download-button waves-effect waves-tea"> 
        <img src="./download.svg">
        <p>Скачать</p>
    </button>
  </div>
`

setupBars(document.querySelector('.languages-bars'), languagesLevel)

setupExperience(document.querySelector('.experience-blocks'), experienceInformation)

setupTools(document.querySelector('.tools-container'), toolsInformation)

setupEducation(document.querySelector('.education-container'), educationInformation)

setupInterests(document.querySelector('.interests-container'), interests)


const downloadButton = document.querySelector('.download-button')
downloadButton.addEventListener('click', () => {
    downloadPDF()
})

const editButton = document.querySelector('.edit-button')
editButton.addEventListener('click', () => {
    const isVisible = togglePopup(document.querySelector('.content-container'))
    editButton.querySelector('img').src = isVisible ? './x.svg' : './pencil.svg'
});