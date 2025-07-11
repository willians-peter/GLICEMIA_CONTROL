function atualizarDataHora() {
  const agora = new Date();
  const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const opcoesHora = { hour: '2-digit', minute: '2-digit', hour12: false };

  const dataFormatada = agora.toLocaleDateString('pt-BR', opcoesData);
  const horaFormatada = agora.toLocaleTimeString('pt-BR', opcoesHora);

  const diaDaSemana = dataFormatada.split(',')[0];
  const restoDaData = dataFormatada.split(',')[1];

  const dataFormatadaMaiuscula = `${diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1)}${restoDaData}`;

  document.getElementById("data-hora").innerText = `${dataFormatadaMaiuscula} às ${horaFormatada}`;
}

setInterval(atualizarDataHora, 1000); // atualiza a cada segundo
atualizarDataHora(); // chama a função uma vez para inicializar a data e hora

// Chama a função imediatamente para exibir a data e hora iniciais
atualizarDataHora();

// Atualiza a data e hora a cada segundo (1000 milissegundos)
setInterval(atualizarDataHora, 1000);
// AQUI: COLOCAR AS FUNÇÕES calcularUmDelta e calcularDoisDelta NO INÍCIO DO ARQUIVO.
// Elas precisam estar fora de qualquer 'document.addEventListener' para serem acessíveis.

// --- Funções para calcular os valores de Delta com base na Vazão Atual ---
function calcularUmDelta(vazaoAtual) {
    if (vazaoAtual < 3) {
        return 0.5;
    } else if (vazaoAtual >= 3 && vazaoAtual <= 6.9) {
        return 1.0;
    } else if (vazaoAtual >= 7 && vazaoAtual <= 10.9) {
        return 1.5;
    } else if (vazaoAtual >= 11 && vazaoAtual <= 15.9) {
        return 2.0;
    } else if (vazaoAtual >= 16 && vazaoAtual <= 20.9) {
        return 3.0;
    } else if (vazaoAtual >= 21 && vazaoAtual <= 25.9) {
        return 4.0;
    } else if (vazaoAtual > 25) {
        return 'avisar o médico'; // Retorna string quando a vazão for alta para 1 Delta
    }
    return 0; // Valor padrão caso não se encaixe em nenhuma condição
}

function calcularDoisDelta(vazaoAtual) {
    if (vazaoAtual < 3) {
        return 1.0;
    } else if (vazaoAtual >= 3 && vazaoAtual <= 6) {
        return 2.0;
    } else if (vazaoAtual >= 7 && vazaoAtual <= 10) {
        return 3.0;
    } else if (vazaoAtual >= 11 && vazaoAtual <= 15) {
        return 4.0;
    } else if (vazaoAtual >= 16 && vazaoAtual <= 20) {
        return 6.0;
    } else if (vazaoAtual >= 21 && vazaoAtual <= 25) {
        return 8.0;
    } else if (vazaoAtual > 25) {
        return 'avisar o médico'; // Retorna string quando a vazão for alta para 2 Deltas
    }
    return 0; // Valor padrão
}

// --- FIM DAS FUNÇÕES DE DELTA ---

function parseDecimal(value) {
  return parseFloat(value.replace(",", "."));
}

// Funcionalidade para o menu de hambúrguer
const menuHamburguer = document.querySelector('.menu-hamburguer');
const menuItens = document.querySelector('.menu-itens');

// Verifica se os elementos do menu existem antes de adicionar o event listener
if (menuHamburguer && menuItens) {
    menuHamburguer.addEventListener('click', () => {
        console.log('Botão de hambúrguer clicado!');
        menuItens.classList.toggle('menu-aberto');
        if (menuItens.classList.contains('menu-aberto')) {
            console.log('Menu está aberto!');
        } else {
            console.log('Menu está fechado!');
        }
    });
}


