//====================== JS PARA CLIQUE E DESCIDA SUAVE NOS LINKS DO MENU ======================

const linksMenu = document.querySelectorAll('.infoport a[href^="#"]');

linksMenu.forEach(function (link) {
    link.addEventListener("click", function (evento) {
        evento.preventDefault();

        const idDaSecao = link.getAttribute("href");
        const secao = document.querySelector(idDaSecao);

        if (secao) {
            secao.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


//====================== JS DO CARROSSEL DE FOTOS (SOBRE MIM) ======================

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carrossel-slides');
    const imagens = document.querySelectorAll('.carrossel-slides img');
    const btnEsq = document.querySelector('.seta-esq');
    const btnDir = document.querySelector('.seta-dir');

    // Evita erros garantindo que os elementos existem na página
    if (!track || !btnEsq || !btnDir) return;

    let indexAtual = 0;
    const totalImagens = imagens.length;

    function atualizarCarrossel() {
        // Desloca o container para a esquerda em múltiplos de 100%
        track.style.transform = `translateX(-${indexAtual * 100}%)`;
    }

    btnDir.addEventListener('click', () => {
        indexAtual++;
        if (indexAtual >= totalImagens) {
            indexAtual = 0; // Passou da última, volta para a primeira
        }
        atualizarCarrossel();
    });

    btnEsq.addEventListener('click', () => {
        indexAtual--;
        if (indexAtual < 0) {
            indexAtual = totalImagens - 1; // Antes da primeira, vai para a última
        }
        atualizarCarrossel();
    });
});
