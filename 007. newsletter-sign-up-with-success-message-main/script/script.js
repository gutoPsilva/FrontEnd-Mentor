const formElement = document.getElementById("form");
const checkEmail = (event) => {
  event.preventDefault();
  
  const inputEmail = document.getElementById("email");
  const emailAdress = inputEmail.value;
  const alertMsg = document.querySelector('.wrong-msg');

  if(!emailAdress.includes('@') || !emailAdress.includes('.')){ // ao menos @ e . no string do email
    alertMsg.style.opacity = 1;
    inputEmail.classList.add('wrong-email');
    return;
  }
  else{
    alertMsg.style.opacity = 0;
    inputEmail.classList.remove('wrong-email');
    document.querySelector(".sign-up-form").style.opacity = 0; // 
    setInterval(() => {
      document.querySelector(".sign-up-form").style.display = 'none';
      document.querySelector(".sucess-message").style.display = 'flex';
    }, 500); // intervalo de 500ms pois é o tempo da transition da opacity do sign-up-form, sem esse intervalo não tem um fade-away linear, ele some de uma vez
    setInterval(() => document.querySelector(".sucess-message").style.opacity = 1, 900); // 500ms por conta da transition do sign-up-form + 400 ms para ter um fade-in linear
    document.getElementById('js-email').textContent = `${emailAdress}`;
  }
};

document.body.addEventListener('keyup', (event) => {
  if(event.key == 'Enter'){
    checkEmail(event);
  }
});

formElement.addEventListener('submit', (event) => {
  checkEmail(event);
});