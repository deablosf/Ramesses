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
    aimBonus: 0,
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

function applyChange() {
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
        this.aimBonus = 0,
        this.actions = [attackR, aim]
    }
}



// ======================================PRE-SET ACTIONS=========================================
const attackR = (x) => {
    if (turn >= 1) {
        let strikechance = x.aimBonus + randN(x.combat);
        if (strikechance >= Ramesses.athl/2){
            Ramesses.health -= (2 + randN(x.str));
            x.aimBonus = 0;
            //document.getElementsByClassName("selectBox").innerText = Ramesses.health;
            console.log("Turn Num: " + turn + "  You're hit " + "Ramess health: " + Ramesses.health) 
            turn + 1; 
        } else {
            x.aimBonus = 0;
            console.log("Turn Num: " + turn + " Dodged!")
            turn + 1; 
        }
            
    }
}

const aim = (x) => {
    if (turn >= 1) {
        x.aimBonus +=2;
        console.log("Looks like " + x.name + " is taking aim!  " + x.aimBonus);
        turn + 1;
    }
}

const badAi = (x) =>{
    if (turn >= 1) {
        let picker = x.actions.length +1;
        let i = randN(picker) -1
        x.actions[i](x)
    }
}

const clubStrike = (x) => { // Normal Player attack
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway >= x.athl/2){
        x.health -= (4 + randN(Ramesses.str));
        console.log("Turn Num: " + turn + "  Direct Hit! Enemy Health: " + x.health);
        Ramesses.athl = Ramesses.origathl
        turn ++;
    } else {
        console.log("Turn Num: " + turn + "  Missed" )
        turn ++;
    }
    
}

const voiletTrust = (x) => {  // lowers next attacks damage by 6 but adds athl to the attacks damage.
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway >= x.athl/2){
        Ramesses.str += 6;
        console.log("You get low, low-rider, turning your legs into high tention spring and let loose, launchin' yourself parallel to the floor right at that sucka!")
        x.health -= (4 + randN(Ramesses.str));
        console.log("Turn Num: " + turn + "  Struck True! Enemy Health: " + x.health);
        Ramesses.athl -= 5;
        Ramesses.str = Ramesses.origstr;
        turn ++;
    } else {
        Ramesses.athl -= 5;
        console.log("You get low, low-rider, turning your legs into high tention spring and let loose, launchin' yourself parallel to the floor right at that sucka!")
        console.log("Turn Num: " + turn + " Only to miss ..." )
        turn ++;
    }
    


}

const ravanaBackHand = (x) => { //multiple attacks 拉瓦那的反手, less chance of hitting after each strike. maybe a for loop
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway > x.athl/2) {
        for (i = swingAway; i > x.athl/2; i --) {
            x.health -= (4 + randN(Ramesses.str));
            console.log("Hit!")
        }
        turn ++;
    
    } else {
        console.log("Way to swing mighty Casey")
        turn ++;
    
}
}

let counter = () => {  //Round counter
    
}

// ===================End Of pre-sets=================================

let eneactions = [attackR(), aim()]

const enemyNames = ["Wrath", "Gluttony", "Lust", "Pride", "Avarus", "Envy", "Sloth"]

let versus = [];

let monsterGeny = () => {
    for (let i = 0; i < randN(3); i++) {
     versus.push(new Enemy(enemyNames[randE()]))
}
}

// FIGHT LOOP AND ACTIONS
let versusLength = versus.length +1;

let turnTurner = () => {
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
    monsterGeny()
    console.log(versus)
    while (Ramesses.health > 0 && versus.length > 0){
        bodySweeper()
        if (turn = 1) {
                clubStrike(versus[0]);          
        }
        bodySweeper()
        if (turn = 2 && versus.length > 0) {
            badAi(versus[0])        
         } 
         if (turn = 3 && versus.length > 1) {
            badAi(versus[1])
         }
         turnTurner()
         
    }
}



///  - - - - - - - - - Beginning of Game- - - - - - - - - - - - -

//monsterGeny()
//console.log(versus)
console.log(fight())

if (versus.length <= 0){
    console.log("Some mofos are always trying to ice-skate uphill")
} else if (Ramesses.health <= 0) {
    console.log("A Could Have Been Ends")
}