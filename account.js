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
    username.innerHTML = 'User: <span class="currentUsername">' + formData.get("username") + '</span>';
    username.style.display = "block";
    Menu();
}

function LogOut()
{
    const username = document.querySelector(".username");
    username.innerHTML = "";
    username.style.display = "none";
    document.querySelector(".post").reset();
    Register();
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
        response.innerHTML += '<button type="button" id="next">Next</button>';
        nextBtn = document.querySelector("#next");
        nextBtn.addEventListener('click', () => {
            response.style.display = "none";
            SetMenu(formData);
        });
    }else if (data.new === true)
    {
        response.innerHTML += '<button type="button" id="next">Next</button>';
        nextBtn = document.querySelector("#next");
        nextBtn.addEventListener('click', () => {
            fetch("register.php", {
                method: 'POST',
                body: formData
            })
            response.style.display = "none";
            SetMenu(formData);
        });
    }
    const back = document.createElement("button");
    back.type = "button";
    back.className = "backRegister";
    back.textContent = "Back";

    response.appendChild(back);

    back.addEventListener('click', () => {
        response.style.display = "none";
    })
}