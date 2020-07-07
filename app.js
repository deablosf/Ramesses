// OKay Time to get this started

// Tuesday
// *Build Combat for multiple enemies and multiple actions (adding and removing status effects)
 
//Wednesday
//*Set up UI: NPCs placement, stat placement, health bar, damage animation, status animation, choices and selection functions and animations (ALL DAY!)

// Thursday
//*Construct enemies and other NPCs: stats, images, onscreen pop-ups and interactions (ALL DAY!)

//Friday
//*DIALOG, DIALOG, DIALOG, DIALOG, and DIALOG, : Cause they have to spit hot fire! (Do I STILL NEED TO SAY IT! ALL DAY!!!!!)

// ================================
// ==== Basic Character sheet and per-set variables
// ================================

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
let state = [];

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

let randN0 = (max) => {
    var min = 0,
        max = max,
        num = Math.floor(Math.random() * (max - min) + min);
        return num;
    // console.log(score);
};

// Health Bar, Must fix but does not stop game
let applyChange = () => {
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
    constructor(name, image, snaps){
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
        this.image = image,
        this.snaps = snaps
    }
}

    let seeFoo = ["Are you getting paid to be a punching bag or do you just like getting hit? Not judging if that’s what you’re into. Just thought you wanted to save someone.", "Was that your best hit? I thought you were trying to hurt them, not seduce them with light tickles and love taps.", "Any fight that they walk away from is another failure in your book. Worst student I ever had.", "I thought I taught you to win a fight you need to get hit less than the other guy, unless you’re trying to wear down his fists with your face.", "Is this for intimidation? Stand there and let them beat you until they are tired because it is futile?", " wouldn’t have done that but what do I know, I just taught you how to fight.", "Your body is strong and your brain is equally as weak. That means you’re stupid, BWAH HA HA HA.", "You know why they call it dead weight? If you try to lift it, you die too. Leave him. If he was weak enough to get caught, he is too weak for what’s coming."];



// ==================================
// Background, enemy image, document variables and HUD 
// ==================================

// NPC the Player is interacting with at that Moment
let npcs = document.getElementsByClassName('person');
// Current background image
let bGI = document.getElementsByClassName('screen');
// In combat messages 
let gameMessage = document.getElementById('hud');

let enemyImage = document.getElementById('ene2')


// Multiple enemies boxs to target, failed
let enemyBox1 = document.getElementById('ene1');

let enemyBox2 = document.getElementById('ene2');

let enemyBox3 = document.getElementById('ene3');

// ==========================================
// ========PRE-SET Attack for player and Npcs=====
// ==========================================
const attackR = (x) => {
        let strikechance = x.aimBonus + randN(x.combat);
        if (strikechance >= Ramesses.athl/2){
            Ramesses.health -= (2 + randN(x.str));
            x.aimBonus = 0;
            gameMessage.innerText = "You're hit " + "Ramess health: " + Ramesses.health; 
        } else {
            x.aimBonus = 0;
            gameMessage.innerText =  " Dodged, Now's your chance!";
        }
            
    }

const aim = (x) => {
        x.aimBonus +=2;
        gameMessage.innerText = "Looks like " + x.name + " is taking aim!  " + x.aimBonus;
    }

const badAi = (x) =>{
        let picker = x.actions.length +1;
        let i = randN(picker) -1
        x.actions[i](x)
}

const clubStrike = (x) => { // Normal Player attack
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway >= x.athl/2){
        x.health -= (4 + randN(Ramesses.str));
        gameMessage.innerText = "Direct Hit! Enemy Health: " + x.health;
        Ramesses.athl = Ramesses.origathl
    } else {
        gameMessage.innerText = "Missed"
    }
    
}

const violentThrust = (x) => {  // lowers next attacks damage by 6 but adds athl to the attacks damage.
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway >= x.athl/2){
        Ramesses.str += 6;
        gameMessage.innerText = "You get low, low-rider, turning your legs into high tention spring and let loose, launchin' yourself parallel to the floor right at that sucka!";
        setTimeout(() => {
            x.health -= (4 + randN(Ramesses.str));
        }, 1000);
        gameMessage.innerText = "Struck True! Enemy Health: " + x.health;
        setTimeout(() => {  
        Ramesses.athl -= 5;
        Ramesses.str = Ramesses.origstr;
        }, 1000);
        
    } else {
        setTimeout(() => {
            Ramesses.athl -= 5;
        gameMessage.innerText = "You get low, low-rider, turning your legs into high tention spring and let loose, launchin' yourself parallel to the floor right at that sucka!";
        }, 1000);
        gameMessage.innerText = " Only to miss ...";
    }
    


}

