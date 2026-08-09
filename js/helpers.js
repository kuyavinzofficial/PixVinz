// ======================================
// PixVinz
// HELPER SYSTEM
// ======================================
//
// Shared utility functions.
// This file contains only safe helper
// functions and does not control the puzzle.
// ======================================


// ======================================
// SAFE ELEMENT GETTER
// ======================================

function getElement(id){

    return document.getElementById(id);

}


// ======================================
// SHOW ELEMENT
// ======================================

function showElement(element){

    if(!element){
        return;
    }

    element.classList.remove("hidden");

}


// ======================================
// HIDE ELEMENT
// ======================================

function hideElement(element){

    if(!element){
        return;
    }

    element.classList.add("hidden");

}


// ======================================
// SAFE NUMBER
// ======================================

function safeNumber(value, fallback = 0){

    const number = Number(value);

    if(Number.isNaN(number)){
        return fallback;
    }

    return number;

}


// ======================================
// LOCAL STORAGE NUMBER
// ======================================

function getStorageNumber(key, fallback = 0){

    const value =
        localStorage.getItem(key);

    if(value === null){
        return fallback;
    }

    return safeNumber(
        value,
        fallback
    );

}


// ======================================
// SAVE NUMBER
// ======================================

function setStorageNumber(key, value){

    localStorage.setItem(
        key,
        String(value)
    );

}


// ======================================
// PLAY CLICK SOUND SAFELY
// ======================================

function safePlayClick(){

    if(typeof playClick === "function"){

        playClick();

    }

}


// ======================================
// PAGE NAVIGATION
// ======================================

function goToPage(page){

    window.location.href = page;

}
