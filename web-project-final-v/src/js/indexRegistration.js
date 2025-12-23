// userAuth is global now
const regInput = document.getElementsByClassName("regInput");
const regBtn = document.getElementById("regBtn");
const regInputArray = Array.from(regInput);


const validationRegex = {
    fullName: /^[A-Za-z ]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    username: /^[A-Za-z0-9_]{4,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
};


function validateRegistrationInputs() {

    if (regInputArray.length < 5) {
        alert("Not enough input elements found");
    }

    const [fullNameInput, emailInput, usernameInput, passwordInput, confirmPasswordInput] = regInputArray;

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;



    const isFullNameValid = validationRegex.fullName.test(fullName);
    const isEmailValid = validationRegex.email.test(email);
    const isUsernameValid = validationRegex.username.test(username);
    const isPasswordValid = validationRegex.password.test(password);
    const isConfirmPasswordValid = password === confirmPassword && confirmPassword !== '';


    const allValid = isFullNameValid && isEmailValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid;
    console.log("All valid:", allValid);

    regBtn.disabled = !allValid;

    updateFieldStyle(fullNameInput, isFullNameValid);
    updateFieldStyle(emailInput, isEmailValid);
    updateFieldStyle(usernameInput, isUsernameValid);
    updateFieldStyle(passwordInput, isPasswordValid);
    updateFieldStyle(confirmPasswordInput, isConfirmPasswordValid);
}

function updateFieldStyle(input, isValid) {
    if (input.value.trim() === '') {
        input.classList.remove("valid", "invalid");
    } else if (isValid) {
        input.classList.remove("invalid");
        input.classList.add("valid");
    } else {
        input.classList.remove("valid");
        input.classList.add("invalid");
    }
}

regInputArray.forEach((input, index) => {
    input.addEventListener("input", validateRegistrationInputs);
});

regBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const user = {
        fullName: regInputArray[0].value.trim(),
        email: regInputArray[1].value.trim(),
        userName: regInputArray[2].value.trim(),
        password: regInputArray[3].value.trim(),
        password1: regInputArray[4].value.trim(),
    }
    userAuth.push(user);
    localStorage.setItem("userAuth", JSON.stringify(userAuth))
    alert("Registration Successful!");
    location.href = "./auth.html"

});

document.getElementById("back-log-in").addEventListener("click", () => {
    location.href = "./auth.html";
});



