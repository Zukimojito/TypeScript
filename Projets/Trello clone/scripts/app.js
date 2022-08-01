"use strict";
const itemsContainer = document.querySelectorAll('.items-containers');
let actualContainer, actualBtn, actualUL, actualForm, actualTextInput, actualValidation;
function addContainerListeners(currentContainers) {
    const currentContainerDeletionBtn = currentContainers.querySelector('.delete-containers-btn');
    const currentAddItemBtn = currentContainers.querySelector('.add-item-btn');
    const currentCloseFormBtn = currentContainers.querySelector('.close-form-btn');
    const currentForm = currentContainers.querySelector('form');
    deleteBtnListeners(currentContainerDeletionBtn);
    addItemBtnListeners(currentAddItemBtn);
    deleteFormBtnListeners(currentCloseFormBtn);
    addFormSubmit(currentForm);
    addDDListeners(currentContainers);
}
itemsContainer.forEach((container) => {
    addContainerListeners(container);
});
function addFormSubmit(form) {
    form.addEventListener('submit', createNewItem);
}
function deleteFormBtnListeners(btn) {
    btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false));
}
function deleteBtnListeners(btn) {
    btn.addEventListener('click', handleContainerDeletion);
}
function addItemBtnListeners(btn) {
    btn.addEventListener('click', handleAddItem);
}
function addDDListeners(element) {
    element.addEventListener('dragstart', handledragStart);
    element.addEventListener('dragover', handledragOver);
    element.addEventListener('drop', handledragdrop);
    element.addEventListener('dragend', handledragEnd);
}
function handleContainerDeletion(e) {
    const btn = e.target;
    const btnArray = [...document.querySelectorAll('.delete-containers-btn')];
    const containers = [...document.querySelectorAll('.items-containers')];
    containers[btnArray.indexOf(btn)].remove();
}
function handleAddItem(e) {
    const btn = e.target;
    if (actualContainer) {
        toggleForm(actualBtn, actualForm, false); //open only one
    }
    setContainerItems(btn);
    toggleForm(actualBtn, actualForm, true);
}
function toggleForm(btn, form, action) {
    if (!action) {
        form.style.display = "none";
        btn.style.display = "block";
    }
    else if (action) {
        form.style.display = "block";
        btn.style.display = "none";
    }
}
function setContainerItems(btn) {
    actualBtn = btn;
    actualContainer = btn.parentElement;
    actualUL = actualContainer.querySelector('ul');
    actualForm = actualContainer.querySelector('form');
    actualTextInput = actualContainer.querySelector('input');
    actualValidation = actualContainer.querySelector('.validation-msg');
}
function createNewItem(e) {
    e.preventDefault();
    //Validation
    if (actualTextInput.value.length === 0) {
        actualValidation.textContent = "Must be at least 1 character long";
        return;
    }
    else {
        actualValidation.textContent = "";
    }
    //Création Item
    const itemContent = actualTextInput.value;
    const li = `
    <li class='item' draggable = "true">
        <p>${itemContent}</p>
        <button>X</button>
    </li>
    `;
    actualUL.insertAdjacentHTML('beforeend', li);
    const item = actualUL.lastElementChild;
    const LiBtn = item.querySelector('button');
    handleItemDeletion(LiBtn);
    addDDListeners(item);
    actualTextInput.value = "";
}
function handleItemDeletion(btn) {
    btn.addEventListener('click', () => {
        const EltoRemove = btn.parentElement;
        EltoRemove.remove();
    });
}
//Drag Drop
let dragSrcEl;
function handledragStart(e) {
    var _a;
    e.stopPropagation();
    if (actualContainer)
        toggleForm(actualBtn, actualForm, false);
    dragSrcEl = this;
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/html', this.innerHTML);
}
function handledragOver(e) {
    e.preventDefault();
}
function handledragdrop(e) {
    var _a;
    e.stopPropagation();
    const receptionEle = this;
    if (dragSrcEl.nodeName === 'LI' && receptionEle.classList.contains("items-containers")) {
        receptionEle.querySelector('ul').appendChild(dragSrcEl);
        addDDListeners(dragSrcEl);
        handleItemDeletion(dragSrcEl.querySelector("button"));
    }
    if (dragSrcEl !== this && this.classList[0] === dragSrcEl.classList[0]) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/html');
        if (this.classList.contains("items-containers")) {
            addContainerListeners(this);
            this.querySelectorAll('li').forEach((li) => {
                handleItemDeletion(li.querySelector('button'));
                addDDListeners(li);
            });
        }
        else {
            addDDListeners(this);
            handleItemDeletion(this.querySelector("button"));
        }
    }
}
function handledragEnd(e) {
    e.stopPropagation();
    if (this.classList.contains('items-containers')) {
        addContainerListeners(this);
        this.querySelectorAll('li').forEach((li) => {
            handleItemDeletion(li.querySelector('button'));
            addDDListeners(li);
        });
    }
    else {
        addDDListeners(this);
    }
}
//Add new containers
const addContainerBtn = document.querySelector('.add-container-btn');
const addContainerForm = document.querySelector('.add-new-containers form');
const addContainerFormInput = document.querySelector('.add-new-containers input');
const validationNewContainer = document.querySelector('.add-new-containers .validation-msg');
const addContainerCloseBtn = document.querySelector('.close-add-list');
const addNewContainer = document.querySelector('.add-new-containers');
const containersList = document.querySelector('.main-content');
addContainerBtn.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, true);
});
addContainerCloseBtn.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, false);
});
addContainerForm.addEventListener('submit', createNewContainer);
function createNewContainer(e) {
    e.preventDefault();
    if (addContainerFormInput.value.length === 0) {
        validationNewContainer.textContent = "Must be at least 1 character long";
        return;
    }
    else {
        validationNewContainer.textContent = "";
    }
    const itemsContainer = document.querySelector('.items-containers');
    const NewContainer = itemsContainer.cloneNode();
    const newContainerContent = `
    <div class="top-containers">
        <h2>${addContainerFormInput.value}</h2>
        <button class="delete-containers-btn">X</button>
    </div>

    <ul>
    </ul>
    <button class="add-item-btn">Add am item</button>

    <form autocomplete="off">
        <div class="top-form-containers">
            <label for="item">Add a new item</label>
            <button type="button" class="close-form-btn">X</button>
        </div>
            <input type="text" id="item">
            <span class="validation-msg"></span>
            <button type="submit">Submit</button>
        
    </form>
    `;
    NewContainer.innerHTML = newContainerContent;
    containersList.insertBefore(NewContainer, addNewContainer);
    addContainerFormInput.value = "";
    addContainerListeners(NewContainer);
}
