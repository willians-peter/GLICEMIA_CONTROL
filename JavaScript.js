const menuHamburguer = document.querySelector('.menu-hamburguer');
const menuItens = document.querySelector('.menu-itens');

menuHamburguer.addEventListener('click', () => {
  console.log('Botão de hambúrguer clicado!');
  menuItens.classList.toggle('menu-aberto');
  if (menuItens.classList.contains('menu-aberto')) {
    console.log('Menu está aberto!');
  } else {
    console.log('Menu está fechado!');
  }
});

// Funcionalidade para abrir submenus ao passar o mouse (para desktop) e ao clicar no item (para dispositivos móveis)
document.querySelectorAll('nav li').forEach((li) => {
  li.addEventListener('mouseover', () => {
    if (window.innerWidth > 768) {
      li.querySelector('ul').style.display = 'block';
    }
  });
  li.addEventListener('mouseout', () => {
    if (window.innerWidth > 768) {
      li.querySelector('ul').style.display = 'none';
    }
  });
  li.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      const submenu = li.querySelector('ul');
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }
  });
});

// Indicador visual para o item atualmente selecionado pelo usuário
document.querySelectorAll('.menu-itens a').forEach((a) => {
  a.addEventListener('click', () => {
    document.querySelectorAll('.menu-itens li').forEach((li) => {
      li.classList.remove('ativo');
    });
    a.parentNode.classList.add('ativo');
  });
});

// Fechamento automático de outros submenus ao abrir um novo
document.querySelectorAll('nav li').forEach((li) => {
  li.addEventListener('click', () => {
    document.querySelectorAll('nav li ul').forEach((submenu) => {
      if (submenu !== li.querySelector('ul')) {
        submenu.style.display = 'none';
      }
    });
  });
});
document.getElementById("mensagem").innerHTML = "Sua mensagem aqui!";

// MANUTENÇÃO


// INICIO
const calcularButton = document.getElementById("calcular");
if (calcularButton) {
  calcularButton.addEventListener("click", function() {
  document.getElementById("calcular").addEventListener("click", function() {
  const valorHGTinicio = parseFloat(document.getElementById("valorHGTinicio").value);

  if (valorHGTinicio > 300) {
    const bolusInicial = Math.round(valorHGTinicio * 10) / 10;
    const bolusArredondado = Math.round(bolusInicial * 2) / 2;
    document.getElementById("mensagem").innerHTML = `Bolus inicial: ${bolusArredondado}`;
  } else {
    const bolusInicial = valorHGTinicio / 100;
    const bolusArredondado = Math.round(bolusInicial * 2) / 2;
    document.getElementById("mensagem").innerHTML = `Bolus inicial: ${bolusArredondado}`;
  }
});
  });
}


//VALOR INICIO  "valorHGTinicio"/100= SE ACIMA 300 BOLUS INICIAL = "valorHGTinicio" (ARREDONDAR VALOR EM UMA CASA DECIMAL SOMENTE 0,5 A ASSIM EM DIANTE)
// RELIGAR