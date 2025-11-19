const whatsthehezag = document.querySelector("#time");
const enemy = document.querySelector("#enemy");
const word = document.querySelector("#word");
const mugiInGame = document.querySelector(".mugiInGame");

const words = ["TANK", "PISTOL", "AXE", "SWORD", "GRENADE", "KNIFE", "MILITARY",
               "PILLOW", "ROCK", "TOUCH", "LASER", "DOG", "THUNDER", "FIREBALL",
               "ICESPIKES", "STICK", "KICK", "PUNCH", "LASEREYE", "LOVE", "HUG",
               "STAB", "DODGE", "NIPPLETWIST"]; //HEAL
const enemys = ["tank", "goblin", "alienGorilla", "monster", "bunny", "cat", "asgore",
                "something", "bat", "pigman", "gus", "walter", "nyan"];

const pauseBtn = document.querySelector(".pause");
const difficultyBtn = document.querySelector(".difficulty");

const hp = document.querySelector(".hp");

const menu = document.querySelector("#menu");
const game = document.querySelector("#game");
const instruction = document.querySelector("#instruction");
const pause = document.querySelector("#pause");
const gameOver = document.querySelector("#gameOver");
const registerLogIn = document.querySelector("#registerLogIn");
const leaderboard = document.querySelector("#leaderboard");

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
    wordText.firstChild.innerHTML = randomWord;
    wordText.innerHTML += "!";
    for(let i = 0; i < randomWord.length; i++)
    {
        let current = document.createElement("div");
        let currentStyle = current.style;

        currentStyle.display = "flex";
        currentStyle.width = "4vw";
        currentStyle.height = "4vw";
        currentStyle.margin = "0px 0.5vw 1em";
        currentStyle.borderStyle = "solid";
        currentStyle.borderWidth = "0.35em";
        currentStyle.borderRadius = "1em";
        currentStyle.borderColor = "rgb(202, 104, 34)";
        currentStyle.justifyContent = "center";
        currentStyle.alignItems = "center";
        currentStyle.backgroundColor = "rgb(250, 201, 127)";
        
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

function SavePoints()
{
    const formData = new FormData();
    formData.append("username", document.querySelector(".username").innerText.split(" ")[1]);
    formData.append("points", points);

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

function LeaderBoard()
{
    fetch('leaderboard.php', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        console.log("asd");

        const leaderboard = document.querySelector(".leaderboard");

        leaderboard.innerHTML = "";
        
        for (let i = 0; i < data.length; i++)
            leaderboard.innerHTML += `<p>${data[i].username}\t${data[i].points}</p>\n`;
    })

    menu.style.display = "none";
    leaderboard.style.display = "flex";
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
        case ("home"):
            pause.style.display = "none";
            gameOver.style.display = "none";
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
            LeaderBoard();
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
            letter.style.color = "rgba(117, 55, 13, 1)";
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
                    points += Math.floor((Number)(whatsthehezag.style.width.substring(0,whatsthehezag.style.width.length-1)));
                    pointsText.lastChild.innerHTML = points;
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