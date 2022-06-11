/* GAME  LOGIC */

// Function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fight = function(enemy) {
    // Repeat and execute as long as the enemy-robot is alive 
    while(playerInfo.health > 0 && enemy.health > 0) {
        // Ask player if they would like to fight or run
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

        // If player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip  = window.confirm("Are you sure you'd like to quit?");
    
            // If yes (true), leave fight
            if (confirmSkip) { 
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // Subtract money from playerMoney for skipping
                playerInfo.money = Math.max(0, playerMoney - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        // Generate random damage value based on Player's attack power 
        var damage = randomNumber(playerAttack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know it worked
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

        // Generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);


        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // Check player's health
            if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            //Leave the while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        } 
    } // End of while loop
} // End of fight function

// Function to start a new game
var startGame = function() {
// Reset player stats
playerInfo.reset();

// Fight each enemy robot by looping over them and fighting them one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
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
var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE' or 'LEAVE' to make a choice.");
    console.log("entered the shop");

        // Use switch to carry out action
    switch (shopOptionPrompt) {
        // Refill
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        // Upgrade
        case "UPGRADE":
        case "upgrade": 
            playerInfo.upgradeAttack();
            break;
        // Leave
        case "LEAVE":
        case "leave":
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