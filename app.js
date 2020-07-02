// OKay Time to get this started

// Tuesday
// DONE!!!!! *Get proposal and wireframe done.

// *Figure out the number of backgrounds you'll need to finish.

// DONE!! *Build basic character stats.

// *Build Combat for multiple enemies and multiple actions (adding and removing status effects)

// Sheet: Strength, Athletics, Reflex/Detection, combat stat, Toughness, Tolerance,   

//-------Basic Character sheet and per-set variables------------

const Charactstat = {
    name: '',
    str: 0,
    origstr: 0,
    athl: 0,
    origathl: 0,
    refdet: 0,
    origrefdet: 0,
    combat: 0,
    origcombat: 0,
    tough: 0,
    origtough: 0,
    toler: 0,
    origtoler: 0,
    health: ((this.tough + this.toler) * 2),
    origHealth: 0,
    actions: []
}

const Ramesses = {
    name: "Ramesses",
    str: 7,
    origstr: 7,
    athl: 7,
    origathl: 7,
    refdet: 9,
    origrefdet: 9,
    combat: 11,
    origcombat: 11,
    tough: 7,
    origtough: 7,
    toler: 7,
    origtoler: 7,
    health: 24,
    orighealth: 24,
    actions: [],
}

let turn = 0;

let odds = (max) => {
    let num = Math.floor(Math.random() * (max - 2) + 2);
    if((num % 2) == 0){
        return num + 1;
        }
        else {
        return num;
        }    
}

let eneHealth = (max) => {
    var min = 8,
        max = max,
        num = Math.floor(Math.random() * (max - min) + min);
        return num;
    // console.log(score);
};

const randE = () => {
    var min = 0,
        max = 7,
        num = Math.floor(Math.random() * (max - min) + min);
        return num;
    // console.log(score);
};

let randN = (max) => {
    var min = 1,
        max = max,
        num = Math.floor(Math.random() * (max - min) + min);
        return num;
    // console.log(score);
};

function applyChange(Ramesses.health) {
    var a = Ramesses.health * (100 / Ramesses.orighealth);
    $(".health-bar-text").html(Math.round(a) + "%");
    $(".health-bar-red").animate({
      'width': a + "%"
    }, 700);
    $(".health-bar").animate({
      'width': a + "%"
    }, 500);
    $(".health-bar-blue").animate({
      'width': a + "%"
    }, 300);
    $('.total').html(Ramesses.health + "/" + Ramesses.orighealth);
  }

// ======================================PRE-SET ACTIONS=========================================
const attackR = (x) => {
    if (turn >= 1) {
            Ramesses.health -= (2 + x);
            //document.getElementsByClassName("selectBox").innerText = Ramesses.health;
            console.log("You're hit " + "Ramess health: " + Ramesses.health) 
            turn + 1; 
    }
}

const aim = () => {

}

const clubStrike = () => { // Normal Player attack
    versus[0].health -= (4 + randN(Ramesses.str));
    console.log("Turn Num: " + turn + "   Enemy Health: " + versus[0].health);
    turn ++;
}

const drawJūnhuǒ = () => {  // lowers next attacks damage 

}

const ravanaBackHand = () => { //multiple attacks 拉瓦那的反手, less chance of hitting after each strike. maybe a for loop

}

let eneAttack = () => {
    Ramesses.health -= (2 + randN(versus[0].str));
    console.log("Turn Num: " + turn + "  Rams Health: " + Ramesses.health);
    turn ++;
}

let counter = () => {  //Round counter
    
}

// ===================End Of pre-sets=================================

let eneactions = [attackR(), aim()]

const enemyNames = ["Wrath", "Gluttony", "Lust", "Pride", "Averous", "Envy", "Sloth"]

class Enemy {
    constructor(name){
        this.name = name,
        this.str = odds(9), //between 2 and 8
        this.athl = odds(7),  //between 2 and 6
        this.refdet = odds(5),  //between 0 and 4
        this.combat = odds(7),  //between 2 and 6
        this.tough = odds(9),  //between 2 and 8
        this.toler = odds(9),  //between 2 and 8
        this.health = eneHealth(25), // between 8 and 24
        this.actions = [attackR]
    }
}

let versus = [];

let monsterGeny = () => {
    for (let i = 0; i < randN(3); i++) {
     versus.push(new Enemy(enemyNames[randE()]))
}
}


// FIGHT LOOP AND ACTIONS
let versusLength = versus.length +1;

let turnTurner = () => {
    // console.log(versusLength)
    if (turn >= versusLength) {
        turn = 0
    }
    //document.querySelector(".slideshow").src = images[counter]
    //console.log(images[counter])
}

const bodySweeper = () => {
    if (versus[0].health <= 0){
        console.log("Taking out the trash!")
        versus.shift()
    } 
} 



let fight = () => {
    // monsterGeny()
    while (Ramesses.health > 0 && versus.length > 0){
        bodySweeper()
        if (turn = 1) {
                clubStrike();
                console.log("Direct Hit! Enemies health: " + versus[0].health)          
        }
        bodySweeper()
        if (turn = 2 && versus.length > 0) {
                versus[0].actions[0](randN(versus[0].str))        
         } 
         if (turn = 3 && versus.length > 1) {
                versus[1].actions[0](randN(versus[1].str))  
         }
         turnTurner()
         
    }
}



///  - - - - - - - - - Beginning of Game- - - - - - - - - - - - -

monsterGeny()
console.log(versus)
console.log(fight())

if (versus.length <= 0){
    console.log("Fights over")
} else if (Ramesses.health <= 0) {
    console.log("A Could Have Been Ends")
}