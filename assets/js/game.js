/* GAME  LOGIC */

// Function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};
// Function to check if playerwants to fight or skip 
var fightOrSkip = function() {
    // Ask player if they'd like to fight or skip
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
        
    // Validate prompt response
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    
    // Convert promptFight to lowercase
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        // Confirm player wants to skip
        var confirmSkip  = window.confirm("Are you sure you'd like to quit?");

        // If yes (true), leave fight
        if (confirmSkip) { 
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // Subtract money for skipping the round
            playerInfo.money = Math.max(0, playerMoney - 10);
            // Stop while loop using break and enter next fight

            // return true if player wants to leave
            return true
        }
    }
    return false
};

var fight = function(enemy) {
    // Keep track of who goes first
    var isPlayerTurn = true;

    // Randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn  = false;
    }
    // Repeat and execute as long as the enemy-robot is alive 
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // Ask player if they'd like to fight or skipusing fightOrSkip function
            if (fightOrSkip()) {
                // If true, leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // Remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health +  " health remaining.");

            // Check enemy's health 
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                // Award player money for winning
                playerInfo.money = playerInfo.money + 20;
                // Leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            } 
            // Player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // Remove enemy's health by subtracting the amount set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //Leave the while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            } 
        }
        // Switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    } // End of while loop
} // End of fight function

// Function to start a new game
var startGame = function() {
// Reset player stats
playerInfo.reset();

// Fight each enemy robot by looping over them and fighting them one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
//check player stats
console.log (playerInfo);

        // If player is still alive keep fighting
        if(playerInfo.health > 0) {
            // Let player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            
            // Pick new enemy to fight based on the index of the enemy array
            var pickedEnemyObj = enemyInfo[i];

            // Reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // If player is not fighting the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // Ask  if player wants to use the shop before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // If yes, take player to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        // If player isn't alive, stop the game
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // Player is either out of health or enemies to fight, so run the endGame function
    endGame();
};
// Function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    //If player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You have lost your robot in battle!");
    }
// Ask player is they'd like to play again
var playAgainConfirm = window.alert("Would you like to play again?");

    if (playAgainConfirm) {
        // Restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}


var shop = function() {
    // Ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE or 3 for LEAVE.");

    // Convert prompt response to an integer
    shopOptionPrompt = parseInt(shopOptionPrompt);

    // Use switch to carry out action
    switch (shopOptionPrompt) {
        // Refill
        case 1:
            playerInfo.refillHealth();
            break;
        // Upgrade
        case 2:
            playerInfo.upgradeAttack();
            break;
        // Leave
        case 3:
            window.alert("Leaving the store.");
            // Do nothing so function will end
            break;
        // Invalid option
        default:
            window.alert("You did not pick a valid option. Try again.");
            // Call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

    // Function to set player's name
    var getPlayerName = function() {
    var name = "";
        while (name === "" || name === null) {
            name = prompt("What is your robot's name?");
        }
        console.log("Your robot's name is " + name);
        return name;
    };
};
/* GAME LOGIC ENDS */

/* GAME INFORMATION / VARIABLES */
// Player Information
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10, 
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
}

// Enemy Information
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0].attack);
/* END OF GAME INFORMATION VARIBLES */

/* RUN GAME */
startGame();