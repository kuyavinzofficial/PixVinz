
// ======================================
// PixVZinz
// LEVEL SYSTEM
// ======================================
//
// Supports up to 200 levels.
//
// Image naming:
// image/level1.jpeg
// image/level2.jpeg
// ...
// image/level200.jpeg
//
// To add future levels:
// Just upload the next image.
// No need to edit this file.
// ======================================


// ======================================
// TOTAL LEVELS
// ======================================

const totalLevels = 200;


// ======================================
// LEVEL IMAGES
// ======================================

const images = [];

for(let i = 1; i <= totalLevels; i++){

    images.push(
        "image/level" + i + ".jpeg"
    );

}


// ======================================
// CURRENT LEVEL
// ======================================

let level =
    Number(
        localStorage.getItem("level")
    ) || 1;


// ======================================
// KEEP LEVEL WITHIN RANGE
// ======================================

if(level < 1){

    level = 1;

}

if(level > totalLevels){

    level = totalLevels;

}


// ======================================
// DIFFICULTY
// ======================================
//
// Levels 1-10   = 3 x 3
// Levels 11-20  = 4 x 4
// Levels 21-35  = 5 x 5
// Levels 36-50  = 6 x 6
// Levels 51-75  = 7 x 7
// Levels 76-100 = 8 x 8
// Levels 101-125 = 9 x 9
// Levels 126-150 = 10 x 10
// Levels 151-175 = 11 x 11
// Levels 176-200 = 12 x 12
// ======================================

let size;


if(level <= 10){

    size = 3;

}
else if(level <= 20){

    size = 4;

}
else if(level <= 35){

    size = 5;

}
else if(level <= 50){

    size = 6;

}
else if(level <= 75){

    size = 7;

}
else if(level <= 100){

    size = 8;

}
else if(level <= 125){

    size = 9;

}
else if(level <= 150){

    size = 10;

}
else if(level <= 175){

    size = 11;

}
else{

    size = 12;

}


// ======================================
// GET CURRENT LEVEL IMAGE
// ======================================

function getCurrentImage(){

    return images[level - 1];

}


// ======================================
// CHECK IF LEVEL EXISTS
// ======================================

function levelExists(levelNumber){

    return(
        levelNumber >= 1 &&
        levelNumber <= totalLevels
    );

}


// ======================================
// GET NEXT LEVEL
// ======================================

function getNextLevel(){

    if(level < totalLevels){

        return level + 1;

    }

    return null;

}


// ======================================
// GET LEVEL SIZE
// ======================================

function getLevelSize(levelNumber){

    if(levelNumber <= 10){

        return 3;

    }
    else if(levelNumber <= 20){

        return 4;

    }
    else if(levelNumber <= 35){

        return 5;

    }
    else if(levelNumber <= 50){

        return 6;

    }
    else if(levelNumber <= 75){

        return 7;

    }
    else if(levelNumber <= 100){

        return 8;

    }
    else if(levelNumber <= 125){

        return 9;

    }
    else if(levelNumber <= 150){

        return 10;

    }
    else if(levelNumber <= 175){

        return 11;

    }

    return 12;

}


// ======================================
// UPDATE LEVEL SIZE
// ======================================

size =
    getLevelSize(level);


// ======================================
// DEBUG INFORMATION
// ======================================

console.log(
    "PixVZinz: Level " +
    level +
    " / " +
    totalLevels
);

console.log(
    "PixVZinz: Puzzle size " +
    size +
    "x" +
    size
);

console.log(
    "PixVZinz: Image " +
    getCurrentImage()
);

