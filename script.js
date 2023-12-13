let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const locations = [
  {
    name:"town square",
    "button text": ["Go to store","Go to cave","Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text:"You are in the town square bitvh. You see a sign that says 'Store.'"
  },
  {
    name:"store",
    "button text": ["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text:"You are in ali saads store(he is a nassab)"
  },
  {
    name:"cave",
    "button text": ["Fight 7asan asme","Fight fe5ory","Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text:"You are in the cave, you see some monsters"
  },
  {
    name:"fight",
    "button text": ["Attack","Dodge","Run"],
    "button functions": [attack, dodge, goTown],
    text:"You are fighting a monster"
  },
  {
    name:"kill monster",
    "button text": ["Go to town square","Go to town square","Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text:"The monster screams 'ya manyak,ataltne' as it dies. You gain experience points"
  },
  {
    name:"lose",
    "button text": ["REPLAY","REPLAY","REPLAY"],
    "button functions": [restart, restart, restart],
    text:"You died"
  },
  {
    name:"win",
    "button text": ["REPLAY","REPLAY","REPLAY"],
    "button functions": [restart, restart, restart],
    text:"You defeat the lesbain dragon! You win the game now you became the one who is lesbian"
  },
  {
    name:"easter egg",
    "button text": ["2","8","return to town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text:"You find a secret game ya zabre. Pick a number, ten numbers will be randomly generated if its right youll win"
  }
];
const Weapons = [
  {
    name:"stick",
    power:10
  },
  {
    name:"magic stick",
    power:15
  },
  {
    name:"dildo",
    power:25
  },
  {
    name:"magic dildo",
    power:100
  }
];

const monsters = [
  {
    name:"7asan asem",
    level:2,
    health:15
  },
  {
    name:"fe5ory(gay)",
    level:8,
    health:60
  },
  {
    name:"lesbian dragon",
    level:20,
    health:300
  }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations) {
  monsterStats.style.display = "none";
  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button3.innerText = locations["button text"][2];
  button1.onclick = locations["button functions"][0];
  button2.onclick = locations["button functions"][1];
  button3.onclick = locations["button functions"][2];
  text.innerText = locations.text;
}


function goTown() {
  update(locations[0]);
}
function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}


function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You don't have enough gold to buy health.";
  }
}
function buyWeapon() { 
  if (currentWeapon < Weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = Weapons[currentWeapon].name;
      text.innerText = "You bought a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
    text.innerText = "You don't have enough gold to buy a " + Weapons[currentWeapon].name + ".";
    }
  } else{
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold -= 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else{
    text.innerText = "Don't sell your only weapon you dumbass!";
  }
}
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterHealthText.innerText = monsterHealth; 
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
}

function fightSlime() {
  fighting = 0;
  goFight();
}
function fightBeast() {
  fighting = 1;
  goFight();
}
function fightDragon() {
  fighting = 2;
  goFight();
}
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += "you attack it with your " + Weapons[currentWeapon].name + ".";
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += "sebtosh ya 7mar";
  } 
  monsterHealth -= Weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += "Your " + inventory.pop() + " broke, ya 7mar";
    currentWeapon--;
  }
}
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}
function lose() {
  update(locations[5]);
}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
function winGame() {
  update(locations[6]);
}
function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}
function easterEgg() {
  update(locations[7]);
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
function pick(guess) {
  let nums = []
  while (nums.length < 10) {
    nums.push(Math.floor(Math.random() * 11))
  }
  text.innerText = "you picked: " + guess + "\n the random numbers were: \n";
  for (let i = 0; i < 10; i++) {
    text.innerText += nums[i] + "\n";
  }
  if (nums.indexOf(guess) !== -1) {
    text.innerText += "daammmnn rbo7et masare";
    gold += 30;
    goldText.innerText = gold;
  } else {
    text.innerText = "you suck ya 7mar -10 health mazelak hek";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}