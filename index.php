<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <link rel="icon" type="image/x-icon" href="media/icon.png">
        <title>Typing Frontline</title>
    </head>
    <body>
        <main>

            <h1>Typing Frontline</h1>

            <div id="gameSpace">
                <p class="username text"></p>
                <!--GAME-->
                <div id="game" class="scene">

                    <button class="pause">PAUSE</button>

                    <div id="points">Points:<p></p></div>

                    <div id="word"></div>

                    <image id="enemy"></image>

                    <div id="wrapper">
                        <div class="hp"></image></div>
                        <image width="100%" class="mugiInGame"></image>
                        <div id="wordText"><p></p></div>
                    </div>

                    <div id="timeBar">
                        <div id="time">
                        </div>
                    </div>

                </div>

                <!--REGISTER/LOGIN-->
                <div id="registerLogIn" class="scene">
                    <image src="media/logo.png" width="30%" style="margin-bottom: 3%;"></image>
                    <form method="post" class="post">
                        <div style="display: flex; flex-direction: row; justify-content: center; margin-bottom: 10%;">
                            <div class="registerlogin">
                                <label class="label">Username</label>
                                <input type="text" name="username" placeholder="e.g. Horváth Győző" class="logininput" style="margin-bottom:10%;">
                                <label class="label">Password</label>
                                <input type="password" name="password" placeholder="e.g. 2024Matyi" class="logininput" style="border-bottom-right-radius: 0;">
                            </div>
                            <div class="response text">
                                
                            </div>
                        </div>
                        <button class="submit">SUBMIT</button>
                    </form>
                </div>

                <!--MENU-->
                <div id="menu" class="scene">
                    <image src="media/logo.png" width="30%" style="margin-top:-1%;"></image>
                    <button class="start">START</button>
                    <button class="difficulty">DIFFICULTY:<p class="difficulty">EASY</p></button>
                    <button class="instruction">INSTRUCTIONS</button>
                    <button class="leaderboardBtn">LEADERBOARD</button>
                </div>

                <!--GAME OVER-->
                <div id="gameOver" class="scene">
                    <p>GAME OVER</p>
                    <div id="points2">You got <p></p> points</div>
                    <button class="restart">RESTART</button>
                    <button class="home">HOME</button>
                    <image class="mugiCry"></image>
                </div>

                <!--INSTRUCTION-->
                <div id="instruction" class="scene">
                    <div class="text">
                        <h3>1.</h3>
                        <p>Adjust the difficulty based on your preference.</p>
                        <h3>2.</h3>
                        <p>Click the "START" button to start the game.</p>
                        <h3>3.</h3>
                        <p>She will tell you what to type (to counter the attack) within the time limit.</p>
                        <h3>4.</h3>
                        <p>Each correct word decreases the time limit.</p>
                        <h3>5.</h3>
                        <p>You lose a heart for making a mistake or by failing to type the given word within the time limit.</p>
                        <h3>6.</h3>
                        <p>The game ends when you run out of hearts.</p>
                    </div>
                    <image src="media/mugiShows.png" width="20%" class="mugiShows"></image>
                    <button class="back">BACK</button>
                </div>

                <!--PAUSE-->
                <div id="pause" class="scene">
                    <button class="resume">RESUME</button>
                    <button class="switch">SWITCH</button>
                    <button class="home">HOME</button>
                </div>

                <!--LEADERBOARD-->
                <div id="leaderboard" class="scene">
                    <h1>LEADERBOARD</h1>
                    <div class="text leaderboard">
                        
                    </div>
                    <button class="back">BACK</button>
                </div>
            </div>

        </main>
        
    </body>
    <script src="game.js"></script>
    <script src="account.js"></script>
</html>