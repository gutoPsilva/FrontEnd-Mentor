const billAmountElement = document.querySelector('#inputBill');
const customTipElement = document.querySelector('#customTip');
const numberPeopleElement = document.querySelector('.inputPeople');
const tipButtonElements = document.querySelectorAll('.tip-button');
const tipAmountElement = document.querySelector('#tipPerPerson');
const totalAmountElement = document.querySelector('#totalPerPerson');
const resetBtn = document.querySelector('#resetBtn');
let nBill = 0;
let nTip = 0;
let nPeople = 0;

// função para limpar todos os botões tip que estejam selecionados
const clearTipBtnsStyles = () => {
  tipButtonElements.forEach(button => button.classList.remove('selected-tip'));
};

// função verifica se o botão está ativo ou não e apenas altera seu visual
const checkBtnStatus = () => {
  if(nBill || nTip || nPeople){
    resetBtn.style.opacity = '1';
    resetBtn.style.cursor = 'pointer';
  }else{
    resetBtn.style.opacity = '.3'
    resetBtn.style.cursor = 'default';
  }
};

const resetAll = () => {
  nBill = 0;
  nTip = 0;
  nPeople = 0;
  billAmountElement.value = '';
  customTipElement.value = '';
  numberPeopleElement.value = '';
  tipAmountElement.textContent = '$0.00';
  totalAmountElement.textContent = '$0.00';
  numberPeopleElement.classList.remove('error-input');
  document.querySelector('.error-people').style.opacity = '0';
};

const calculateTips = () => {
  if(!Number.isInteger(nPeople)){
    alert('Number of People must be an integer');
    return;
  }

  if(nBill < 0 || nTip < 0){ // evitar negativos no amount
    alert('Bill & tips must be atleast 0');
    return;
  }

  if(nBill && nPeople > 0){ // bill e nPeople > 0 é obrigatório para fazer o cálculo, tips não
  
    // variáveis só chegam aqui se forem positivas
    const tipAmount = nBill * (nTip/100) / nPeople;
    const totalAmount = (nBill / nPeople) + tipAmount;
    // um número maior que 99999.99 quebra a formatação do design, e é surreal que alguma conta com doações chegue próximo a esse valor
    if(tipAmount >= 99999.99 || totalAmount >= 999999.99){
      alert('The tip amount/total is too big to fit on this calculator.');
      resetAll();
      return;
    }
    tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
  }
};

billAmountElement.addEventListener('change', () => {
  nBill = Number(billAmountElement.value);
  checkBtnStatus();
  calculateTips();
});

customTipElement.addEventListener('change', () => {
  nTip = Number(customTipElement.value);
  clearTipBtnsStyles();
  checkBtnStatus();
  calculateTips();
});

// verificar se algum dos botões de tip foi acionado e atualizar o valor
tipButtonElements.forEach(button => {
  button.addEventListener('click', () =>{
    clearTipBtnsStyles();
    button.classList.add('selected-tip');
    customTipElement.value = '';
    nTip = Number(button.value);
    checkBtnStatus();
    calculateTips();
  });
});

numberPeopleElement.addEventListener('change', () => {
  nPeople = Number(numberPeopleElement.value);
  // apenas deixar visivel a msg de erro ou não, validação para cálculo é feito no calculateTips()
  if(nPeople <= 0){
    numberPeopleElement.classList.add('error-input');
    document.querySelector('.error-people').style.opacity = '1';
  } else{
    numberPeopleElement.classList.remove('error-input');
    document.querySelector('.error-people').style.opacity = '0';
  }
  checkBtnStatus();
  calculateTips();
});

resetBtn.addEventListener('click', () => {
  resetAll();
  clearTipBtnsStyles();
  checkBtnStatus();
});