const ravanaBackHand = (x) => { //multiple attacks 拉瓦那的反手, less chance of hitting after each strike. maybe a for loop
    let swingAway = 1 + randN(Ramesses.combat)
    if (swingAway > x.athl/2) {
        for (i = swingAway; i > x.athl/2; i --) {
            gameMessage.innerText = "Hit!" + i;
            x.health -= (1 + randN(Ramesses.str));
        }
    
    } else {
        gameMessage.innerText = "Way to swing mighty Casey"  
}
}

Ramesses.actions = [clubStrike, violentThrust, ravanaBackHand]
// ENEMY NAMES, IMAGES, and INTRO WORDS
const enemyNames = [
    {
        name: "Wrath", 
        image: "url('assets/Enemy1.jpg')",
        snaps: ["You broke in, so you brought this on yourself. Remember that in the ER, boy.", "What the? Get out! Get out of here, now! I’ll kill you!", "I saw what you did to those others, putting down a mad dog like you is the cherry on my day.", "I’d rip them apart if I could reach them, leaving me behind? Me? ARGH, why?!"]
    }, 
    {
        name: "Gluttony", 
        image: "url('assets/enemy2.png')",
        snaps: ["I could have gone too but I needed just one more…why don’t they get it?", "I can let you go, you know...hey is that brown sugar? Give it to me and you won’t have to get hurt.", "I just had some brown sugar. No, wait! Do you have some brown sugar? Give me yours!", "Empty those pockets, boy, put it all in the bag and I might just let you leave here in one piece."]
    }, 
    {
        name: "Lust", 
        image: "url('assets/enemy3.jpg')",
        snaps: ["Look at you, more crafted than born. How’d you get to look so...mmm...good?", "It’s not fair, why leave me behind? Just take a look at me and tell me you don’t want this with you.", "I shouldn’t be here, I should be far away with a face between my legs.", "I don’t want to fight, but I do like it when it gets rough."]
    }, 
    {
        name: "Pride", 
        image: "url('assets/enemy4.jpg')",
        snaps: ["Cute, you got a little stick. This here? This is a real weapon.", "Had a bit of luck getting here huh? Luck ran out when you met me, boy.", "I didn’t get left behind like the rest of these sad sacks, I stayed behind because they needed guidance and strength. They need me. They. Need. Me.", "Take a swing, boy, think of it as giving you a chance."]
    }, 
    {
        name: "Avarus", 
        image: "url('assets/enemy5.jpg')",
        snaps: ["I’m glad they left me behind, how could I leave such cool stuff anyway?", "I knew the moment I saw you, you got what I need but you won’t give it willingly will you? Guess I have to take it.", "I could let you go, we got what we needed but a bonus couldn’t hurt and I want more.", "Stay back, this here is mine, there’s just not enough to share, don’t you get it?!"]
    }, 
    {
        name: "Envy", 
        image: "url('assets/enemy6.jpg')",
        snaps: ["That’s a real nice bat, too good for someone like you. Give it here, I said give it!", "I can’t believe she got to go instead of me, she was a whore and always in everyone else’s trash. Not one of them deserved to go more than me, not one.", "Why fight us for him? I never had a friend like that. If I take you out though, he won’t have a friend like that either.", "Look at those abs, it’s not fair, I should have abs like that. At least I won’t have your hospital bills."]
    }, 
    {
        name: "Sloth", 
        image: "url('assets/enemy7.jpg')",
        snaps: ["Wait, do we even have to do this? Can’t you just, you know, leave?", "Just tap me hard enough to bruise so it looks like I really put up a fight.", "I could have gone too, I really could have, I heard the call but I figured they would come and get me.", "If I stop you here, it ends but that’s a lot of work…"]
    }
]


