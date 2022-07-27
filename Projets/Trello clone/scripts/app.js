"use strict";
const itemsContainer = document.querySelectorAll('.items-containers');
function addContainerListeners(currentContainers) {
    const currentContainerDeletionBtn = currentContainers.querySelector('.delete-containers-btn');
    deleteBtnListeners(currentContainerDeletionBtn);
}
itemsContainer.forEach((container) => {
    addContainerListeners(container);
});
function deleteBtnListeners(btn) {
    btn.addEventListener('click', handleContainerDeletion);
}
function handleContainerDeletion(e) {
    const btn = e.target;
    const btnArray = [...document.querySelectorAll('.delete-containers-btn')];
    const containers = [...document.querySelectorAll('.items-containers')];
    containers[btnArray.indexOf(btn)].remove();
}
