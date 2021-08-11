//Pre-trip checklist

// grab container from doc
const checklistContainer = document.getElementById('taskListContainer')
// add button with id and inner content (this will be our add new content button)
checklistContainer.innerHTML =
    '<button id = "saveButton">Save</button><button id="addListItem">+</button>'
// locally store amount of buttons as number
const newItemButton = document.getElementById('addListItem')

var locallyStored = localStorage.getItem('toDoArray')
console.log(locallyStored)
if (locallyStored === null) {
    locallyStored = []
} else {
    var locallyStored = JSON.parse(locallyStored)
}
var itemAmount = localStorage.getItem('itemAmount')
if (itemAmount == null) {
    itemAmount = 0
}
itemAmount = parseInt(itemAmount)





// on page load, create items depending on length of stored buttonAmount variable
for (let i = 0; i < itemAmount; i++) {
    //   declare checkListItem and checkSaveButton
    const checkListItem = document.createElement('div')
    const checkButton = document.createElement('button')
    const removeButton = document.createElement('button')
    checkButton.id = 'checkListButton' + [i]
    checkButton.classList.add('toDoButton', 'unchecked')
    checkButton.innerHTML = '✔'
    // add a class for styling
    checkListItem.classList.add('checkListItem')
    checkListItem.id = [i]

    
    // create input for toDo items
    const checkListInput = document.createElement('input')
    checkListInput.classList.add('toDoInput')
    checkListInput.id = 'toDoInput' + [i]
    checkListInput.placeholder = "Enter your to-do items!"
    checkListInput.classList.add('savedInput')
    // create input for date
    const checkListDate = document.createElement('input')
    checkListDate.type = 'date'
    checkListDate.classList.add('toDoDate')
    checkListDate.id = 'toDoDate' + [i]

    if (locallyStored[i] === undefined) {
        checkListInput.value = ''
        checkListDate.value = ''
    }
    else {
        checkListInput.value = locallyStored[i].input
        checkListDate.value = locallyStored[i].date
    }
    checkListDate.classList.add('savedDate')

    var thisMoment = moment().format('L')
        console.log(thisMoment)
        var OtherMoment = moment(locallyStored[i].date).format('L')
        console.log(OtherMoment)

        if(moment(OtherMoment).isSame(moment(thisMoment))){
            checkListItem.classList.add('present')
            // console.log(inputHolder)
        }
        if(moment(OtherMoment).isBefore(moment(thisMoment))){
            checkListItem.classList.add('past')
        }
        if(moment(OtherMoment).isAfter(moment(thisMoment))){
            checkListItem.classList.add('future')
        }

    removeButton.id = 'remove' + [i]
    removeButton.textContent = 'X'
    removeButton.classList.add('removeButton')
    // append Items
    newItemButton.insertAdjacentElement("afterend", checkListItem)
    checkListItem.append(removeButton)
    checkListItem.append(checkListDate)
    checkListItem.append(checkListInput)
    checkListItem.append(checkButton)
}
//  event listener on full container
checklistContainer.addEventListener('click', (event) => {
    // check if element is a button
    const isButton = event.target.nodeName === 'BUTTON';
    // get id of target element
    var targetId = event.target.getAttribute('id')

    var targetItem = document.getElementById(targetId).parentElement
    // test if element is button
    if (!isButton) {
        return;
    }
    // add new list item function called if element is add list item element
    else if (targetId === 'addListItem') {
        addNewListItem()
    }
    // else save/checkmark button
    else if (targetId === 'saveButton') {
        saveAll(targetItem)
    }
    else if (targetId.includes('check')) {
        var targetItem = document.getElementById(targetId).parentElement
        if (targetItem.classList.contains('checked')) {
            targetItem.classList.remove('checked')
            targetItem.classList.add('unchecked')
        } else {
            targetItem.classList.add('checked')
            targetItem.classList.remove('unchecked')
        }
    }
    else if (targetId.includes('remove')) {
        var deleteNum = parseInt(targetItem.id)
        console.log(deleteNum)
        locallyStored.splice(deleteNum, 1)
        var stringSave = JSON.stringify(locallyStored)
        localStorage.setItem('toDoArray', stringSave)
        targetItem.remove()
        itemAmount -= 1
        localStorage.setItem('itemAmount', itemAmount)
    }
})
// declare add new item function
function addNewListItem() {
    // create a div to hold our content
    const checkListItem = document.createElement('div')
    const checkButton = document.createElement('button')
    const removeButton = document.createElement('button')
    // add a class for styling
    checkButton.id = 'checkListButton' + itemAmount
    checkButton.innerHTML = '✔'
    checkButton.classList.add('toDoButton', 'unchecked')
    // add a class for styling
    checkListItem.classList.add('checkListItem')
    checkListItem.id = itemAmount
    checkListInput = document.createElement('input')
    checkListInput.classList.add('toDoInput')
    checkListInput.id = 'toDoInput' + itemAmount
    checkListInput.placeholder = "Enter your to-do items!"
    // create input for date
    const checkListDate = document.createElement('input')
    checkListDate.type = 'date'
    checkListDate.classList.add('toDoDate')
    checkListDate.id = 'toDoDate' + itemAmount

    removeButton.id = 'remove' + itemAmount
    removeButton.textContent = 'X'
    removeButton.classList.add('removeButton')

    newItemButton.insertAdjacentElement("afterend", checkListItem)
    checkListItem.append(removeButton)
    checkListItem.append(checkListDate)
    checkListItem.append(checkListInput)
    checkListItem.append(checkButton)
    itemAmount += 1
    // console.log(typeof buttonAmount)
    localStorage.setItem('itemAmount', itemAmount)
}
function saveAll() {
    for (let i = 0; i < itemAmount; i++) {
        var dateHolder = document.getElementById('toDoDate' + [i])
        var inputHolder = document.getElementById('toDoInput' + [i])
        currentElement = inputHolder.parentElement
        console.log(currentElement)
        var saveItem = new Object()
        saveItem.input = inputHolder.value
        if(inputHolder.value == null){
            saveItem.input = ''
        }
        saveItem.date = dateHolder.value
        if (dateHolder.value == null){
            saveItem.date = ''
        }
        var thisMoment = moment().format('L')
        console.log(thisMoment)
        var OtherMoment = moment(saveItem.date).format('L')
        console.log(OtherMoment)

        if(moment(OtherMoment).isSame(moment(thisMoment))){
            currentElement.classList.add('present')
            // console.log(inputHolder)
        }
        if(moment(OtherMoment).isBefore(moment(thisMoment))){
            currentElement.classList.add('past')
        }
        if(moment(OtherMoment).isAfter(moment(thisMoment))){
            currentElement.classList.add('future')
        }




        locallyStored.splice(i, 1, saveItem)
        // locallyStored.splice(i, i, 'date : ' + dateHolder.value)

        dateHolder.classList.add('savedInput')
        inputHolder.classList.add('savedInput')
        dateHolder.classList.add('savedInput')
        inputHolder.classList.add('savedInput')
    }
    var stringSave = JSON.stringify(locallyStored)
    localStorage.setItem('toDoArray', stringSave)
}