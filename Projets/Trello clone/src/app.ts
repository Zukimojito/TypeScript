const itemsContainer = document.querySelectorAll('.items-containers') as NodeListOf<HTMLDivElement>

function addContainerListeners(currentContainers : HTMLDivElement){
    const currentContainerDeletionBtn = currentContainers.querySelector('.delete-containers-btn') as HTMLButtonElement;

    deleteBtnListeners(currentContainerDeletionBtn);
}

itemsContainer.forEach((container : HTMLDivElement) => {
     addContainerListeners(container)
})

function deleteBtnListeners(btn :HTMLButtonElement){
    btn.addEventListener('click',handleContainerDeletion);
}

function handleContainerDeletion (e : MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    const btnArray = [...document.querySelectorAll('.delete-containers-btn')] as HTMLButtonElement[]
    const containers = [...document.querySelectorAll('.items-containers')] as HTMLDivElement[]
    containers[btnArray.indexOf(btn)].remove();
}
