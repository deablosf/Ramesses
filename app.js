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

let enemyBox1 = document.getElementsByClassName('ene1');

let enemyBox2 = document.getElementsByClassName('ene2');

let enemyBox3 = document.getElementsByClassName('ene3');

let oneEnemy = () => {
    enemyBox1[0].style.display="none"
    enemyBox3[0].style.display="none"
    enemyBox2[0].removeAttribute("style");
}

let twoEnemy = () => {
    enemyBox1[0].removeAttribute("style");
    enemyBox3[0].removeAttribute("style");
    enemyBox2[0].style.display="none"
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

const violetThrust = (x) => {  // lowers next attacks damage by 6 but adds athl to the attacks damage.
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

let eneactions = [attackR(), aim()]

Ramesses.actions = [clubStrike, violetThrust, ravanaBackHand]

const enemyNames = ["Wrath", "Gluttony", "Lust", "Pride", "Avarus", "Envy", "Sloth"]

// let ene1 = document.getElementById('ene1')
// let ene2 = document.getElementById('ene2')
// let ene3 = document.getElementById('ene3')

// ene1.addEventListener('click', function(){
//     let x = versus[0];
//     // 
// },false)
// ene2.addEventListener('click', function(){
//     let x = versus[0];
// },false)
// ene3.addEventListener('click', function(){
//     let x = versus[1];
// },false)

// ===================Combat text and user enemy selection =================================
let state = 0;

let versus = [];

let monsterGeny = () => {
    for (let i = 0; i < randN(3); i++) {
     versus.push(new Enemy(enemyNames[randE()].name, enemyNames[randE()].image))
}
}

const battleText = document.getElementById("hud");
const optionButtonsElementB = document.getElementById("selectBox")

let showText1 = (battleTextNodeIndex1) => {
    const textNodeA = bTextNode1.find(textNodeA => textNodeA.id === battleTextNodeIndex1)
    battleText.innerText = textNodeA.text;
    textNodeA.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => choice(option))
            optionButtonsElementB.appendChild(button)
        }
    })

}

let showText2 = (battleTextNodeIndex) => {
    const textNodeB = bTextNode2.find(textNodeB => textNodeB.id === battleTextNodeIndex)
    battleText.innerText = textNodeB.text;
    textNodeB.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => choice(option))
            optionButtonsElementB.appendChild(button)
        }
    })

}

let choice = (option) => {
    const nextTextNodeId = option.nextText
        state = Object.assign(state, option.setState)
    if (nextTextNodeId > 1) {
            nextTextNodeId()
        } else {
        showTextNode(nextTextNodeId)
    }
    }

    const bTextNode1 = [
        {
            id: 1, 
            text: "Choose Enemy", 
            options: [
                {
                    text: "Enemy 1", 
                    setState: versus[0], 
                    nextText: 2
                }
            ]
        },
        {
            id: 2, 
            text: "Choose Attack!", 
            options: [
                {
                    text: "Quick Strike", 
                    nextText: clubStrike(state)
                }, 
                {
                    text: "Violet Thrust", 
                    nextText: violetThrust(state)
                }, 
                {
                    text: "Ravana’s Backhands", 
                    nextText: ravanaBackHand(state)
                }
            ]
        }
    ]
    
    
    const bTextNode2 = [
        {
            id: 1,
            text: "Choose Enemy",
            options: [ 
                {
                    text: "Enemy 1",
                setState: versus[0],
                    nextText: 2
                },
                {
                    text: "Enemy 2",
                setState: versus[1],
                    nextText: 2
                }
            ]
    },
        {
            id: 2,
            text: "Choose Attack!",
            options: [
                {
                    text: "Quick Strike",
                    nextText: clubStrike(state)
                },
                {
                    text: "Violet Thrust",
                    nextText: violetThrust(state)
                },
                {
                    text: "Ravana’s Backhands",
                    nextText: ravanaBackHand(state)
                }
            ]
        }
]
    

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
    document.getElementById("ooc").style.display="none";
    document.getElementById("combat").removeAttribute("style");
    monsterGeny()
    if (versus.length = 1) {
        oneEnemy()
    } else if (versus.length > 1) {
        twoEnemy()      
    }
    while (Ramesses.health > 0 && versus.length > 0){
        bodySweeper()
        if (turn = 1) {
            if (versus.length = 1) {
                showText1()
            } else {
                showText2()
            };          
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
                text: "continue",
                nextText: 2
            },
            {
                text: "Walk Away",
                setState: {brownSuga: true},
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "Smart choice, now get to work!",
        options: [
            {
                text: "Get back to work and work it hard!",
                requiredState: (currentState) => currentState.brownSuga,
                setState: {brownSugar: false, awake: true},
                nextText: 3
            },
            {
                text: "Eat some gummi worms and get back to Work",
                requiredState: (currentState) => currentState.brownSuga,
                setState: {brownSugar: false, wired: true},
                nextText: 3
            },
            {
                text: "Take a NAP!",
                //nextText: fight()
            }
        ]
    }
]


///  - - - - - - - - - Beginning of Game- - - - - - - - - - - - -
let startGame = () => {
    state = 0;
    document.getElementById("combat").style.display="none";
    document.getElementById("ooc").removeAttribute("style");
    npcs[0].style.backgroundImage = "url('assets/Shifu.jpg')";
    bGI[0].style.backgroundImage = "url('assets/startBG11.jpg')"
   //fight()
   
    showTextNode(1)

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