// ============================
// Combat text and user enemy selection
// ============================
// The array that will hold the genarated enemy
let versus = [];
// enemy genarator
let monsterGeny = () => {
    let y = 1
    for (let i = 0; i < y; i++) {
        let x = randE()
        versus.push(new Enemy(enemyNames[x].name, enemyNames[x].image, enemyNames[x].snaps))
    }
    return versus;
}

// ===========================
// ========== FIGHT LOOP AND ACTIONS
// ===========================
const isGameOver = (health) => {
    return health <= 0;
}

let fight = () => {
    fightclub()
    document.getElementById("ooc").style.display="none";
    document.getElementById("combat").removeAttribute("style");
    document.getElementById("ene2").removeAttribute("style");
    monsterGeny()
    enemyImage.style.backgroundImage = versus[0].image;
    gameMessage.innerText = versus[0].snaps[randN0(4)];
         
    }
// Players attack and computer's reaction
const attack = (x) => {
    let attackButton = document.getElementsByClassName('attack-btn')
    let continueButton = document.getElementById("continue-button"); 
    
    x(versus[0])
    
    if (isGameOver(versus[0].health)){
        endFight("Ramesses Wins")
        return
    }

    attackButton.disabled= true;
    setTimeout(() => {
        gameMessage.innerText = "opponent is about to strike!"
    }, 2500);
    setTimeout(() => {
        badAi(versus[0])
        if (isGameOver(Ramesses.health)) {
            endgame("game Over")
        return
        }
        attackButton.disabled = false;
    }, 4000);
    
}

const endFight = (message) => {
    document.getElementById('hud').innerText = message;
    setTimeout(() => {
        document.getElementById('hud').innerText = "Seefoo always say: " + seeFoo[randN0(7)]
    }, 900);
    setTimeout(() => {
        grandMaster()
        document.getElementById("ooc").removeAttribute("style")
        document.getElementById("combat").style.display="none";
        showTextNode(nextTextNodeId++)
        
    }, 7000);
    document.getElementsByClassName('attack-btn').hidden = true;
    document.getElementById("continue-button").hidden = false;
}

// going to be the game over screen
// const restart = () => {
//     let attackButton = document.getElementsByClassName('attack-btn');
//     Ramesses.health = Ramesses.orighealth;
//     document.getElementById('hud').innerText = "";
//     attackButton.disabled = false;
//     attackButton.hidden = false;
//     document.getElementById("continue-button").hidden = true;
// }

// ======================== 
// ============== Text and navigator for Game
// ========================

