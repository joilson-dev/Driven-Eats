document.addEventListener('DOMContentLoaded', function() {
  let selectedPrato = null;
  let selectedBebida = null;
  let selectedSobremesa = null;

  selecionarPrato = function(prato) {
    const cards = document.querySelectorAll('.group.prato .card');

    cards.forEach(card => {
      card.classList.remove('selected');
    });

    prato.classList.add('selected');

    const imgVerificado = prato.querySelector('.verificado');
    if (imgVerificado) {
      imgVerificado.style.display = 'inline';
    }

    if (selectedPrato && selectedPrato !== prato) {
      const imgVerificadoAnterior = selectedPrato.querySelector('.verificado');
      if (imgVerificadoAnterior) {
        imgVerificadoAnterior.style.display = 'none';
      }
    }
    selectedPrato = prato;
  verificarSelecao()
}

  selecionarBebida = function(bebida) {
    const cards = document.querySelectorAll('.group.bebida .card');
    cards.forEach(card => {
      card.classList.remove('selected');
    });

    bebida.classList.add('selected');

    const imgVerificado = bebida.querySelector('.verificado');
    if (imgVerificado) {
      imgVerificado.style.display = 'inline';
    }

    if (selectedBebida && selectedBebida !== bebida) {
      const imgVerificadoAnterior = selectedBebida.querySelector('.verificado');
      if (imgVerificadoAnterior) {
        imgVerificadoAnterior.style.display = 'none';
      }
    }

    selectedBebida = bebida;
  verificarSelecao()
}

  selecionarSobremesa = function(sobremesa) {
    const cards = document.querySelectorAll('.group.sobremesa .card');

    cards.forEach(card => {
      card.classList.remove('selected');
    });

    sobremesa.classList.add('selected');
    const imgVerificado = sobremesa.querySelector('.verificado');
    if (imgVerificado) {
      imgVerificado.style.display = 'inline';
    }

    if (selectedSobremesa && selectedSobremesa !== sobremesa) {
      const imgVerificadoAnterior = selectedSobremesa.querySelector('.verificado');
      if (imgVerificadoAnterior) {
        imgVerificadoAnterior.style.display = 'none';
      }
    }

    selectedSobremesa = sobremesa;
    verificarSelecao()
  }

  function verificarSelecao() {
    const pratoSelecionado = selectedPrato !== null;
    const bebidaSelecionada = selectedBebida !== null;
    const sobremesaSelecionada = selectedSobremesa !== null;

    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
      const fecharPedido = document.querySelector('footer p');
      if (fecharPedido) {
        fecharPedido.classList.add('fechar-pedido');
        fecharPedido.innerText = 'Fechar pedido';
        fecharPedido.addEventListener('click', abrirFechamento);
      }
    } else {
      const fecharPedido = document.querySelector('footer p');
      if (fecharPedido) {
        fecharPedido.classList.remove('fechar-pedido');
        fecharPedido.innerText = 'Selecione os 3 itens para fechar o pedido';
        fecharPedido.removeEventListener('click', abrirFechamento);
      }
    }
  }

  function calcularTotal() {
    let total = 0;

    const fechamentoProdutos = document.querySelectorAll('.produto-fechado');
    fechamentoProdutos.forEach(produto => {
      produto.innerHTML = '';
    });

    if (selectedPrato) {
      const nomePrato = selectedPrato.querySelector('h3').innerText;
      const precoPrato = selectedPrato.querySelector('.price').innerText;
      total += parseFloat(precoPrato.replace('R$ ', '').replace(',', '.'));
      const pratoFechado = document.querySelector('.produto-fechado.prato');
      if (pratoFechado) {
        pratoFechado.innerHTML = `<p>${nomePrato}</p><p>${precoPrato}</p>`;
      }
    }

    if (selectedBebida) {
      const nomeBebida = selectedBebida.querySelector('h3').innerText;
      const precoBebida = selectedBebida.querySelector('.price').innerText;
      total += parseFloat(precoBebida.replace('R$ ', '').replace(',', '.'));
      const bebidaFechada = document.querySelector('.produto-fechado.bebida');
      if (bebidaFechada) {
        bebidaFechada.innerHTML = `<p>${nomeBebida}</p><p>${precoBebida}</p>`;
      }
    }

    if (selectedSobremesa) {
      const nomeSobremesa = selectedSobremesa.querySelector('h3').innerText;
      const precoSobremesa = selectedSobremesa.querySelector('.price').innerText;
      total += parseFloat(precoSobremesa.replace('R$ ', '').replace(',', '.'));
      const sobremesaFechada = document.querySelector('.produto-fechado.sobremesa');
      if (sobremesaFechada) {
        sobremesaFechada.innerHTML = `<p>${nomeSobremesa}</p><p>${precoSobremesa}</p>`;
      }
    }

    const totalElement = document.querySelector('.produto-total p:last-child');
    if (totalElement) {
      totalElement.innerText = `R$ ${total.toFixed(2)}`;
    }
  }
  function abrirFechamento() {
    calcularTotal();

    const fechamento = document.querySelector('.fechamento');
    if (fechamento) {
      fechamento.style.display = 'flex';
    }

    const cancelarBtn = document.querySelector('.cancelar');
    if (cancelarBtn) {
      cancelarBtn.addEventListener('click', fecharFechamento);
    }

    const fecharPedido = document.querySelector('footer p');
    if (fecharPedido) {
      fecharPedido.removeEventListener('click', abrirFechamento);
    }

    const confirmarBtn = document.querySelector('.confirmar');
    if (confirmarBtn) {
      confirmarBtn.addEventListener('click', gerarLinkWhatsApp);
    }
  }

function fecharFechamento() {
  const fechamento = document.querySelector('.fechamento');
  if (fechamento) {
    fechamento.style.display = 'none';
  }

  const fecharPedido = document.querySelector('footer p');
  if (fecharPedido) {
    fecharPedido.classList.remove('fechar-pedido');
    fecharPedido.innerText = 'Selecione os 3 itens para fechar o pedido';
    fecharPedido.addEventListener('click', abrirFechamento);
  }

  const confirmarBtn = document.querySelector('.confirmar');
  if (confirmarBtn) {
    confirmarBtn.removeEventListener('click', gerarLinkWhatsApp);
  }

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('selected');
    const imgVerificado = card.querySelector('.verificado');
    if (imgVerificado) {
      imgVerificado.style.display = 'none';
    }
  });

  selectedPrato = null;
  selectedBebida = null;
  selectedSobremesa = null;
}


    function gerarLinkWhatsApp() {
    const nomePrato = selectedPrato.querySelector('h3').innerText;
    const nomeBebida = selectedBebida.querySelector('h3').innerText;
    const nomeSobremesa = selectedSobremesa.querySelector('h3').innerText;

    const totalPedido = document.querySelector('.produto-total p:last-child').innerText;

    const numeroWhatsApp = '21989896484';

    const mensagem = encodeURIComponent(`Olá, gostaria de fazer o pedido:
- Prato: ${nomePrato}
- Bebida: ${nomeBebida}
- Sobremesa: ${nomeSobremesa}
Total: ${totalPedido}`);

    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(linkWhatsApp, '_blank');
  }
});
