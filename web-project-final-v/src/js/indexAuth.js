let users = JSON.parse(localStorage.getItem("userAuth")) || [];

const authInputs = document.getElementsByClassName("authInput");
const [userInput, passInput] = authInputs;
const signInBtn = document.querySelector(".right button");

signInBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const usernameValue = userInput.value.trim();
    const passwordValue = passInput.value.trim();

    const foundUser = users.find(user =>
        user.userName === usernameValue && user.password === passwordValue
    );

    if (foundUser) {
        console.log("Login Successful!");
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        location.href = "./home.html";
    } else {
        console.log("Invalid username or password!");
    }
});

document.getElementById("sign-up").addEventListener("click", () => {
    location.href = "./registration.html";
});