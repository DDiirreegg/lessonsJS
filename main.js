function wynika() {
  const num1 = parseInt(l1.value);
  const num2 = parseInt(l2.value);
  const num3 = parseInt(l3.value);
  const num4 = parseInt(l4.value);
  
  const sum = num1 + num2 + num3 + num4;
  const sre = sum / 4;
  const min = Math.min(num1, num2, num3, num4);
  const max = Math.max(num1, num2, num3, num4);

  const wynik = document.querySelector('#wyniki')
  wynik.textContent = 'Suma: ' + sum + ', Srednią: ' + sre + ', Min: ' + min + ', Max: ' + max;
}

function updateResults() {
  const num1 = parseInt(l1.value) || 0;
  const num2 = parseInt(l2.value) || 0;
  const num3 = parseInt(l3.value) || 0;
  const num4 = parseInt(l4.value) || 0;
  
  const sum = num1 + num2 + num3 + num4;
  const sre = sum / 4;
  const min = Math.min(num1, num2, num3, num4);
  const max = Math.max(num1, num2, num3, num4);

  wynik.textContent = 'Suma: ' + sum + ', Srednią: ' + sre + ', Min: ' + min + ', Max: ' + max;
}