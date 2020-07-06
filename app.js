// OKay Time to get this started

// Tuesday
// *Build Combat for multiple enemies and multiple actions (adding and removing status effects)
 
//Wednesday
//*Set up UI: NPCs placement, stat placement, health bar, damage animation, status animation, choices and selection functions and animations (ALL DAY!)

// Thursday
//*Construct enemies and other NPCs: stats, images, onscreen pop-ups and interactions (ALL DAY!)

//Friday
//*DIALOG, DIALOG, DIALOG, DIALOG, and DIALOG, : Cause they have to spit hot fire! (Do I STILL NEED TO SAY IT! ALL DAY!!!!!)

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

// let turn = 1;

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
    constructor(name, image){
        this.name = name,
        this.str = odds(9), //between 2 and 8
        this.athl = odds(7),  //between 2 and 6
        this.refdet = odds(5),  //between 0 and 4
        this.combat = odds(7),  //between 2 and 6
        this.tough = odds(9),  //between 2 and 8
        this.toler = odds(9),  //between 2 and 8
        this.health = eneHealth(25), // between 8 and 24
        this.aimBonus = 0,
        this.actions = [attackR, aim],
        this.image = image
    }
}
// =========== Background, enemy iamge variables and HUD =====================
let npcs = document.getElementsByClassName('person');

let bGI = document.getElementsByClassName('screen');

let hud = document.getElementsByClassName('hud');

let enemyBox1 = document.getElementById('ene1');

let enemyBox2 = document.getElementById('ene2');

let enemyBox3 = document.getElementById('ene3');

let oneEnemy = () => {
    enemyBox1.style.display="none";
    enemyBox3.style.display="none";
    enemyBox2.removeAttribute("style");
}

let twoEnemy = () => {
    enemyBox1.removeAttribute("style");
    enemyBox3.removeAttribute("style");
    enemyBox2.style.display="none";
}

// ======================================PRE-SET ACTIONS=========================================
const attackR = (x) => {
    if (turn >= 1) {
        let strikechance = x.aimBonus + randN(x.combat);
        if (strikechance >= Ramesses.athl/2){
            Ramesses.health -= (2 + randN(x.str));
            x.aimBonus = 0;
            gameMessage.innerText = "You're hit" + "Ramess health: " + Ramesses.health; 
        } else {
            x.aimBonus = 0;
            gameMessage.innerText =  " Dodged!";
        }
            
    }
}

const aim = (x) => {
    if (turn >= 1) {
        x.aimBonus +=2;
        gameMessage.innerText = "Looks like " + x.name + " is taking aim!  " + x.aimBonus;
        turn += 1;
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

const violetThrust = (x) => {  // lowers next attacks damage by 6 but adds athl to the attacks damage.
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway >= x.athl/2){
        Ramesses.str += 6;
        //console.log("You get low, low-rider, turning your legs into high tention spring and let loose, launchin' yourself parallel to the floor right at that sucka!")
        x.health -= (4 + randN(Ramesses.str));
        //console.log("Turn Num: " + turn + "  Struck True! Enemy Health: " + x.health);
        Ramesses.athl -= 5;
        Ramesses.str = Ramesses.origstr;
        turn ++;
    } else {
        Ramesses.athl -= 5;
        //console.log("You get low, low-rider, turning your legs into high tention spring and let loose, launchin' yourself parallel to the floor right at that sucka!")
        //console.log("Turn Num: " + turn + " Only to miss ..." )
        turn ++;
    }
    


}

const ravanaBackHand = (x) => { //multiple attacks 拉瓦那的反手, less chance of hitting after each strike. maybe a for loop
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway > x.athl/2) {
        for (i = swingAway; i > x.athl/2; i --) {
            x.health -= (4 + randN(Ramesses.str));
            //console.log("Hit!")
        }
        turn ++;
    
    } else {
        //console.log("Way to swing mighty Casey")
        turn ++;
    
}
}


Ramesses.actions = [clubStrike, violetThrust, ravanaBackHand]

const enemyNames = [
    {
        name: "Wrath", 
        image: "assets/Enemy1.jpg"
    }, 
    {
        name: "Gluttony", 
        image: "assets/enemy2.jpg"
    }, 
    {
        name: "Lust", 
        image: "assets/enemy3.jpg"
    }, 
    {
        name: "Pride", 
        image: "assets/enemy4.jpg"
    }, 
    {
        name: "Avarus", 
        image: "assets/enemy5.jpg"
    }, 
    {
        name: "Envy", 
        image: "assets/enemy6.jpg"
    }, 
    {
        name: "Sloth", 
        image: "assets/enemy7.jpg"
    }
]


// ===================Combat text and user enemy selection =================================
let state = [];

