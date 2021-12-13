const ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 20;
const STRONG_MONSTER_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const userInput = prompt(
  "Enter the Maximum health of player and monster should have.",
  "100"
);

let chosenMaxLife = parseInt(userInput);
let battlelog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealt = chosenMaxLife;
let currentPlayerHealt = chosenMaxLife;
let bonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry;
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealt: monsterHealth,
      finalPlayerHealt: playerHealth,
    };
    battlelog.push(logEntry);
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "MONSTER",
      finalMonsterHealt: monsterHealth,
      finalPlayerHealt: playerHealth,
    };
    battlelog.push(logEntry);
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealt: monsterHealth,
      finalPlayerHealt: playerHealth,
    };
    battlelog.push(logEntry);
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealt: monsterHealth,
      finalPlayerHealt: playerHealth,
    };
    battlelog.push(logEntry);
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: "PLAYER",
      finalMonsterHealt: monsterHealth,
      finalPlayerHealt: playerHealth,
    };
    battlelog.push(logEntry);
  }
}

function reset() {
  currentMonsterHealt = chosenMaxLife;
  currentPlayerHealt = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealt = currentPlayerHealt;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealt -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealt,
    currentPlayerHealt
  );

  if (currentPlayerHealt <= 0 && bonusLife) {
    bonusLife = false;
    removeBonusLife();
    currentPlayerHealt = initialPlayerHealt;
    alert("You was going to die your bonus life save you");
    setPlayerHealth(initialPlayerHealt);
  }

  if (currentMonsterHealt <= 0 && currentPlayerHealt > 0) {
    alert("You Won!!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealt,
      currentPlayerHealt
    )
  } else if (currentPlayerHealt <= 0 && currentMonsterHealt > 0) {
    alert("You Lost");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonsterHealt,
      currentPlayerHealt
    )
  } else if (currentMonsterHealt <= 0 && currentPlayerHealt <= 0) {
    alert("Draw!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonsterHealt,
      currentPlayerHealt
    )
  }

  if (currentMonsterHealt <= 0 || currentPlayerHealt <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_MONSTER_ATTACK_VALUE;
  let logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : STRONG_MONSTER_ATTACK_VALUE;
  
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_MONSTER_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }

  writeToLog(
    logEvent,
    maxDamage,
    currentMonsterHealt,
    currentPlayerHealt
  )

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealt -= damage;
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackMonster() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    HEAL_VALUE,
    currentMonsterHealt,
    currentPlayerHealt
  )
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealt += HEAL_VALUE;
  endRound();
}

function printLogHandler() {
  console.log(battlelog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackMonster);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
