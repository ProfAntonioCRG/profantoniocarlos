// ============================================
// ANIMAÇÃO 1: EFEITO DE DIGITAÇÃO NO TÍTULO
// ============================================
// Simula o efeito de máquina de escrever digitando o nome e subtítulo
function typeEffect() {
    const titleElement = document.getElementById('typingTitle');
    const subtitleElement = document.getElementById('typingSubtitle');
    const title = 'Professor Antonio Carlos';
    const subtitle = 'Professor de Desenvolvimento de Sistemas';
    
    let titleIndex = 0;
    let subtitleIndex = 0;
    
    // Função para digitar o título
    function typeTitle() {
        if (titleIndex < title.length) {
            titleElement.textContent += title.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 50);
        } else {
            typeSubtitle();
        }
    }
    
    // Função para digitar o subtítulo
    function typeSubtitle() {
        if (subtitleIndex < subtitle.length) {
            subtitleElement.textContent += subtitle.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeSubtitle, 30);
        }
    }
    
    // Inicia a digitação
    typeTitle();
}

// ============================================
// ANIMAÇÃO 2: SCROLL ANIMATIONS (FADE IN UP)
// ============================================
// Elementos aparecem com fade e movimento para cima ao entrar na viewport
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa todos os elementos com classe fade-in-up
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// MENU HAMBÚRGUER RESPONSIVO
// ============================================
// Ícone rotaciona formando X, menu desliza em mobile
function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        // ANIMAÇÃO 3: Menu Hambúrguer - Rotação do ícone
        hamburger.classList.toggle('active');
        // ANIMAÇÃO 4: Menu Deslizante - Menu abre/fecha com transição
        navMenu.classList.toggle('active');
    });
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// NAVEGAÇÃO ATIVA
// ============================================
// Link do menu é destacado conforme a seção visível
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
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
}

// ============================================
// ANIMAÇÃO 5: BOTÃO VOLTAR AO TOPO
// ============================================
// Botão aparece ao rolar para baixo e volta ao topo com scroll suave
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            // Mostra o botão com animação
            backToTopBtn.classList.add('show');
        } else {
            // Esconde o botão
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        // Scroll suave até o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// CALCULADORA DE NOTAS
// ============================================
// Calcula média de 2 notas (N1 + N2) com validação e feedback visual
// Critérios: >= 6 Aprovado, 4-5 Recuperação, < 4 Reprovado
function setupCalculator() {
    const calcularBtn = document.getElementById('calcularBtn');
    const nota1Input = document.getElementById('nota1');
    const nota2Input = document.getElementById('nota2');
    const resultadoDiv = document.getElementById('resultado');
    
    if (!calcularBtn || !nota1Input || !nota2Input || !resultadoDiv) return;
    
    calcularBtn.addEventListener('click', function() {
        const nota1 = parseFloat(nota1Input.value);
        const nota2 = parseFloat(nota2Input.value);
        
        // Validação das notas
        if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
            alert('Por favor, preencha as duas notas com valores entre 0 e 10');
            return;
        }
        
        // Calcula a média
        const media = (nota1 + nota2) / 2;
        
        // Determina o status e a cor
        let status = '';
        let classe = '';
        
        if (media >= 6) {
            status = '✅ Aprovado';
            classe = 'aprovado';
        } else if (media >= 4 && media < 6) {
            status = '🔄 Recuperação';
            classe = 'recuperacao';
        } else {
            status = '❌ Reprovado';
            classe = 'reprovado';
        }
        
        // Exibe o resultado com animação
        resultadoDiv.className = `resultado show ${classe}`;
        resultadoDiv.innerHTML = `<strong>Média: ${media.toFixed(2)}</strong><br>${status}`;
    });
    
    // Permite calcular ao pressionar Enter
    [nota1Input, nota2Input].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calcularBtn.click();
            }
        });
    });
}

// ============================================
// ANIMAÇÃO 6: HOVER LIFT NOS CARTÕES
// ============================================
// Cartões sobem com sombra aumentada ao passar o mouse
// Mantém os cartões visíveis ao fazer hover (não desaparecem)
function setupHoverEffects() {
    const cards = document.querySelectorAll('.hover-lift');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Mantém o cartão visível com animação suave
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Volta ao estado normal suavemente
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ============================================
// SUPORTE PARA IMAGEM DO PROFESSOR
// ============================================
// Permite que o usuário carregue uma imagem do professor
// A imagem é armazenada no localStorage para persistência
function setupProfessorImage() {
    const professorImage = document.getElementById('professorImage');
    const heroImage = document.getElementById('heroImage');
    
    if (!professorImage || !heroImage) return;
    
    const savedImage = localStorage.getItem('professorImage');
    
    // Se houver imagem salva, carregar
    if (savedImage) {
        professorImage.src = savedImage;
        heroImage.src = savedImage;
    }
    
    // Permitir que o usuário carregue uma imagem ao clicar
    [professorImage, heroImage].forEach(img => {
        img.style.cursor = 'pointer';
        img.title = 'Clique para adicionar sua foto';
        
        img.addEventListener('click', function() {
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
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicia todas as animações e funcionalidades
    typeEffect();
    setupScrollAnimations();
    setupHamburger();
    setupActiveNavigation();
    setupBackToTop();
    setupCalculator();
    setupHoverEffects();
    setupProfessorImage();
    
    console.log('✅ Página carregada com todas as animações ativas');
    console.log('📸 Clique na foto do professor para adicionar sua imagem');
});

// ============================================
// RESUMO DAS ANIMAÇÕES IMPLEMENTADAS
// ============================================
/*
1. EFEITO DE DIGITAÇÃO - Título e subtítulo aparecem como máquina de escrever
2. SCROLL ANIMATIONS (FADE IN UP) - Elementos aparecem com fade ao entrar na viewport
3. MENU HAMBÚRGUER - Ícone rotaciona e menu desliza em mobile
4. NAVEGAÇÃO ATIVA - Links do menu são destacados conforme seção visível
5. BOTÃO VOLTAR AO TOPO - Aparece ao rolar e volta ao topo com scroll suave
6. HOVER LIFT - Cartões sobem com sombra ao passar o mouse (permanecem visíveis)
7. CALCULADORA DE NOTAS - Calcula média com validação e feedback visual
8. IMAGEM DO PROFESSOR - Permite carregar foto com persistência em localStorage
9. TRANSIÇÕES SUAVES - Todos os elementos têm transições de 0.3s
*/