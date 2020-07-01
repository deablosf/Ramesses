// OKay Time to get this started

// Tuesday
// DONE!!!!! *Get proposal and wireframe done.

// *Figure out the number of backgrounds you'll need to finish.

// DONE!! *Build basic character stats.

// *Build Combat for multiple enemies and multiple actions (adding and removing status effects)

// Sheet: Strength, Athletics, Reflex/Detection, combat stat, Toughness, Tolerance,   

//-------Basic Character sheet------------

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
        this.health = eneHealth(25) // between 8 and 24
    }
}

let versus = [];

let monsters = () => {
    for (let i = 0; i < randN(2); i++) {
     versus.push(new Enemy(enemyNames[randE()]))
}
}


const Charactstat = {
    name: '',
    str: 0,
    athl: 0,
    refdet: 0,
    combat: 0,
    tough: 0,
    toler: 0,
    health: ((this.tough + this.toler) * 2),
    actions: []
}

const Ramesses = {
    name: "Ramesses",
    str: 7,
    athl: 6,
    Refdet: 8,
    combat: 10,
    tough: 6,
    toler: 6,
    health: 24,
    actions: [],
    action: "Bat"
}


//var images = ["img1.jpeg", "img2.jpeg", "img3.jpeg",];
let turn = 0;
var versusLength = versus.length +1;
var counter = 0;

let turnTurner = () => {
    console.log(versusLength)
    if (turn >= versusLength) {
        turn = 1
    }
    console.log(turn)
    //document.querySelector(".slideshow").src = images[counter]
    //console.log(images[counter])
}

// FIGHT LOOP AND ACTIONS
const bodySweeper = () => {
    if (versus[0].health <= 0){
        versus.shift()
    } 

} 


const clubStrike = () => {
    versus[0].health -= (4 + randN(Ramesses.str));
    console.log("Enemy Health: " + versus[0].health)
    console.log(turn)
    turn ++;
}

let eneAttack = () => {
    Ramesses.health -= (2 + randN(versus[0].str));
    console.log("Rams Health: " + Ramesses.health);
    turn ++;
}

let fight = () => {
    monsters()
    // while (Ramesses.health > 0 && versus.length > 0){
    //     console.log(versus)
    //     if (turn = 1) {
    //         clubStrike();
    //         bodySweeper()
    //     }
        
    //     if (turn = 2) {
    //             eneAttack();
    //      } 
    //      if (turn =3) {
    //          turn +=1;
    //      }
    //      turnTurner()
         
    // }
}



///  - - - - - - - - - Beginning of Game- - - - - - - - - - - - -

console.log(fight())

if (versus.length <= 0){
    console.log("Fights over")
}