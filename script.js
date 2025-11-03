// ============================================
// FUNCIONALIDADES JAVASCRIPT COM ANIMAÇÕES
// ============================================

// ============================================
// ANIMAÇÃO 1: EFEITO DE DIGITAÇÃO NO TÍTULO
// ============================================
// Cria um efeito de digitação no título principal
// Simula o texto sendo digitado letra por letra

function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('typingTitle');
    const subtitleElement = document.getElementById('typingSubtitle');
    
    if (titleElement) {
        typeEffect(titleElement, 'Professor Antonio Carlos', 80);
    }
    
    if (subtitleElement) {
        setTimeout(() => {
            typeEffect(subtitleElement, 'Professor de Desenvolvimento de Sistemas', 50);
        }, 2000);
    }
});

// ============================================
// ANIMAÇÃO 2: SCROLL ANIMATIONS - FADE IN UP
// ============================================
// Elementos aparecem com fade e movimento para cima quando entram na viewport
// Usa IntersectionObserver para detectar quando elementos ficam visíveis

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona delay progressivo para efeito em cascata
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observar todos os elementos com classe fade-in-up
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ============================================
// ANIMAÇÃO 3: HOVER LIFT - CARTÕES SOBEM AO PASSAR MOUSE
// ============================================
// Cartões sobem com sombra aumentada quando o mouse passa
// Implementado via CSS com transição suave

// O efeito é definido no CSS com @keyframes hoverLift
// Aqui apenas garantimos que a classe hover-lift está sendo aplicada corretamente

document.querySelectorAll('.hover-lift').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = 'var(--shadow-xl)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'var(--shadow)';
    });
});

// ============================================
// MENU MOBILE - HAMBÚRGUER
// ============================================
// Menu responsivo que abre/fecha ao clicar no ícone hambúrguer
// Funciona apenas em telas pequenas (mobile)

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        // ANIMAÇÃO 4: Toggle do Menu Hambúrguer
        // Rotaciona as linhas do ícone e abre/fecha o menu
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// NAVEGAÇÃO ATIVA - DESTAQUE DO ITEM ATIVO
// ============================================
// Destaca o link de navegação da seção que está visível
// Atualiza conforme o usuário faz scroll

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ANIMAÇÃO 5: BOTÃO VOLTAR AO TOPO
// ============================================
// Botão aparece quando o usuário rola a página para baixo
// Clicando volta ao topo com scroll suave

const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        // Mostrar/ocultar botão baseado na posição de scroll
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        // ANIMAÇÃO 6: Scroll Suave para o Topo
        // Usa scroll behavior smooth do CSS
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
// ============================================
// Navegação suave entre seções ao clicar nos links
// Implementado com scroll-behavior: smooth no CSS

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// CALCULADORA DE NOTAS INTERATIVA
// ============================================
// Calcula a média de 2 notas (N1 e N2) e exibe o resultado com animação

const calcButton = document.getElementById('calcButton');
const calcResult = document.getElementById('calcResult');

if (calcButton) {
    calcButton.addEventListener('click', function() {
        // ANIMAÇÃO 7: Cálculo de Média com Feedback Visual
        const nota1 = parseFloat(document.getElementById('nota1').value);
        const nota2 = parseFloat(document.getElementById('nota2').value);

        // Validar entradas
        if (isNaN(nota1) || isNaN(nota2)) {
            calcResult.className = 'calculator-result error';
            calcResult.textContent = '❌ Por favor, preencha N1 e N2!';
            return;
        }

        if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
            calcResult.className = 'calculator-result error';
            calcResult.textContent = '❌ As notas devem estar entre 0 e 10!';
            return;
        }

        // Calcular média
        const media = (nota1 + nota2) / 2;
        const mediaFormatada = media.toFixed(2);

        // Determinar status com novos critérios
        let status = '';
        if (media >= 6) {
            status = '✅ Aprovado';
        } else if (media >= 4 && media < 6) {
            status = '⚠️ Recuperação';
        } else {
            status = '❌ Reprovado';
        }

        // Exibir resultado com animação
        calcResult.className = 'calculator-result success';
        calcResult.innerHTML = `
            <div>
                <strong>Média: ${mediaFormatada}</strong><br>
                <span>${status}</span>
            </div>
        `;

        // Adicionar animação de escala
        calcResult.style.animation = 'scaleUp 0.4s ease-out';
    });

    // Permitir cálculo ao pressionar Enter
    document.querySelectorAll('.calculator-input-group input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcButton.click();
            }
        });
    });
}

// ============================================
// FUNCIONALIDADE DO BOTÃO DE CONTATO
// ============================================
// Abre o cliente de email padrão ao clicar

document.querySelector('.contact-button')?.addEventListener('click', function() {
    const email = 'antonio.carlos@escola.pr.gov.br';
    const subject = 'Contato - Professor Antonio Carlos';
    const body = 'Olá Professor Antonio Carlos,\n\nGostaria de entrar em contato com você.\n\nAtenciosamente';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// ============================================
// ANIMAÇÃO 8: RIPPLE EFFECT EM BOTÕES
// ============================================
// Efeito de ondulação ao clicar em botões
// Cria uma animação visual de "onda" saindo do ponto de clique

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';

        // Adicionar estilo de posição relativa ao botão se necessário
        if (getComputedStyle(this).position === 'static') {
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
        }

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Adicionar animação ripple ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SUPORTE PARA IMAGEM DO PROFESSOR
// ============================================
// Permite que o usuário carregue uma imagem do professor
// A imagem é armazenada no localStorage para persistência

function initProfessorImage() {
    const professorImage = document.getElementById('professorImage');
    const heroImage = document.getElementById('heroImage');
    const savedImage = localStorage.getItem('professorImage');

    // Se houver imagem salva, carregar
    if (savedImage) {
        professorImage.src = savedImage;
        heroImage.src = savedImage;
    }

    // Permitir que o usuário carregue uma imagem ao clicar
    if (professorImage) {
        professorImage.style.cursor = 'pointer';
        professorImage.title = 'Clique para adicionar sua foto';
        
        professorImage.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const imageData = event.target.result;
                        professorImage.src = imageData;
                        heroImage.src = imageData;
                        localStorage.setItem('professorImage', imageData);
                    };
                    reader.readAsDataURL(file);
                }
            });
            input.click();
        });
    }

    // Permitir que o usuário carregue uma imagem ao clicar na imagem hero
    if (heroImage) {
        heroImage.style.cursor = 'pointer';
        heroImage.title = 'Clique para adicionar sua foto';
        
        heroImage.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const imageData = event.target.result;
                        professorImage.src = imageData;
                        heroImage.src = imageData;
                        localStorage.setItem('professorImage', imageData);
                    };
                    reader.readAsDataURL(file);
                }
            });
            input.click();
        });
    }
}

// Inicializar suporte de imagem ao carregar a página
document.addEventListener('DOMContentLoaded', initProfessorImage);

// ============================================
// DETECÇÃO DE MODO ESCURO DO SISTEMA
// ============================================
// Detecta se o usuário prefere modo escuro
// Pode ser expandido para implementar tema escuro

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('Modo escuro detectado no sistema');
}

// ============================================
// LOG DE CARREGAMENTO
// ============================================
// Mensagem de confirmação no console

console.log('🎓 Página do Professor Antonio Carlos carregada com sucesso!');
console.log('✨ Todas as animações e funcionalidades estão ativas!');
console.log('📸 Clique na foto para adicionar sua imagem!');
