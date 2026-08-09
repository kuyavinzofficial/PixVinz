// ======================================
// PixVZinz
// RECORD DISPLAY SYSTEM
// ======================================
//
// Handles:
// - Star display text
//
// NOTE:
// Save/progress records are handled by:
// js/save.js
//
// Do NOT duplicate save functions here.
// ======================================


// ======================================
// GET STAR TEXT
// ======================================

function getStarText(starCount){

    starCount =
        Number(starCount) || 0;


    if(starCount >= 3){

        return "⭐⭐⭐";

    }


    if(starCount === 2){

        return "⭐⭐";

    }


    if(starCount === 1){

        return "⭐";

    }


    return "";

}


// ======================================
// END OF RECORD DISPLAY SYSTEM
// ======================================
