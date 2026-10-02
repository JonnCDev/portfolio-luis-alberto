//====================== JS PARA CLIQUE E DESCIDA SUAVE NOS LINKS DO MENU ======================

// Pega todos os links internos (#...) do menu do topo e do rodapé
const linksMenu = document.querySelectorAll('.nav-item[href^="#"], .rodape-links a[href^="#"]');

linksMenu.forEach(function (link) {
    link.addEventListener("click", function (evento) {
        // Impede o "pulo" seco padrão do navegador
        evento.preventDefault();

        // Descobre qual seção o link aponta (ex.: "#sobre")
        const idDaSecao = link.getAttribute("href");
        const secao = document.querySelector(idDaSecao);

        // Se a seção existir, rola até ela de forma suave
        if (secao) {
            secao.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


//====================== JS DO EFEITO DE ENTRADA AO ROLAR A PÁGINA ======================

document.addEventListener('DOMContentLoaded', () => {
    // Todos os elementos que têm a classe "reveal" (veja scroll.css)
    const elementosReveal = document.querySelectorAll('.reveal');

    if (!elementosReveal.length) return;

    // O observador avisa quando um elemento entra na tela
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                // Adiciona a classe que faz o elemento aparecer
                entrada.target.classList.add('is-visible');
                // Para de observar: a animação acontece só uma vez
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15,                    // aparece quando 15% do elemento está visível
        rootMargin: '0px 0px -60px 0px'     // dispara um pouco antes de chegar ao fim da tela
    });

    // Começa a observar cada elemento
    elementosReveal.forEach((el) => observador.observe(el));
});


//====================== JS DO CARROSSEL DE FOTOS (SOBRE MIM) ======================

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do carrossel: a "esteira" de fotos, as fotos e as duas setas
    const track = document.querySelector('.carrossel-slides');
    const imagens = document.querySelectorAll('.carrossel-slides img');
    const btnEsq = document.querySelector('.seta-esq');
    const btnDir = document.querySelector('.seta-dir');

    // Evita erros garantindo que os elementos existem na página
    if (!track || !btnEsq || !btnDir) return;

    let indexAtual = 0;                 // posição da foto exibida (0 = primeira)
    const totalImagens = imagens.length;

    function atualizarCarrossel() {
        // Desloca o container para a esquerda em múltiplos de 100%
        track.style.transform = `translateX(-${indexAtual * 100}%)`;
    }

    // Seta direita: próxima foto
    btnDir.addEventListener('click', () => {
        indexAtual++;
        if (indexAtual >= totalImagens) {
            indexAtual = 0; // Passou da última, volta para a primeira
        }
        atualizarCarrossel();
    });

    // Seta esquerda: foto anterior
    btnEsq.addEventListener('click', () => {
        indexAtual--;
        if (indexAtual < 0) {
            indexAtual = totalImagens - 1; // Antes da primeira, vai para a última
        }
        atualizarCarrossel();
    });
});

//====================== JS DO FORMULÁRIO DE CONTATO (EMAILJS) ======================

// Inicia o EmailJS com a chave pública da conta
emailjs.init({ publicKey: 'eW8syAbY7YtvhF8--' });

// Formulário e botão de envio
const form = document.getElementById('formulario-contato');
const botao = form.querySelector('button[type="submit"]');



form.addEventListener('submit', async (e) => {
    // Impede o envio padrão (que recarregaria a página)
    e.preventDefault();


    // Anti-spam 1: campo escondido "empresa" preenchido = robô, então ignora
    if (form.empresa.value) return;

    // Anti-spam 2: bloqueia novo envio em menos de 60 segundos
    const ultimo = Number(localStorage.getItem('ultimoEnvio'));
    if (Date.now() - ultimo < 60000) return; 


    // Trava o botão enquanto envia
    botao.disabled = true;
    botao.textContent = 'Enviando...';

    try {
        // Envia o formulário pelo EmailJS (serviço e template da conta)
        await emailjs.sendForm('service_ik5yrnt', 'template_z392cq3', form);
        form.reset();
        botao.textContent = 'Mensagem enviada!';

        // Guarda o horário do envio para o bloqueio de 60 segundos
        localStorage.setItem('ultimoEnvio', Date.now());
        
    } catch (erro) {
        // Se der erro, mostra no console e avisa no botão
        console.error(erro);
        botao.textContent = 'Erro, tente de novo';
    }

    // Depois de 3 segundos, o botão volta ao normal
    setTimeout(() => {
        botao.disabled = false;
        botao.textContent = 'Enviar mensagem';
    }, 3000);
});
