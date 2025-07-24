
export function setupListElements(element, jobTasksData) {

    const setBar = (work, iterableCount) => {
        element.innerHTML += `<li>${work}</li>`

        // bar.addEventListener('click', (e) => {
        //     // works[iterableCount].work = newwork;
        //     let newLevel = "50%"
        //     works[iterableCount].level = newLevel;
        //
        //     const barCanvas = bar.querySelector('.bar-canvas');
        //     barCanvas.style.setProperty('--level', newLevel);
        // })
    }

    if (jobTasksData) {
        for (let i = 0; i < jobTasksData.length; i++) {
            setBar(jobTasksData[i], i)
        }
    }
}