// Funcionalidade para abrir submenus (mouseover para desktop, click para mobile)
document.querySelectorAll('nav li').forEach((li) => {
    // Evita erros se não houver um UL dentro do LI
    const submenu = li.querySelector('ul');
    if (submenu) { // Só adiciona listeners se houver um submenu
        li.addEventListener('mouseover', () => {
            if (window.innerWidth > 768) {
                submenu.style.display = 'block';
            }
        });
        li.addEventListener('mouseout', () => {
            if (window.innerWidth > 768) {
                submenu.style.display = 'none';
            }
        });
        li.addEventListener('click', (event) => {
            // Previne o clique no link pai de navegar imediatamente se for um submenu
            if (window.innerWidth <= 768 && !li.querySelector('a[href="#"]') && submenu.children.length > 0) {
                event.preventDefault(); // Impede a navegação se o clique for para abrir/fechar submenu
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
});


// Indicador visual para o item atualmente selecionado
document.querySelectorAll('.menu-itens a').forEach((a) => {
    a.addEventListener('click', () => {
        document.querySelectorAll('.menu-itens li').forEach((li) => {
            li.classList.remove('ativo');
        });
        // Adiciona a classe 'ativo' ao pai <li> do link clicado
        a.parentNode.classList.add('ativo');

        // Fecha o menu hambúrguer ao selecionar um item em mobile
        if (menuItens && menuItens.classList.contains('menu-aberto') && window.innerWidth <= 768) {
            menuItens.classList.remove('menu-aberto');
        }
    });
});


// Fechamento automático de outros submenus ao abrir um novo
document.querySelectorAll('nav li').forEach((li) => {
    li.addEventListener('click', (event) => {
        const currentSubmenu = li.querySelector('ul');
        document.querySelectorAll('nav li ul').forEach((submenu) => {
            // Fecha outros submenus, mas não o submenu clicado (se houver)
            if (submenu !== currentSubmenu && submenu.style.display === 'block') {
                submenu.style.display = 'none';
            }
        });
        // Se houver um submenu e ele estiver oculto (para mobile), abre ele
        if (window.innerWidth <= 768 && currentSubmenu && currentSubmenu.style.display === 'none') {
             currentSubmenu.style.display = 'block';
        }
    });
});


// --- MÓDULO INÍCIO ---
const calcularInicioButton = document.getElementById("calcular-inicio");
if (calcularInicioButton) {
    calcularInicioButton.addEventListener("click", function() {
        const valorHGT = parseFloat(document.getElementById("valorHGTinicio").value);
        const mensagemDiv = document.getElementById("mensagem");

        if (isNaN(valorHGT) || valorHGT < 0) {
            if (mensagemDiv) {
                mensagemDiv.innerHTML = "<span style='color: red;'>Por favor, insira um valor válido para o HGT.</span>";
            }
            return;
        }

        let vazao;
        let bolus = 0;

        if (valorHGT > 300) {
            vazao = Math.floor((valorHGT / 100) * 2) / 2;
            bolus = vazao;
        } else if (valorHGT > 180) {
            vazao = Math.floor((valorHGT / 100) * 2) / 2;
        } else {
            if (mensagemDiv) {
                mensagemDiv.innerHTML = "Não é necessário iniciar a insulina.";
            }
            return;
        }

        if (mensagemDiv) {
            mensagemDiv.innerHTML = `Iniciar protocolo com vazão de **${vazao} ml/hr**. ${bolus > 0 ? `E realizar um bolus de **${bolus} ml**.` : ''}`;
        }
    });

    const valorHGTInicioInput = document.getElementById("valorHGTinicio");
    if (valorHGTInicioInput) {
        valorHGTInicioInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                calcularInicioButton.click();
            }
        });
    }
}


// --- MÓDULO RELIGAR ---
const calcularReligarButton = document.getElementById("calcular-religar");
if (calcularReligarButton) {
    calcularReligarButton.addEventListener("click", function() {
        const ultimaVazao = parseFloat(document.getElementById("ultimaVazao").value);
        const hgtAtualReligar = parseFloat(document.getElementById("HGTReligar").value);
        const mensagemReligarDiv = document.getElementById("mensagem-religar");

        if (isNaN(ultimaVazao) || isNaN(hgtAtualReligar)) {
            if (mensagemReligarDiv) {
                mensagemReligarDiv.innerHTML = "<span style='color: red;'>Por favor, insira valores válidos para Última Vazão e HGT.</span>";
            }
            return;
        }

        if (hgtAtualReligar > 180) {
            const novaVazao = Math.floor((ultimaVazao * 0.75) * 2) / 2;
            if (mensagemReligarDiv) {
                mensagemReligarDiv.innerHTML = `Religar protocolo com vazão de **${novaVazao} ml/hr**`;
            }
        } else {
            if (mensagemReligarDiv) {
                mensagemReligarDiv.innerHTML = "Não é necessário religar o protocolo.";
            }
        }
    });
}


// --- MÓDULO MANUTENÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    const hgtAtualInput = document.getElementById('HgtAtual');
    const hgtAnteriorInput = document.getElementById('HgtAnterior');
    const vazaoAtualInput = document.getElementById('VazaoAtual');
    // Mantenha 'DiferencaHgt' se o seu HTML ainda usa esse ID para o botão de cálculo da manutenção
    const calcularManutencaoButton = document.getElementById('DiferencaHgt');
    const mensagemManutencaoDiv = document.getElementById('mensagem-manutencao');

    if (calcularManutencaoButton) {
        calcularManutencaoButton.addEventListener('click', () => {
            const hgtAtual = parseFloat(hgtAtualInput.value);
            const hgtAnterior = parseFloat(hgtAnteriorInput.value);
            const vazaoAtual = parseDecimal(vazaoAtualInput.value);

            // Validação de inputs
            if (isNaN(hgtAtual) || isNaN(hgtAnterior) || isNaN(vazaoAtual) || vazaoAtual < 0) {
                mensagemManutencaoDiv.innerHTML = '<span style="color: red;">Por favor, insira valores numéricos válidos e positivos para todos os campos.</span>';
                return;
            }

            const diferencaHgt = hgtAtual - hgtAnterior;
            let mensagemAjuste = '';
            let valorDelta = 0;
            let acaoDelta = '';

            // --- Novas regras para HGT Atual < 140 ---
            if (hgtAtual < 70) {
                mensagemAjuste = `**HGT Atual: ${hgtAtual} mg/dL.** É necessário **avisar o médico**. Pode ser necessário administrar glicose. Checar prescrição médica e comunicar o enfermeiro. **Desligar a insulina.**`;
            } else if (hgtAtual < 140) {
                mensagemAjuste = `**HGT Atual: ${hgtAtual} mg/dL.** **Desligar a insulina.**`;
            } else if (hgtAtual >= 140 && hgtAtual <= 180) {
                // Regras para HGT Atual entre 140 e 180 mg/dL
                if (diferencaHgt >= -20 && diferencaHgt <= 0) {
                    mensagemAjuste = `Manter o valor atual de insulina (vazão ${vazaoAtual.toFixed(1)} ml/hr).`;
                } else if (diferencaHgt < -20 && diferencaHgt >= -40) {
                    valorDelta = calcularUmDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Diminuir a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Um Delta)`;
                        acaoDelta = 'Diminuir';
                    } else {
                        mensagemAjuste = `Diminuir a Infusão em Um Delta: **${valorDelta}**.`;
                        acaoDelta = 'Diminuir';
                    }
                } else if (diferencaHgt < -40) {
                    valorDelta = calcularDoisDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Diminuir a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Dois Delta)`;
                        acaoDelta = 'Diminuir';
                    } else {
                        mensagemAjuste = `Diminuir a Infusão em Dois Delta: **${valorDelta}**.`;
                        acaoDelta = 'Diminuir';
                    }
                } else { // Se aumentou nesta faixa (HGT Atual entre 140 e 180, e diferencaHgt > 0)
                    mensagemAjuste = `Manter o valor atual de insulina (vazão ${vazaoAtual.toFixed(1)} ml/hr).`;
                }
            } else if (hgtAtual >= 181 && hgtAtual <= 250) {
                // Regras para HGT Atual entre 181 e 250 mg/dL
                if (diferencaHgt > 40) {
                    valorDelta = calcularDoisDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Aumentar a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Dois Delta)`;
                        acaoDelta = 'Aumentar';
                    } else {
                        mensagemAjuste = `Aumentar a Infusão em Dois Delta: **${valorDelta}**.`;
                        acaoDelta = 'Aumentar';
                    }
                } else if (diferencaHgt >= 1 && diferencaHgt <= 40) {
                    valorDelta = calcularUmDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Aumentar a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Um Delta)`;
                        acaoDelta = 'Aumentar';
                    } else {
                        mensagemAjuste = `Aumentar a Infusão em Um Delta: **${valorDelta}**.`;
                        acaoDelta = 'Aumentar';
                    }
                } else if (diferencaHgt >= -40 && diferencaHgt <= 0) {
                    mensagemAjuste = `Manter o valor atual de insulina (vazão ${vazaoAtual.toFixed(1)} ml/hr).`;
                } else if (diferencaHgt < -40 && diferencaHgt >= -80) {
                    valorDelta = calcularUmDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Diminuir a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Um Delta)`;
                        acaoDelta = 'Diminuir';
                    } else {
                        mensagemAjuste = `Diminuir a Infusão em Um Delta: **${valorDelta}**.`;
                        acaoDelta = 'Diminuir';
                    }
                } else if (diferencaHgt < -80) {
                    valorDelta = calcularDoisDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Diminuir a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Dois Delta)`;
                        acaoDelta = 'Diminuir';
                    } else {
                        mensagemAjuste = `Diminuir a Infusão em Dois Delta: **${valorDelta}**.`;
                        acaoDelta = 'Diminuir';
                    }
                }
            } else if (hgtAtual > 250) {
                // Regras para HGT Atual acima de 250 mg/dL
                if (diferencaHgt > 40) {
                    valorDelta = calcularDoisDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Aumentar a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Dois Delta)`;
                        acaoDelta = 'Aumentar';
                    } else {
                        mensagemAjuste = `Aumentar a Infusão em Dois Delta: **${valorDelta}**.`;
                        acaoDelta = 'Aumentar';
                    }
                } else if (diferencaHgt >= 1 && diferencaHgt <= 40) {
                    valorDelta = calcularUmDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Aumentar a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Um Delta)`;
                        acaoDelta = 'Aumentar';
                    } else {
                        mensagemAjuste = `Aumentar a Infusão em Um Delta: **${valorDelta}**.`;
                        acaoDelta = 'Aumentar';
                    }
                } else if (diferencaHgt >= -80 && diferencaHgt <= 0) {
                    mensagemAjuste = `Manter o valor atual de insulina (vazão ${vazaoAtual.toFixed(1)} ml/hr).`;
                } else if (diferencaHgt < -80 && diferencaHgt >= -120) {
                    valorDelta = calcularUmDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Diminuir a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Um Delta)`;
                        acaoDelta = 'Diminuir';
                    } else {
                        mensagemAjuste = `Diminuir a Infusão em Um Delta: **${valorDelta}**.`;
                        acaoDelta = 'Diminuir';
                    }
                } else if (diferencaHgt < -120) {
                    valorDelta = calcularDoisDelta(vazaoAtual);
                    if (typeof valorDelta === 'number') {
                        mensagemAjuste = `Diminuir a Infusão em ${valorDelta.toFixed(1)} ml/hr. (Dois Delta)`;
                        acaoDelta = 'Diminuir';
                    } else {
                        mensagemAjuste = `Diminuir a Infusão em Dois Delta: **${valorDelta}**.`;
                        acaoDelta = 'Diminuir';
                    }
                }
            }

            // --- Construção da mensagem final ---
            let valorAjustado = vazaoAtual;
            if (acaoDelta === 'Aumentar' && typeof valorDelta === 'number') {
                valorAjustado += valorDelta;
            } else if (acaoDelta === 'Diminuir' && typeof valorDelta === 'number') {
                valorAjustado -= valorDelta;
            }

            let mensagemFinal = '';
            if (hgtAtual < 140) { // Para os casos de "desligar" ou "avisar médico"
                mensagemFinal = mensagemAjuste;
            } else if (mensagemAjuste.includes('Manter')) {
                mensagemFinal = `Manter o valor atual de insulina (vazão ${vazaoAtual.toFixed(1)} ml/hr)**.`;
            } else if (typeof valorDelta === 'number') {
                mensagemFinal = `Ajustar o valor de insulina para: **${valorAjustado.toFixed(1)} ml/hr** (${mensagemAjuste.replace(' ml/hr.', '').replace('Aumentar a Infusão em ', 'Aumentar ').replace('Diminuir a Infusão em ', 'Diminuir ')}).`;
            } else { // Caso o delta seja "avisar o médico"
                mensagemFinal = `Ajustar o valor de insulina para: **${mensagemAjuste}**`;
            }

            mensagemManutencaoDiv.innerHTML = mensagemFinal;
        });
    }
});

