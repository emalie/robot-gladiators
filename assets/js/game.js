var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Game states
// WIN - Player robot has defeated all enemy robots.
//      * Fight all enemy robots
//      * Defeat each enemy robot
// LOSE - Player robot's health is zero or less

var fight = function(enemyName) {
    // Alert players that they are starting the roundrAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    enemyHealth = enemyHealth - playerAttack;
    // Log a resulting message to the console so we know it worked
    console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth +  " health remaining.");
    // Check enemy's health 
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

// If  player chooses to fight, then fight
if (promptFight === "fight" || promptFight === "FIGHT") {
    // Remove enemy's health by subtracting the amount set in the playerAttack variable 
    enemyHealth  = enemyHealth - playerAttack;
    console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
    //Check enemy's health
    if (enemyHealth <= 0)  {
        window.alert(enemyName + " has died!");
    } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    // Remove player's healthby subtracting the amount set in the enemyAttack variable
    playerHealth  = playerHealth - enemyAttack;
    console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
    // Check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    } 
    // If player chooses to skip 
} else if (promptFight === "skip" || promptFight === "SKIP") {
    // Confirm player wants to skip
    var confirmSkip  = window.confirm("Are you sure you'd like to quit?");

// If yes (true), leave fight
if (confirmSkip) { 
    window.alert(playerName + " has decided to skip this fight. Goodbye!");
    // Subtract money from playerMoney for skipping
    playerMoney = playerMoney -2;
}
// If no (false), ask question again by running fight() again
} else {
    for(var i = 0; i < enemyNames.length; i++) {
        fight(enemyNames[i]);
    }
}

};
fight();
