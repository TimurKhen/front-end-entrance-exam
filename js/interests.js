import '../css/interests.css'

export function setupInterests(element, interests) {
    element.innerHTML = ''

    interests.forEach((interest) => {
        const interestBox = document.createElement("p");
        interestBox.classList.add('interest-box')
        interestBox.innerHTML = `${interest}`;
        element.appendChild(interestBox);
    })
}