let versus = [];

let monsterGeny = () => {
    let y = randN(3)
    for (let i = 0; i < y; i++) {
        let x = randE()
        versus.push(new Enemy(enemyNames[x].name, enemyNames[x].image))
    }
    return versus;
}



// FIGHT LOOP AND ACTIONS
let versusLength = versus.length +1;

let turnTurner = () => {
    if (turn >= versusLength) {
        turn = 1
    }
}

const bodySweeper = () => {
    if (versus[0].health <= 0){
        console.log("Taking out the trash!")
        versus.shift()
    } 
} 

let turn = 1;

// let fight = () => {
//     // document.getElementById("ooc").style.display="none";
//     // document.getElementById("combat").removeAttribute("style");
//     monsterGeny()
//     // if (versus.length == 1) {
//     //     oneEnemy(1)
//     // } else if (versus.length > 1) {
//     //     twoEnemy(1)      
//     // }
//     document.getElementById("ooc").style.display="none";
//     document.getElementById("combat").removeAttribute("style");
//     while (Ramesses.health > 0 && versus.length > 0){
//         console.log("in the fight loop");
//         bodySweeper()
//         if (turn = 1) {
//             console.log(turn)
//         }
//         bodySweeper()
//         if (turn == 2 && versus.length > 0) {
//             badAi(versus[0])        
//          } 
//          if (turn == 3 && versus.length > 1) {
//             badAi(versus[1])
//          }
//          turnTurner()
         
//     }
// }

// everything here will be placed into our attacks
const attack = () => {
    let attackButton = document.getElementsByClassName('attack-btn')
    let gameMessage = document.getElementById('hud'); 
    let playerAttack = 23;

    attackButton.disabled= true;
    gameMessage.innerText = "oppnent is about to strike!"
    setTimeout(() => {
        badAi(versus[0])
        attackButton.disabled = false;
    }, 1000);
    
}

const printToScreen = () => {
    document.getElementById('hud').innerText = player.health;

    document.getElementById('hud').innerText = oppenent.health;
}



// - - - - - - - - - - - - Text for Game - - - - - - - - - - - - - - - 

const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('selectBox')

let showTextNode = (textNodeIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

    if (textNode.sideEffect) {
        textNode.sideEffect();
    }

}

let showOption = (option) => {
    return option.requiredState ==null || option.requiredState(state)
}

let selectOption = (option) => {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}
// Template to have text pop up, not going super well
const textNodes = [
    {
        id: 1,
        text: "The Bronx was no peaceful farm town but it was home. Ramses and his brothers from the orphanage-dojo enjoyed their lives together until the Di Trullio crime family let greed make their choices for them. New faces roamed the streets, criminals from all over visiting and accepting the Di Trullio family’s hospitality.",
        options: [ 
            {
                text: "Continue",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "These outsiders didn’t know the Bronx, didn’t care for the people and took what they wanted and all was forgiven if they paid off the Di Trullio’s and the mob paid the law. The streets are reaching a boiling point and few people feel safe anymore when a gang from upstate goes too far, taking one of Ramses’ oath brothers after he told them off.",
        options: [
            {
                text: "Continue",
                setState: {shifu: true},
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "His dojo master demands Ramses and his remaining oath brother, known as “Anchor of the Unmoored kingdom“ stay in the orphanage dojo; “Anyone weak enough to be taken deserves their fate” he says. Ignoring their master’s words, the two of them head to the abandoned Harriet Stowe Housing community or what the local’s called “Uncle Tom’s Projects” to face off against the Raptures Wronged gang to get their brother back tonight or die trying.",
        sideEffect: () => {
            npcs[0].style.backgroundImage = "url('assets/Shifu.jpg')"
        },
        options: [
            {
                text: "Continue",
                nextText: 4
            }
        ]
    }
]

let musac = document.getElementById('flash');


let play = () => {
    musac.play()
}
///  - - - - - - - - - Beginning of Game- - - - - - - - - - - - -
let startGame = () => {
    // state = {shifu: false};
    play()
    document.getElementById("combat").style.display="none";
    document.getElementById("ooc").removeAttribute("style");
    //if (state.shifu == true) {
      //  npcs[0].style.backgroundImage = "url('assets/Shifu.jpg')"
    //};
    bGI[0].style.backgroundImage = "url('assets/startBG11.jpg')"
    showTextNode(1)
    
    
    //fight()
    
}





//monsterGeny()
//console.log(versus)
// console.log(fight())

// if (versus.length <= 0){
//     console.log("Some mofos are always trying to ice-skate uphill")
// } else if (Ramesses.health <= 0) {
//     console.log("A Could Have Been Ends")
// }

startGame()