const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('selectBox')
// labels the objects by ID
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
// state checker
let showOption = (option) => {
    return option.requiredState ==null || option.requiredState(state)
}
// the first game restarter
let selectOption = (option) => {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}
// THE TEXT AND EVERYTHING THAT IS!
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
        text: "His dojo master demands Ramses and his remaining oath brother, known as “Anchor of the Unmoored kingdom“ stay in the orphanage dojo; “Anyone weak enough to be taken deserves their fate” he says.",
        sideEffect: () => {
            npcs[0].style.backgroundImage = "url('assets/Shifu.jpg')"
            npcs[0].style.opacity = "0.8";
        },
        options: [
            {
                text: "Continue",
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: "Ignoring their master’s words, the two of them head to the abandoned Harriet Stowe Housing community or what the local’s called “Tom’s Projects” to face off against the Raptures Wronged gang to get their brother back tonight or die trying. Ramesses ~I told you that you didn’t have to come, see foo’s gonna come down on me for this.~",
        sideEffect: () => {
            npcs[0].style.backgroundImage = "none"
            bGI[0].style.backgroundImage = "url('assets/mainbuilding.png')";
        },
        options: [
            {
                text: "Continue",
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: "Oath Bother ~You knew I wasn’t going to listen to your punk ass.~ The two oath brothers stand at the heavy metal magnetically locked door of the project building. As they prepare to enter the building, the sound of vehicles pulling up draws their attention. Members of the Raptures Wronged slowly stepped out of the cars and off motorcycles. As the two prepare to face them, a buzzing comes from the door.",
        sideEffect: () => {

            fight()
        },
        options: [
            {
                text: "Continue",
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: "Oath Brother ~Go, get Eclipsing Moon. I’ll keep your back free and clear.~ The Raptures Wronged ~Get away from th-~. You watch as Unmoored Anchor leaps onto the massed numbers and with steel nerves, you open the building security door and walk away from the sounds of fists and screams. You cannot let doubt slow you down now. Trusting in the oath you three swore at your ex-girl, Brenda's house, you enter the lair of the Raptures Wronged.",
        sideEffect: () => {
            bGI[0].style.backgroundImage = "url('assets/greydoor.png')"
            bGI[0].style.backgroundColor = "brown"
        },
        options: [
            {
                text: "Continue",
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: "Stretching out before you is the broken down lobby of the project building. A wall of what was once mailboxes to your right and a graffiti covered wall to your left. In front of you, the remains of a second security door that is folded in on itself like cardboard. Past the front door there is a wider space, an elevator; bombed with graffiti from squatters from days gone by is before you.",
        sideEffect: () => { // place the elevator backgroound
            bGI[0].style.backgroundImage = "url('assets/BGe.png')"
        },
        options: [
            {
                text: "Continue",
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        text: "A winding staircase of faux marble is covered with a layer of dust with footprints marking the passing of people and of the five apartments on this first floor only three of them have doors.",
        sideEffect: () => {
            bGI[0].style.backgroundImage = "url('assets/BG5.jpg')";
            npcs[0].style.backgroundImage = "none";
        },
        options:[
            {
                text: "Door One",
                nextText: 9
            },
            {
                text: "Door Two",
                nextText: 10
            },
            {
                text: "Door Three",
                nextText: 14
            }
        ]
    },
    {
        id: 9,
        text: "Ramesses~What kind of jive ass, silly, sad sack, narrow assed attempt at security is this?~ you think as you press the door open with your bat. Inside the bombed out room a woman sits on stacks of magazine, she looks up startled when you enter. Ruby~ Who are you?!",
        sideEffect: () => { // add first person 
            bGI[0].style.backgroundImage = "url('assets/floor1R1.jpg')"
            
            setTimeout(() => {
                npcs[0].style.backgroundImage = "url('assets/Ruby.jpg')"
            }, 2000);
        },
        options: [
            {
                text: "I'm a new member", // I know all the members because I give them their tats
                nextText: 12
            },
            {
                text: "I am Ramesses.", // You say it like it means something.
                nextText: 13
            },
            {
                text: "close door and walk away",
                nextText: 8

            }
        ]
    },
    {
        id: 10,
        text: "The sounds of vermin attempting to get away from you as you force open the door alerts you to the fact that you’re not alone here. The vermin whips around with weapon in hand. That punk Eclipse said somebody would be dumb enough to try and save him. ",
        sideEffect: () => {
            bGI[0].style.backgroundImage = "url('assets/room2.jpg')"
        },
        options: [
            {
                text: "Fight!",
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: "Now you know you're in the right place. Don't know if Eclipse's fat mouth is still shooting off. But they're all gonna pay for their Transgressions. ",
        sideEffect: () => {
            fight()
        },
        options: [
            {
                text: "Search the room and the knocked out sucka",
                nextText: 12
            },
            {
                text: "Go back to the Hallway",
                nextText: 8
            }
        ]
    },
    {
        id: 12,
        text: "Nothing of use in this wreckage but the punk on the floor had a pocket full of candy.",
        options: [
            {
                text: "Back to hallway",
                nextText: 8
            }
        ]
    },
    {
        id: 13,
        text: "",
        options: [
            {

            }
        ]
    },
    {
        id: 14,
        text: "Boos Fight",
        options: [
            {

            }
        ]
    }
]


let music = document.getElementById("flash");
let battleMusic = document.getElementById("lines")
let grandMaster = () => {
    battleMusic.pause()
    music.play()
}
let fightclub = () => {
    music.pause()
    battleMusic.play()
}

/// ==========================
/// ================Beginning of Game 
/// ==========================
let startGame = () => {
    // state = {shifu: false};
    grandMaster()
    document.getElementById("combat").style.display="none";
    document.getElementById("ooc").removeAttribute("style");
    bGI[0].style.backgroundImage = "url('assets/startBG11.jpg')"
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