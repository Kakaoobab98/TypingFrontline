
const whatsthehezag = document.querySelector("#time");
const enemy = document.querySelector("#enemy");
const word = document.querySelector("#word");
const mugiInGame = document.querySelector(".mugiInGame");

const words = ["TANK", "PISTOL", "AXE", "SWORD", "GRENADE", "KNIFE", "MILITARY",
               "PILLOW", "ROCK", "TOUCH", "LASER", "DOG", "THUNDER", "FIREBALL",
               "ICESPIKES", "STICK", "KICK", "PUNCH", "LASEREYE", "LOVE", "HUG",
               "STAB", "DODGE", "NIPPLETWIST", "HEAL", "HAMMER", "CROSSBOW", "SPEAR",
               "SHURIKEN", "BAZOOKA", "FLAMETHROWER", "SHOTGUN", "SNIPER", "MINIGUN", "MACE",
               "SPIKEBALL", "WHIP", "CHAINSAW", "DRILL", "TRIDENT", "CATAPULT", "FIRESTORM",
               "EARTHQUAKE", "FLAMEBURST", "TORNADO", "BLIZZARD", "METEOR", "POISONCLOUD", "HEADBUTT",
               "ELBOW", "SLAP", "SUPLEX", "BODYSLAM", "CHOKEHOLD", "SKINNING", "TICKLE",
               "YEET", "BONK", "BOOP"];
const enemys = ["tank", "goblin", "alienGorilla", "monster", "bunny", "cat", "asgore",
                "something", "bat", "pigman", "gus", "walter", "nyan", "signora",
                "beato", "krubi", "darthvader", "edikristaqrama", "koala", "jesus", "labubu",
                "job", "dementor", "spider", "putin", "trump", "tralalero", "tuba",
                "tung", "voldemort", "ericcartman", "george"];

const pauseBtn = document.querySelector(".pause");
const difficultyBtn = document.querySelector(".difficulty");

const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");

const hp = document.querySelector(".hp");

const menu = document.querySelector("#menu");
const game = document.querySelector("#game");
const instruction = document.querySelector("#instruction");
const pause = document.querySelector("#pause");
const gameOver = document.querySelector("#gameOver");
const registerLogIn = document.querySelector("#registerLogIn");
const leaderboard = document.querySelector("#leaderboard");
const warning = document.querySelector(".warning");

const wordText = document.querySelector("#wordText");
const pointsText = document.querySelector("#points");

const difficulty = ["EASY", "MEDIUM", "HARD"];

////////////////////////////////////////////////


let hpValue = 3;
let progress = 1;
let start = 100;
let currentLetterIndex = 0;
let started = false;
let randomWord = "";
let difficultyIndex = 0;
let points = 0;
let skinName = "";

let timer = null;
let enemyTimer = null;

let enemyWidth = 0;
enemy.width = enemyWidth;

let dodge = false;
let heal = false;


////////////////////////////////////////////////


function Timer()
{
    if (start <= 0)
        {
            clearInterval(timer);
            clearInterval(enemyTimer);
            LoseHp();
        }
    start -= progress/50;
    whatsthehezag.style.width = start + "%";
}

function EnemyApproach()
{
    if ((Number)(enemy.getAttribute("width").substring(0,enemy.getAttribute("width").length-1)) >= 25) clearInterval(enemyTimer);
    enemyWidth += progress/8;
    enemy.setAttribute("width", enemyWidth + "%");
}

function CreateWord()
{
    randomWord = words[Math.floor(Math.random() * words.length)];
    if (randomWord === "DODGE")dodge = true;
    else if (randomWord === "HEAL")heal = true;
    wordText.firstChild.innerHTML = randomWord;
    wordText.innerHTML += "!";
    for(let i = 0; i < randomWord.length; i++)
    {
        let current = document.createElement("div");
        let currentStyle = current.style;

        currentStyle.display = "flex";
        currentStyle.width = "3.2vw";
        currentStyle.height = "3.2vw";
        currentStyle.margin = "0px 0.5vw 1em";
        currentStyle.borderStyle = "solid";
        currentStyle.borderWidth = "0.35em";
        currentStyle.borderRadius = "1em";
        currentStyle.borderColor = "rgb(202, 104, 34)";
        currentStyle.justifyContent = "center";
        currentStyle.alignItems = "center";
        currentStyle.backgroundColor = "rgb(250, 201, 127)";
        currentStyle.fontSize = "0.8em";
        
        word.appendChild(current);
    }
}

