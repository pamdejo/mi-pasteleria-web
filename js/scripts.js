const flipCard = document.getElementById('flipCard');
    const registerText = document.getElementById('registerText');
    const loginText = document.getElementById('loginText');

    registerText.addEventListener('click', () => {
        flipCard.style.transform = 'rotateY(180deg)';
    });

    loginText.addEventListener('click', () => {
        flipCard.style.transform = 'rotateY(0deg)';
    });