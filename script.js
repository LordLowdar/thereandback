//Pre-trip checklist

// grab container from doc
const checklistContainer = document.getElementById('taskListContainer')
// add button with id and inner content (this will be our add new content button)
checklistContainer.innerHTML = '<button id="addListItem">+</button>'
// locally store amount of buttons as number
var buttonAmount = parseInt(localStorage.getItem('buttonAmount'))
if (isNaN(buttonAmount)) {
    buttonAmount = 0
}
// on page load, create items depending on length of stored buttonAmount variable
  for (let i = 0; i < buttonAmount; i++) {
    //   declare checkListItem and checkSaveButton
    const checkListItem = document.createElement('div')
    const checkSaveButton = document.createElement('button')
    checkSaveButton.id = 'checkListButton' + [i + 1]
    checkSaveButton.classList.add('toDoButton')
    checkSaveButton.innerHTML = 'Save'
    // add a class for styling
    checkListItem.classList.add('checkListItem')
    checkListItem.id = 'checkListItem' + [i + 1]
    // create input for toDo items
    const checkListInput = document.createElement('input')
    checkListInput.classList.add('toDoInput')
    checkListInput.id = 'toDoInput' + [i + 1]
    checkListInput.placeholder = "Enter your to-do items here!"
    checkListInput.value = localStorage.getItem('toDoInput' + [i + 1])
    checkListInput.classList.add('savedInput')
    // create input for date
    const checkListDate = document.createElement('input')
    checkListDate.type = 'date'
    checkListDate.classList.add('toDoDate')
    checkListDate.id = 'toDoDate' + [i + 1]
    // checkListDate.placeholder = ""
    checkListDate.value = localStorage.getItem('toDoDate' + [i + 1])
    checkListDate.classList.add('savedDate')
    // append Items
    checklistContainer.append(checkListItem)
    checkListItem.append(checkListDate)
    checkListItem.append(checkListInput)
    checkListItem.append(checkSaveButton)
 }
//  event listener on full container
checklistContainer.addEventListener('click', (event) => {
    // check if element is a button
    const isButton = event.target.nodeName === 'BUTTON';
    // get id of target element
    var targetId = event.target.getAttribute('id')
    // test if element is button
    if (!isButton) {
        return;
    }
    // add new list item function called if element is add list item element
    else if (targetId === 'addListItem') {
         addNewListItem()
    }
    // else save/checkmark button
    else {        
        var toDoVar = document.getElementById(targetId).previousSibling
        console.log(toDoVar)
        var dateVar = toDoVar.previousSibling
        localStorage.setItem(toDoVar.id,toDoVar.value)
        localStorage.setItem(dateVar.id,dateVar.value)
        toDoVar.classList.add('savedInput')
        dateVar.classList.add('savedInput')
        
    }
})
// declare add new item function
function addNewListItem() {
    // create a div to hold our content
    const checkListItem = document.createElement('div')
    const checkSaveButton = document.createElement('button')
    buttonAmount += 1
    // console.log(typeof buttonAmount)
    localStorage.setItem('buttonAmount', buttonAmount)
    // add a class for styling
    checkSaveButton.id = 'checkListButton' + buttonAmount
    // add a class for styling
    checkListItem.classList.add('checkListItem')
    checkListInput = document.createElement('input')
    checkListInput.classList.add('toDoInput')
    checkListInput.id = 'toDoInput' + buttonAmount
    checkListInput.placeholder = "Enter your to-do items here!"
     // create input for date
     const checkListDate = document.createElement('input')
     checkListDate.type = 'date'
     checkListDate.classList.add('toDoDate')
     checkListDate.id = 'toDoDate' + buttonAmount

    checklistContainer.append(checkListItem)
    checkListItem.append(checkListDate)
    checkListItem.append(checkListInput)
    checkListItem.append(checkSaveButton)
}