function SetDefaults()
{
    if (timer) clearInterval(timer);
    if (enemyTimer) clearInterval(enemyTimer);
    started = false;
    currentLetterIndex = 0;
    start = 100;
    enemyWidth = 0;
    enemy.width = enemyWidth;
    whatsthehezag.style.width = start + "%";
    word.innerHTML = "";
    document.querySelector("h1").style.visibility = "visible";
}

function Start()
{
    hpValue = 3;
    progress = (difficultyIndex+1)*1.5;
    points = 0;
    pointsText.lastChild.innerHTML = points;
    menu.style.display = "none";
    gameOver.style.display = "none";
    SetDefaults();
    SetHp();
    Game();
}

function SetHp()
{
    hp.innerHTML = "";
    for(let i = 0; i < 3; i++)
    {
        let current = document.createElement("div");
        let currentStyle = current.style;

        currentStyle.backgroundImage = "url(media/hp.png)";
        currentStyle.width = "4vw";
        currentStyle.height = "4vw";
        currentStyle.margin = "0px 0.5vw 1em";
        currentStyle.backgroundSize = "contain";
        currentStyle.backgroundRepeat = "no-repeat";
        currentStyle.imageRendering = "pixelated";
        
        hp.appendChild(current);
    }
}

function RandomEnemy()
{
    enemy.src = "media/" + enemys[Math.floor(Math.random() * enemys.length)] + ".png";
}

function Game()
{
    RandomEnemy();
    CreateWord();
    mugiInGame.src = "media/" + skinName + "Pointing.png";
    started = true;
    pauseBtn.style.opacity = "1";
    pauseBtn.disabled = false;
    game.style.display = "flex";
    timer = setInterval(Timer, 5);
    enemyTimer = setInterval(EnemyApproach, 50); 
}

function Instruction()
{
    menu.style.display = "none";
    instruction.style.display = "flex";
}

function Menu()
{
    registerLogIn.style.display = "none";
    menu.style.display = "flex";
}

function Back()
{
    instruction.style.display = "none";
    game.style.display = "none";
    leaderboard.style.display = "none";
    menu.style.display = "flex";
}

function Resume()
{
    pause.style.display = "none";
    timer = setInterval(Timer, 5);  
    enemyTimer = setInterval(EnemyApproach, 50);
}

function Pause()
{
    clearInterval(enemyTimer);
    clearInterval(timer);
    pause.style.display = "flex";
}

function GameOver()
{
    clearInterval(timer);
    clearInterval(enemyTimer);
    document.querySelector("#points2").children.item(0).innerText = points;
    SavePoints();
    gameOver.style.display = "flex";
}

function PreHome()
{
    warning.style.display = "flex";
}

function Home()
{
    pause.style.display = "none";
    gameOver.style.display = "none";
}

function SavePoints()
{
    const formData = new FormData();
    formData.append("username", document.querySelector(".username").innerText.split(" ")[1]);
    formData.append("points", points);
    formData.append("difficulty", difficultyIndex)

    fetch('save_points.php', {
        method: 'POST',
        body: formData
    })
}

function NextRound()
{
    SetDefaults();
    mugiInGame.src = "media/" + skinName + "Back.png";
    wordText.innerHTML = "<p></p>";
    pauseBtn.style.opacity = "0.5";
    pauseBtn.disabled = true;
    console.log(progress);
    this.setTimeout(Game, 3000);
}

function LoseHp()
{
    hpValue--;
    hp.children.item(hpValue).style.backgroundImage = "url(media/hpLost.png)";
    if (hpValue <= 0)
    {
        started = false;
        GameOver();
    }else
    {
        NextRound();
    }
}

function GainHp()
{
    if ((hpValue+1) <= 3)
    {
        hpValue++;
        hp.children.item(hpValue-1).style.backgroundImage = "url(media/hp.png)";
    }
}

function ChangeDifficulty()
{
    difficultyIndex++;
    if(difficultyIndex >= 3) difficultyIndex = 0;
    difficultyBtn.lastChild.innerText = difficulty[difficultyIndex];
}

