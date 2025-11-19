let nextBtn;

document.querySelector(".submit").addEventListener('click', e => {
    e.preventDefault();

    const formData = new FormData(document.querySelector(".post"));

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => Decode(data, formData));
})

function SetMenu(formData)
{
    const username = document.querySelector(".username");
    username.innerHTML = "User: " + formData.get("username");
    username.style.display = "block";
    Menu();
}

function Decode(data, formData)
{
    const response = document.querySelector(".response")

    if (data.success === false || data.new !== null)
    {
        response.innerHTML = data.message;
        response.style.display = "flex";
        response.style.flexDirection = "column";
    }
    if (data.success === true)
    {
        response.innerHTML += '<button type="button" id="next" style="width: 8vw; height: 2.5vw;">Next</button>';
        document.querySelector("#next").addEventListener('click', () => {
            SetMenu(formData);
        });
    }else if (data.new === true)
    {
        response.innerHTML += '<button type="button" id="next" style="width: 8vw; height: 2.5vw;">Next</button>';
        document.querySelector("#next").addEventListener('click', () => {
            fetch("register.php", {
                method: 'POST',
                body: formData
            })
            SetMenu(formData);
        });
    }
}