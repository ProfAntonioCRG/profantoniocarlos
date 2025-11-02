// ============================================
// FUNCIONALIDADES JAVASCRIPT
// ============================================

// Smooth scroll para links de navegação
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

// Adicionar classe ativa ao link de navegação ao fazer scroll
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

// Funcionalidade do botão de contato
document.querySelector('.contact-button').addEventListener('click', function() {
    const email = 'antonio.carlos@instituicao.edu.br';
    const subject = 'Contato - Professor Antonio Carlos';
    const body = 'Olá Professor Antonio Carlos,\n\nGostaria de entrar em contato com você.\n\nAtenciosamente';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Animação de entrada dos elementos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const disciplineCards = document.querySelectorAll('.discipline-card');
    const specialtyCards = document.querySelectorAll('.specialty-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    disciplineCards.forEach(card => observer.observe(card));
    specialtyCards.forEach(card => observer.observe(card));
});

// Adicionar feedback visual ao clicar em botões
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
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Detectar modo escuro do sistema (opcional)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Aqui você pode adicionar lógica para modo escuro se desejar
    console.log('Modo escuro detectado');
}

// Adicionar log de carregamento
console.log('Página do Professor Antonio Carlos carregada com sucesso!');