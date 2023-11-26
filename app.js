"use strict";

const connectToDom = (id) => document.querySelector(id);
const connectToManyDom = (classes) => document.querySelectorAll(classes); 

const notificationIcon = connectToDom(".notification--box");
const userIcon = connectToDom(".user--information");
const alertBox = connectToDom(".alert--box");
const adminMenuBox = connectToDom(".admin--menu--box");
const closeTrialIcon = connectToDom(".trial--close--icon");
const trialBox = connectToDom(".trial--section");
const progressBar = connectToDom(".setup--progress--bar");
const closeSetupIcon = connectToDom(".close--setup");
const openSetupIcon = connectToDom(".open--setup");

const setupStepsBoxContainer = connectToDom(".setup--steps--box");

const allSetupSteps = connectToManyDom(".setup--step--heading--text");

const allSetupBtn = connectToManyDom(".setup--stepBox--button");

const allSetupCheckedIcon = connectToDom(".setup--step--checked--icon");

const allSetupSelectIcon = connectToDom(".setup--step--select--icon");
const allSetupCheckbox = connectToManyDom(".setup--checkbox");
const allSetupCheckboxBoxes = connectToManyDom(".setup--step--checkbox--box");


const toToggle = (element, className)=> element.classList.toggle(className);
const addClassToElement = (element, className) => element.classList.add(className);
const removeClassFromElement = (element, className) => element.classList.remove(className)

const toggleOpenAndCloseOfSetUpBoxContainer = (firstElemnt, secondElement, thirdElement, className)=>{
  toToggle(firstElemnt, className);
  toToggle(secondElement, className);
  toToggle(thirdElement, className);
}

const toggleNotificationBox = ()=> {
  toToggle(alertBox, "alert--box--toggle");
  toToggle(notificationIcon, "notification--icon--clicked");
}

const toggleAdminUserBox = ()=> {
  toToggle(adminMenuBox, "admin--menu--toggle");
  toToggle(userIcon, "user--box--active")
}

const hideElement = (element, type)=> {
  element.style.display = type;
}

const handleCheckboxToggle = (checkbox, checkedIcon, selectIcon) => {
  
    checkbox.checked = !checkbox.checked;
    
    const addOrRemoveClassName = (func, element, className, secondElement, type) =>{
      func(element, className);
      hideElement(secondElement, type)
    }

    const addOrRemoveClassFromElement = (isAdd, type)=> {
      addOrRemoveClassName(isAdd ? addClassToElement : removeClassFromElement, checkedIcon, "setup--step--checked--icon--active", selectIcon, type )
    } 
    
    checkbox.checked ? addOrRemoveClassFromElement(true, "none") : addOrRemoveClassFromElement(false, "block")
  
}

const updateProgressBar = ()=> {
  const progressNumber = connectToDom(".setup--completed--number");
  //use the list of checked icon to determine the value of completed steps
  const completedSteps = connectToManyDom(".setup--step--checked--icon--active");
  
  progressBar.value = completedSteps.length;
  progressNumber.textContent = completedSteps.length;
}

const expandNextIncompleteStep = (startIndex)=> {
  let nextUncheckedIndex = null;

  const mininiFunction = (isTrue, element, checkboxBox)=>{
    isTrue && (nextUncheckedIndex = element);
    removeAllActiveBoxClasses();
    activateNextStepBox(checkboxBox);
  }
  
  for (let i = startIndex; i < allSetupCheckboxBoxes.length; i++) {
    const checkboxBox = allSetupCheckboxBoxes[i];
    const checkbox = checkboxBox.querySelector(".setup--checkbox");

    if (!checkbox.checked) {
      mininiFunction(true, i, checkboxBox);
      return
    }
  }

  if (nextUncheckedIndex === null) {
    for (let i = 0; i < startIndex; i++) {
      const checkboxBox = allSetupCheckboxBoxes[i];
      const checkbox = checkboxBox.querySelector(".setup--checkbox");

      if (!checkbox.checked) {
        mininiFunction(false, i, checkboxBox)
        return
      }
    }
  }
}

const removeAllActiveBoxClasses = ()=> {
  const activeSetUpBox = connectToManyDom(".setup--step--box--active");

  activeSetUpBox.forEach((box) => {
    box.classList.remove("setup--step--box--active");
  });
}

const activateNextStepBox = (checkboxBox) =>{
  const nextStepBox = checkboxBox.closest(".setup--step--box");
  
  if (nextStepBox) addClassToElement(nextStepBox, "setup--step--box--active");
  
}

const expandSetupStep = (e)=> {
  removeAllActiveBoxClasses();
  const parentElement = e.target.closest(".setup--step--box");
  addClassToElement(parentElement, "setup--step--box--active")
}

allSetupCheckboxBoxes.forEach((btn, index) =>{
  btn.onclick = ()=>{
    
    const checkbox = btn.querySelector(".setup--checkbox");
  
    const checkedIcon = btn.querySelector(".setup--step--checked--icon");

    const selectIcon = btn.querySelector(".setup--step--select--icon");

      handleCheckboxToggle(checkbox, checkedIcon, selectIcon);
      updateProgressBar();
      expandNextIncompleteStep(index + 1);
   
  }
})

// Event Listeners
const openAndClose = ()=> toggleOpenAndCloseOfSetUpBoxContainer(closeSetupIcon, openSetupIcon, setupStepsBoxContainer , "hide");
notificationIcon.addEventListener("click", toggleNotificationBox);
userIcon.addEventListener("click", toggleAdminUserBox);
closeTrialIcon.addEventListener("click", ()=> hideElement(trialBox, "none"));
closeSetupIcon.addEventListener("click", openAndClose);
openSetupIcon.addEventListener("click", openAndClose);
allSetupSteps.forEach((btn) => btn.addEventListener("click", expandSetupStep));

const headerIcons = [notificationIcon, userIcon];

headerIcons.forEach((btn, index) => btn.addEventListener("click", ()=> {
  const checkIndex = [alertBox, adminMenuBox]
  checkIndex.forEach(item => item.style.zIndex = 0);
  checkIndex[index].style.zIndex = 10;
}))

