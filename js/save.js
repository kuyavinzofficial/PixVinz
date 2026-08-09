// ======================================
// PLAYER SAVE SYSTEM
// ======================================

// Get current player
function getPlayer(){

    return getCurrentUser();

}

// Read player data
function getPlayerData(key, defaultValue){

    const user = getPlayer();

    if(!user){

        return defaultValue;

    }

    if(user[key] === undefined){

        return defaultValue;

    }

    return user[key];

}

// Save player data
function setPlayerData(key, value){

    const user = getPlayer();

    if(!user){

        return;

    }

    user[key] = value;

    saveCurrentUser(user);

}
