const itemsContainer = document.querySelectorAll('.items-containers') as NodeListOf<HTMLDivElement>



let actualContainer: HTMLDivElement,
    actualBtn: HTMLButtonElement,
    actualUL: HTMLUListElement,
    actualForm: HTMLFormElement,
    actualTextInput: HTMLInputElement,
    actualValidation: HTMLSpanElement;




function addContainerListeners(currentContainers: HTMLDivElement) {
    const currentContainerDeletionBtn = currentContainers.querySelector('.delete-containers-btn') as HTMLButtonElement;
    const currentAddItemBtn = currentContainers.querySelector('.add-item-btn') as HTMLButtonElement;
    const currentCloseFormBtn = currentContainers.querySelector('.close-form-btn') as HTMLButtonElement;
    const currentForm = currentContainers.querySelector('form') as HTMLFormElement;

    deleteBtnListeners(currentContainerDeletionBtn);
    addItemBtnListeners(currentAddItemBtn);
    deleteFormBtnListeners(currentCloseFormBtn);
    addFormSubmit(currentForm);
    addDDListeners(currentContainers);
}

itemsContainer.forEach((container: HTMLDivElement) => {
    addContainerListeners(container);
})

function addFormSubmit(form : HTMLFormElement){
    form.addEventListener('submit',createNewItem);
}

function deleteFormBtnListeners(btn: HTMLButtonElement) {
    btn.addEventListener('click', () => toggleForm(actualBtn, actualForm, false));
}

function deleteBtnListeners(btn: HTMLButtonElement) {
    btn.addEventListener('click', handleContainerDeletion);
}

function addItemBtnListeners(btn: HTMLButtonElement) {
    btn.addEventListener('click', handleAddItem);
}

function addDDListeners(element : HTMLElement){
    element.addEventListener('dragstart',handledragStart);
    element.addEventListener('dragover',handledragOver);
    element.addEventListener('drop',handledragdrop);
    element.addEventListener('dragend',handledragEnd);
}

function handleContainerDeletion(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    const btnArray = [...document.querySelectorAll('.delete-containers-btn')] as HTMLButtonElement[]
    const containers = [...document.querySelectorAll('.items-containers')] as HTMLDivElement[]
    containers[btnArray.indexOf(btn)].remove();
}

function handleAddItem(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    if (actualContainer) {
        toggleForm(actualBtn, actualForm, false);        //open only one
    }
    setContainerItems(btn);
    toggleForm(actualBtn, actualForm, true);
}

function toggleForm(btn: HTMLButtonElement, form: HTMLFormElement, action: Boolean) {
    if (!action) {
        form.style.display = "none"
        btn.style.display = "block"
    }
    else if (action) {
        form.style.display = "block"
        btn.style.display = "none"

    }
}

function setContainerItems(btn: HTMLButtonElement) {
    actualBtn = btn;
    actualContainer = btn.parentElement as HTMLDivElement
    actualUL = actualContainer.querySelector('ul') as HTMLUListElement;
    actualForm = actualContainer.querySelector('form') as HTMLFormElement;
    actualTextInput = actualContainer.querySelector('input') as HTMLInputElement;
    actualValidation = actualContainer.querySelector('.validation-msg') as HTMLSpanElement;
}

function createNewItem(e : Event){
    e.preventDefault();

    //Validation
    if(actualTextInput.value.length === 0){
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
    `
    actualUL.insertAdjacentHTML('beforeend',li);
    const item = actualUL.lastElementChild as HTMLLIElement
    const LiBtn = item.querySelector('button') as HTMLButtonElement;
    handleItemDeletion(LiBtn);
    addDDListeners(item);
    actualTextInput.value = "";
}

function handleItemDeletion(btn : HTMLButtonElement){
    btn.addEventListener('click', () => {
        const EltoRemove = btn.parentElement as HTMLLIElement;
        EltoRemove.remove();
    })
}


//Drag Drop

let dragSrcEl:HTMLElement;
function handledragStart(this:HTMLElement, e : DragEvent){
    e.stopPropagation();

    if(actualContainer) toggleForm(actualBtn,actualForm,false);
    dragSrcEl = this;
    e.dataTransfer?.setData('text/html',this.innerHTML);
}

function handledragOver(e : DragEvent){
    e.preventDefault();
}

function handledragdrop(this : HTMLElement, e : DragEvent){
    e.stopPropagation();
    const receptionEle = this;
    if(dragSrcEl.nodeName === 'LI' && receptionEle.classList.contains("items-containers")){
        (receptionEle.querySelector('ul')as HTMLUListElement).appendChild(dragSrcEl);
        addDDListeners(dragSrcEl);
        handleItemDeletion(dragSrcEl.querySelector("button") as HTMLButtonElement);
    }

    if(dragSrcEl !== this && this.classList[0] ===  dragSrcEl.classList[0]){
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer?.getData('text/html') as string;
        if(this.classList.contains("items-containers")) {
            addContainerListeners(this as HTMLDivElement);
            this.querySelectorAll('li').forEach((li : HTMLLIElement) => {
                handleItemDeletion(li.querySelector('button') as HTMLButtonElement);
                addDDListeners(li)
            })
        }
        else{
            addDDListeners(this);
            handleItemDeletion(this.querySelector("button")as HTMLButtonElement);
        }
    }
}

function handledragEnd(this : HTMLElement, e : DragEvent){
    e.stopPropagation();
    if(this.classList.contains('items-containers')){
        addContainerListeners(this as HTMLDivElement);
        this.querySelectorAll('li').forEach((li : HTMLLIElement) => {
            handleItemDeletion(li.querySelector('button') as HTMLButtonElement);
            addDDListeners(li);
        })
    }
    else{
        addDDListeners(this);
    }
}
//Add new containers

const addContainerBtn = document.querySelector('.add-container-btn') as HTMLButtonElement;
const addContainerForm = document.querySelector('.add-new-containers form') as HTMLFormElement;
const addContainerFormInput = document.querySelector('.add-new-containers input') as HTMLInputElement;
const validationNewContainer = document.querySelector('.add-new-containers .validation-msg') as HTMLSpanElement;
const addContainerCloseBtn = document.querySelector('.close-add-list') as HTMLButtonElement;
const addNewContainer = document.querySelector('.add-new-containers') as HTMLDivElement;
const containersList = document.querySelector('.main-content') as HTMLDivElement;

addContainerBtn.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, true);
})

addContainerCloseBtn.addEventListener('click', () => {
    toggleForm(addContainerBtn, addContainerForm, false);
})

addContainerForm.addEventListener('submit',createNewContainer);

function createNewContainer(e : Event){
    e.preventDefault();

    if(addContainerFormInput.value.length === 0){
        validationNewContainer.textContent = "Must be at least 1 character long";
        return;
    }
    else {
        validationNewContainer.textContent = "";
    }

    const itemsContainer = document.querySelector('.items-containers') as HTMLDivElement;
    const NewContainer = itemsContainer.cloneNode() as HTMLDivElement;
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
    `

    NewContainer.innerHTML = newContainerContent;
    containersList.insertBefore(NewContainer, addNewContainer);
    addContainerFormInput.value = "";
    addContainerListeners(NewContainer);
}