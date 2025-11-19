document.querySelector(".leaderboardBtn").addEventListener('click', e => {

    fetch('leaderboard.php', {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
        console.log("asd");

        const leaderboard = document.querySelector(".leaderboard");
        
        for (let i = 0; i < data.length; i++)
            leaderboard.innerHTML += `<p>${data[i].username}\t${data[i].points}</p>\n`;
    })
})