function SwitchSkin()
{
    if (skinName === "mugi")
    {
        skinName = "wojak";
        document.querySelector("#wrapper").style.left = "0%";
    }
    else
    {
        skinName = "mugi";
        document.querySelector("#wrapper").style.left = "1%";
    }
    SetSkin();
}

function SetSkin()
{
    mugiInGame.src = "media/" + skinName + "Back.png";
    mugiInGame.src = "media/" + skinName + "Pointing.png";
    document.querySelector(".mugiCry").src = "media/" + skinName + "Cry.png";
}

function LeaderBoard(func)
{
    const formData = new FormData();
    formData.append("difficulty", func);

    fetch('leaderboard.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(items => {

        const table = document.querySelector(".table");
        const currentUsername = document.querySelector(".currentUsername").innerHTML;

        table.innerHTML = `<thead><tr><th>NAMES</th><th>POINTS</th><th>DATE</th></tr></thead>`;
 
        for (const item of items)
        {
            if (item.username === currentUsername)
            {
                table.innerHTML += `<tbody><tr class="currentBg"><td>${item.username}</td><td>${item.points}</td><td>${item.date}</td></tr></tbody>`;
            }else
            {
                table.innerHTML += `<tbody><tr><td>${item.username}</td><td>${item.points}</td><td>${item.date}</td></tr></tbody>`;
            }
        }

    })

    menu.style.display = "none";
    leaderboard.style.display = "flex";
}

function Difficulty(diffIndex)
{
    easy.disabled = false;
    medium.disabled = false;
    hard.disabled = false;

    easy.style.opacity = 1;
    medium.style.opacity = 1;
    hard.style.opacity = 1;

    switch(diffIndex)
    {
        case 0:
            easy.disabled = true;
            easy.style.opacity = 0.5;
            break;
        case 1:
            medium.disabled = true;
            medium.style.opacity = 0.5;
            break;
        case 2:
            hard.disabled = true;
            hard.style.opacity = 0.5;
            break;
    }

    return diffIndex;
}

////////////////////////////////////////////////


document.body.addEventListener("click", (e) => {
    switch (e.target.className)
    {
        case ("start"):
            Start();
            break;
        case ("instruction"):
            Instruction();
            break;
        case("preHome"):
            PreHome();
            break;
        case("backHome"):
            warning.style.display = "none";
            break;
        case ("home"):
            Home();
        case ("back"):
            Back();
            break;
        case ("pause"):
            Pause();
            break;
        case ("resume"):
            Resume();
            break;
        case ("restart"):
            Start();
            break;
        case ("difficulty"):
            ChangeDifficulty();
            break;
        case ("switch"):
            SwitchSkin();
            break;
        case ("leaderboardBtn"):
        case ("easy"):
            LeaderBoard(Difficulty(0));
            break;
        case ("medium"):
            LeaderBoard(Difficulty(1));
            break;
        case ("hard"):
            LeaderBoard(Difficulty(2));
            break;
    }
})

addEventListener("keydown", function(e)
{
    if (started && pause.style.display !== "flex" && e.key.toLowerCase() !== e.key.toUpperCase())
    {
        if (e.key.length == 1)
        {
            let letter = this.document.createElement("p");
            letter.style.fontWeight = "bold";
            letter.style.fontSize = "3em";
            letter.style.color = "rgb(89, 41, 7)";
            letter.innerText = e.key.toUpperCase();

            if(currentLetterIndex < word.children.length)
            {
                word.children.item(currentLetterIndex).appendChild(letter);
                currentLetterIndex++;
            }
            if (currentLetterIndex === word.children.length)
            {
                let typed = "";
                for (let i = 0; i < word.children.length; i++)
                {
                    typed += word.children.item(i).innerText;
                }
                if (typed === randomWord)
                {
                    progress += 0.2;
                    if (heal) GainHp();
                    else if (!dodge)
                    {
                        points += Math.floor((Number)(whatsthehezag.style.width.substring(0,whatsthehezag.style.width.length-1)));
                        pointsText.lastChild.innerHTML = points;
                    }
                    heal = false;
                    dodge = false;
                    NextRound();
                }else
                {
                    LoseHp();
                }
            }
        }else if (e.key === "Backspace")
        {
            if(currentLetterIndex !== 0)
            {
                currentLetterIndex--;
                currentLetter = word.children.item(currentLetterIndex).innerHTML = "";
            }
        }
    }
});


////////////////////////////////////////////////


SwitchSkin();