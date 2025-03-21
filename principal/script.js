$(document).ready(function() {
    // Menu Toggle
    $('.menu-toggle').click(function() {
        $('.main-menu').toggleClass('active');
    });

    // FAQ Toggle
    $('.faq-question').click(function() {
        $(this).next('.faq-answer').slideToggle();
        $(this).find('.faq-toggle i').toggleClass('fa-plus fa-minus');
    });

    // Carousel
    let currentSlide = 0;
    const slides = $('.testimonial-card');
    const dots = $('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        dots.removeClass('active');
        $(slides[index]).addClass('active');
        $(dots[index]).addClass('active');
        currentSlide = index;
    }

    $('.carousel-control.next').click(function() {
        showSlide((currentSlide + 1) % totalSlides);
    });

    $('.carousel-control.prev').click(function() {
        showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    });

    $('.dot').click(function() {
        const index = $(this).index();
        showSlide(index);
    });

    // Animate Stats
    function animateStats() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.attr('data-count'));

            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Animate on scroll
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            const elementPos = $(this).offset().top;
            const topOfWindow = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (elementPos < topOfWindow + windowHeight - 100) {
                $(this).addClass('fade-in');
            }
        });
    }

    // Run animations
    setTimeout(animateStats, 500);
    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});



// JavaScript básico para manipulação do formulário
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const form = document.getElementById('anunciante-form');
    const successMessage = document.getElementById('success-message');

    // Função para validar o primeiro passo
    function validateStep1() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        if (!nome || !email || !telefone || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return false;
        }

        return true;
    }

    // Avançar para o próximo passo
    nextBtn.addEventListener('click', function() {
        if (validateStep1()) {
            step1.style.display = 'none';
            step2.style.display = 'block';
        }
    });

    // Voltar para o passo anterior
    prevBtn.addEventListener('click', function() {
        step2.style.display = 'none';
        step1.style.display = 'block';
    });

    // Enviar formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validação do segundo passo
        const empresa = document.getElementById('empresa').value;
        const segmento = document.getElementById('segmento').value;
        const descricao = document.getElementById('descricao').value;
        const investimento = document.getElementById('investimento').value;

        if (!empresa || !segmento || !descricao || !investimento) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Simular envio do formulário
        successMessage.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'painel-anunciante.html';
        }, 3000);
    });

    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');

    menuToggle.addEventListener('click', () => {
        mainMenu.classList.toggle('active');
    });
});
$(document).ready(function() {
    // Toggle menu for mobile
    $('.menu-toggle').click(function() {
        $('.main-menu').toggleClass('active');
    });

    // Handle password visibility toggle
    $('#toggle-senha').click(function() {
        togglePasswordVisibility('#senha', '#toggle-senha');
    });

    $('#toggle-confirmar-senha').click(function() {
        togglePasswordVisibility('#confirmar-senha', '#toggle-confirmar-senha');
    });

    function togglePasswordVisibility(inputId, toggleId) {
        const input = $(inputId);
        const toggle = $(toggleId).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            toggle.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            toggle.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }

    // Form navigation
    $('#nextStep').click(function() {
        if (validateStep1()) {
            $('#step1').removeClass('active');
            $('#step2').addClass('active');
            $('#step1-indicator').removeClass('active');
            $('#step2-indicator').addClass('active');
            $('#form-progress').css('width', '100%');
            $('html, body').animate({
                scrollTop: $(".form-container").offset().top - 100
            }, 500);
        }
    });

    $('#prevStep').click(function() {
        $('#step2').removeClass('active');
        $('#step1').addClass('active');
        $('#step2-indicator').removeClass('active');
        $('#step1-indicator').addClass('active');
        $('#form-progress').css('width', '50%');
        $('html, body').animate({
            scrollTop: $(".form-container").offset().top - 100
        }, 500);
    });

    // Form validation
    function validateStep1() {
        let isValid = true;

        // Name validation
        const nome = $('#nome').val().trim();
        if (nome === '') {
            showError('#nome-error', 'Por favor, informe seu nome completo.');
            isValid = false;
        } else {
            hideError('#nome-error');
        }

        // Email validation
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('#email-error', 'Por favor, informe seu e-mail.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('#email-error', 'Por favor, informe um e-mail válido.');
            isValid = false;
        } else {
            hideError('#email-error');
        }

        // Phone validation
        const telefone = $('#telefone').val().trim();
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (telefone === '') {
            showError('#telefone-error', 'Por favor, informe seu telefone.');
            isValid = false;
        } else if (!telefoneRegex.test(telefone)) {
            showError('#telefone-error', 'Formato: (00) 00000-0000');
            isValid = false;
        } else {
            hideError('#telefone-error');
        }

        // Password validation
        const senha = $('#senha').val();
        if (senha === '') {
            showError('#senha-error', 'Por favor, crie uma senha.');
            isValid = false;
        } else if (senha.length < 8) {
            showError('#senha-error', 'A senha deve ter pelo menos 8 caracteres.');
            isValid = false;
        } else {
            hideError('#senha-error');
        }

        // Confirm password validation
        const confirmarSenha = $('#confirmar-senha').val();
        if (confirmarSenha === '') {
            showError('#confirmar-senha-error', 'Por favor, confirme sua senha.');
            isValid = false;
        } else if (confirmarSenha !== senha) {
            showError('#confirmar-senha-error', 'As senhas não correspondem.');
            isValid = false;
        } else {
            hideError('#confirmar-senha-error');
        }

        return isValid;
    }

    function validateStep2() {
        let isValid = true;

        // Company/Project name validation
        const empresa = $('#empresa').val().trim();
        if (empresa === '') {
            showError('#empresa-error', 'Por favor, informe o nome da empresa/projeto.');
            isValid = false;
        } else {
            hideError('#empresa-error');
        }

        // Segment validation
        const segmento = $('#segmento').val();
        if (segmento === '') {
            showError('#segmento-error', 'Por favor, selecione um segmento.');
            isValid = false;
        } else {
            hideError('#segmento-error');
        }

        // Description validation
        const descricao = $('#descricao').val().trim();
        if (descricao === '') {
            showError('#descricao-error', 'Por favor, descreva seu projeto.');
            isValid = false;
        } else if (descricao.length < 50) {
            showError('#descricao-error', 'A descrição deve ter pelo menos 50 caracteres.');
            isValid = false;
        } else {
            hideError('#descricao-error');
        }

        // Areas of interest validation
        const areasChecked = $('input[name="areas"]:checked').length;
        if (areasChecked === 0) {
            showError('#areas-error', 'Por favor, selecione pelo menos uma área de interesse.');
            isValid = false;
        } else {
            hideError('#areas-error');
        }

        // Investment amount validation
        const investimento = $('#investimento').val().trim();
        if (investimento === '') {
            showError('#investimento-error', 'Por favor, informe o valor de investimento desejado.');
            isValid = false;
        } else if (isNaN(investimento) || parseInt(investimento) <= 0) {
            showError('#investimento-error', 'Por favor, informe um valor válido.');
            isValid = false;
        } else {
            hideError('#investimento-error');
        }

        return isValid;
    }

    function showError(selector, message) {
        $(selector).text(message).show();
        $(selector).closest('.form-group').find('input, select, textarea').addClass('error');
    }

    function hideError(selector) {
        $(selector).hide();
        $(selector).closest('.form-group').find('input, select, textarea').removeClass('error');
    }

    // Phone mask
    $('#telefone').on('input', function() {
        let phone = $(this).val();
        phone = phone.replace(/\D/g, '');

        if (phone.length > 0) {
            phone = '(' + phone;
        }
        if (phone.length > 3) {
            phone = phone.substring(0, 3) + ') ' + phone.substring(3);
        }
        if (phone.length > 10) {
            phone = phone.substring(0, 10) + '-' + phone.substring(10);
        }
        if (phone.length > 15) {
            phone = phone.substring(0, 15);
        }

        $(this).val(phone);
    });

    // Form submission
    $('#anunciante-form').submit(function(e) {
        e.preventDefault();

        if (validateStep2()) {
            // Simulate form submission
            const formData = $(this).serialize();
            console.log('Form data:', formData);

            // Show success message
            $(this).hide();
            $('#success-message').fadeIn();

            // Simulate redirect after 3 seconds
            setTimeout(function() {
                window.location.href = 'painel-anunciante.html';
            }, 3000);
        }
    });
});

// Script para o carrossel de depoimentos com detecção de visibilidade
$(document).ready(function() {
    // Variáveis
    const slider = $('.testimonial-slider');
    const track = $('.testimonial-track');
    const cards = $('.testimonial-card');
    const nextButton = $('.carousel-control.next');
    const prevButton = $('.carousel-control.prev');
    const indicators = $('.indicator');
    let currentIndex = 0;
    const cardWidth = 100; // Em porcentagem

    // Inicialização
    showCard(currentIndex);

    // Funções de navegação
    function showCard(index) {
        // Limitar índice entre 0 e o número máximo de cards - 1
        if (index < 0) index = cards.length - 1;
        if (index >= cards.length) index = 0;

        currentIndex = index;

        // Mover o track para exibir o card atual
        track.css('transform', `translateX(-${currentIndex * cardWidth / cards.length}%)`);

        // Atualizar classes ativas
        cards.removeClass('active');
        $(cards[currentIndex]).addClass('active');

        indicators.removeClass('active');
        $(`.indicator[data-index="${currentIndex}"]`).addClass('active');
    }

    // Event listeners
    nextButton.on('click', function() {
        showCard(currentIndex + 1);
    });

    prevButton.on('click', function() {
        showCard(currentIndex - 1);
    });

    indicators.on('click', function() {
        const index = $(this).data('index');
        showCard(index);
    });

    // Detecção de visibilidade na tela usando Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slider.addClass('in-view');
                // Iniciar autoplay quando visível
                startAutoplay();
            } else {
                slider.removeClass('in-view');
                // Parar autoplay quando não visível
                stopAutoplay();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(slider[0]);

    // Autoplay
    let autoplayTimer;

    function startAutoplay() {
        // Avança para o próximo slide a cada 5 segundos
        autoplayTimer = setInterval(() => {
            showCard(currentIndex + 1);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    // Parar autoplay quando o mouse estiver sobre o slider
    slider.on('mouseenter', stopAutoplay);
    slider.on('mouseleave', function() {
        if (slider.hasClass('in-view')) {
            startAutoplay();
        }
    });

    // Suporte para gestos de toque (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    slider.on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    slider.on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const minSwipeDistance = 50;
        if (touchStartX - touchEndX > minSwipeDistance) {
            // Swipe para a esquerda - próximo slide
            showCard(currentIndex + 1);
        } else if (touchEndX - touchStartX > minSwipeDistance) {
            // Swipe para a direita - slide anterior
            showCard(currentIndex - 1);
        }
    }
});

// Script para verificar quando a seção de depoimentos entra na viewport
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSection = document.querySelector('.testimonials');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar classe para iniciar animações quando a seção for visível
                testimonialsSection.classList.add('section-visible');
                // Podemos parar de observar após a primeira aparição
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionObserver.observe(testimonialsSection);
});


$(document).ready(function() {
    // Menu toggle
    $('.menu-toggle').click(function() {
        $('.main-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // FAQ toggle
    $('.faq-question').click(function() {
        $(this).next('.faq-answer').slideToggle();
        $(this).find('.faq-toggle i').toggleClass('fa-plus fa-minus');
    });

    // Animation on scroll
    $(window).scroll(function() {
        $('.animate-on-scroll').each(function() {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var windowHeight = $(window).height();
            var delay = $(this).data('delay') || 0;

            if (elementPos < topOfWindow + windowHeight - 100) {
                setTimeout(function() {
                    $(this).addClass('animate__animated animate__fadeInUp');
                }.bind(this), delay);
            }
        });
    });

    // Trigger scroll once to check for elements already in view
    $(window).trigger('scroll');
});


$(document).ready(function() {
    // Variáveis
    const form = $("#investidor-form");
    const step1 = $("#step1");
    const step2 = $("#step2");
    const step1Indicator = $("#step1-indicator");
    const step2Indicator = $("#step2-indicator");
    const progressBar = $("#form-progress");
    const nextButton = $("#nextStep");
    const prevButton = $("#prevStep");
    const successMessage = $("#success-message");

    // Menu mobile toggle
    $(".menu-toggle").click(function() {
        $(".main-menu").toggleClass("active");
    });

    // Configurar barra de progresso
    progressBar.css("width", "50%");

    // Botão próximo passo
    nextButton.click(function() {
        if (validateStep1()) {
            step1.removeClass("active");
            step2.addClass("active");
            step1Indicator.removeClass("active");
            step2Indicator.addClass("active");
            progressBar.css("width", "100%");
        }
    });

    // Botão voltar
    prevButton.click(function() {
        step2.removeClass("active");
        step1.addClass("active");
        step2Indicator.removeClass("active");
        step1Indicator.addClass("active");
        progressBar.css("width", "50%");
    });

    // Toggle de senha
    $("#toggle-senha, #toggle-confirmar-senha").click(function() {
        const input = $(this).siblings("input");
        const icon = $(this).find("i");

        // Toggle tipo do input
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            icon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            input.attr("type", "password");
            icon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });

    // Validação do passo 1
    function validateStep1() {
        let isValid = true;

        // Validação do nome
        const nome = $("#nome").val().trim();
        if (nome === "") {
            showError("nome", "Por favor, insira seu nome completo");
            isValid = false;
        } else {
            hideError("nome");
        }

        // Validação do email
        const email = $("#email").val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "" || !emailRegex.test(email)) {
            showError("email", "Por favor, insira um email válido");
            isValid = false;
        } else {
            hideError("email");
        }

        // Validação do telefone
        const telefone = $("#telefone").val().trim();
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (telefone === "" || !telefoneRegex.test(telefone)) {
            showError("telefone", "Por favor, insira um telefone válido: (00) 00000-0000");
            isValid = false;
        } else {
            hideError("telefone");
        }

        // Validação da senha
        const senha = $("#senha").val();
        if (senha === "" || senha.length < 8) {
            showError("senha", "A senha deve ter pelo menos 8 caracteres");
            isValid = false;
        } else {
            hideError("senha");
        }

        // Validação da confirmação de senha
        const confirmarSenha = $("#confirmar-senha").val();
        if (confirmarSenha === "" || confirmarSenha !== senha) {
            showError("confirmar-senha", "As senhas não coincidem");
            isValid = false;
        } else {
            hideError("confirmar-senha");
        }

        return isValid;
    }

    // Validação do passo 2
    function validateStep2() {
        let isValid = true;

        // Validação do tipo de investidor
        if ($("#tipo-investidor").val() === "") {
            showError("tipo-investidor", "Por favor, selecione um tipo de investidor");
            isValid = false;
        } else {
            hideError("tipo-investidor");
        }

        // Validação do montante
        if ($("#montante").val() === "") {
            showError("montante", "Por favor, selecione um montante");
            isValid = false;
        } else {
            hideError("montante");
        }

        // Validação dos setores
        if (!$("input[name='setores']:checked").length) {
            showError("setores", "Por favor, selecione pelo menos um setor de interesse");
            isValid = false;
        } else {
            hideError("setores");
        }

        // Validação dos estágios
        if (!$("input[name='estagios']:checked").length) {
            showError("estagios", "Por favor, selecione pelo menos um estágio de preferência");
            isValid = false;
        } else {
            hideError("estagios");
        }

        // Validação da experiência
        if ($("#experiencia").val() === "") {
            showError("experiencia", "Por favor, selecione sua experiência");
            isValid = false;
        } else {
            hideError("experiencia");
        }

        return isValid;
    }

    // Exibir erro
    function showError(field, message) {
        $(`#${field}-error`).text(message).css("display", "block");
        $(`#${field}`).addClass("error");
    }

    // Esconder erro
    function hideError(field) {
        $(`#${field}-error`).text("").css("display", "none");
        $(`#${field}`).removeClass("error");
    }

    // Máscara para telefone
    $("#telefone").on("input", function() {
        let value = $(this).val().replace(/\D/g, "");
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            value = value.replace(/(\d)(\d{4})$/, "$1-$2");
            $(this).val(value);
        }
    });

    // Envio do formulário
    form.submit(function(e) {
        e.preventDefault();

        if (validateStep2()) {
            // Simulação de envio
            form.fadeOut(300, function() {
                successMessage.fadeIn(300);

                // Simulação de redirecionamento após 3 segundos
                setTimeout(function() {
                    window.location.href = "painel-investidor.html";
                }, 3000);
            });
        }
    });
});

$(document).ready(function() {
    // Menu toggle para dispositivos móveis
    $('.menu-toggle').click(function() {
        $('.main-menu').toggleClass('active');
    });

    // Fechar menu ao clicar em um item
    $('.main-menu a').click(function() {
        $('.main-menu').removeClass('active');
    });

    // Toggle para perguntas frequentes
    $('.faq-question').click(function() {
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
    });

    // Validação do formulário
    $('.contact-form').submit(function(e) {
        e.preventDefault();

        let isValid = true;
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();

        if (name.trim() === '') {
            isValid = false;
            $('#name').css('border-color', '#ff6b6b');
        } else {
            $('#name').css('border-color', '#ddd');
        }

        if (email.trim() === '' || !isValidEmail(email)) {
            isValid = false;
            $('#email').css('border-color', '#ff6b6b');
        } else {
            $('#email').css('border-color', '#ddd');
        }

        if (message.trim() === '') {
            isValid = false;
            $('#message').css('border-color', '#ff6b6b');
        } else {
            $('#message').css('border-color', '#ddd');
        }

        if (isValid) {
            // Simulação de envio do formulário
            $('.form-submit button').text('Enviando...');

            setTimeout(function() {
                $('.contact-form').html('<div class="success-message"><i class="fas fa-check-circle"></i><h3>Mensagem enviada com sucesso!</h3><p>Agradecemos seu contato. Retornaremos em breve.</p></div>');
                $('.success-message').addClass('animate__fadeIn');
            }, 1500);
        }
    });

    // Função para validar e-mail
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Animação de elementos ao scroll
    $(window).scroll(function() {
        $('.contact-card, .stat-card, .faq-item').each(function() {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();

            if (elementTop < viewportBottom - 100) {
                $(this).addClass('animate__fadeIn');
            }
        });
    });

    // Iniciar animações para elementos visíveis
    $(window).trigger('scroll');
});

// Script para manipular os formulários (para ambos: investidor e anunciante)
document.addEventListener('DOMContentLoaded', function() {
    // Configuração de elementos da interface
    setupFormUI();
    
    // Manipulador para o formulário de investidor
    const investidorForm = document.getElementById('investidor-form');
    if (investidorForm) {
      investidorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta todos os dados do formulário
        const formData = collectFormData('investidor');
        
        // Salva no localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('userType', 'investidor');
        
        // Mostra mensagem de sucesso e redireciona
        showSuccessAndRedirect();
      });
    }
    
    // Manipulador para o formulário de anunciante
    const anuncianteForm = document.getElementById('anunciante-form');
    if (anuncianteForm) {
      anuncianteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta todos os dados do formulário
        const formData = collectFormData('anunciante');
        
        // Salva no localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('userType', 'anunciante');
        
        // Mostra mensagem de sucesso e redireciona
        showSuccessAndRedirect();
      });
    }
    
    // Configuração de navegação entre etapas do formulário
    const nextStepBtn = document.getElementById('nextStep');
    const prevStepBtn = document.getElementById('prevStep');
    
    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', function() {
        if (validateFirstStep()) {
          goToStep(2);
        }
      });
    }
    
    if (prevStepBtn) {
      prevStepBtn.addEventListener('click', function() {
        goToStep(1);
      });
    }
    
    // Toggle de visibilidade da senha
    setupPasswordToggles();
  });
  
  // Configuração da UI do formulário
  function setupFormUI() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        document.querySelector('nav').classList.toggle('active');
      });
    }
  }
  
  // Função para alternar entre as etapas do formulário
  function goToStep(step) {
    const steps = document.querySelectorAll('.step-content');
    const indicators = document.querySelectorAll('.process-step');
    const progress = document.getElementById('form-progress');
    
    steps.forEach(element => {
      element.classList.remove('active');
    });
    
    indicators.forEach(element => {
      element.classList.remove('active');
    });
    
    document.getElementById(`step${step}`).classList.add('active');
    document.getElementById(`step${step}-indicator`).classList.add('active');
    
    // Atualiza a barra de progresso
    if (progress) {
      progress.style.width = step === 1 ? '50%' : '100%';
    }
  }
  
  // Validação da primeira etapa
  function validateFirstStep() {
    let isValid = true;
    
    // Validação do nome
    const nome = document.getElementById('nome');
    if (nome && nome.value.trim() === '') {
      showError(nome, 'nome-error', 'Por favor, insira seu nome completo');
      isValid = false;
    } else if (nome) {
      hideError(nome, 'nome-error');
    }
    
    // Validação do email
    const email = document.getElementById('email');
    if (email && email.value.trim() === '') {
      showError(email, 'email-error', 'Por favor, insira seu email');
      isValid = false;
    } else if (email && !isValidEmail(email.value)) {
      showError(email, 'email-error', 'Por favor, insira um email válido');
      isValid = false;
    } else if (email) {
      hideError(email, 'email-error');
    }
    
    // Validação do telefone
    const telefone = document.getElementById('telefone');
    if (telefone && telefone.value.trim() === '') {
      showError(telefone, 'telefone-error', 'Por favor, insira seu telefone');
      isValid = false;
    } else if (telefone) {
      hideError(telefone, 'telefone-error');
    }
    
    // Validação da senha
    const senha = document.getElementById('senha');
    if (senha && senha.value.trim() === '') {
      showError(senha, 'senha-error', 'Por favor, crie uma senha');
      isValid = false;
    } else if (senha && senha.value.length < 6) {
      showError(senha, 'senha-error', 'A senha deve ter pelo menos 6 caracteres');
      isValid = false;
    } else if (senha) {
      hideError(senha, 'senha-error');
    }
    
    // Validação da confirmação de senha
    const confirmarSenha = document.getElementById('confirmar-senha');
    const senhaEl = document.getElementById('senha');
    if (confirmarSenha && confirmarSenha.value.trim() === '') {
      showError(confirmarSenha, 'confirmar-senha-error', 'Por favor, confirme sua senha');
      isValid = false;
    } else if (confirmarSenha && senhaEl && confirmarSenha.value !== senhaEl.value) {
      showError(confirmarSenha, 'confirmar-senha-error', 'As senhas não coincidem');
      isValid = false;
    } else if (confirmarSenha) {
      hideError(confirmarSenha, 'confirmar-senha-error');
    }
    
    return isValid;
  }
  
  // Função para configurar os toggles de senha
  function setupPasswordToggles() {
    const toggleSenha = document.getElementById('toggle-senha');
    const toggleConfirmarSenha = document.getElementById('toggle-confirmar-senha');
    
    if (toggleSenha) {
      toggleSenha.addEventListener('click', function() {
        togglePasswordVisibility('senha', this);
      });
    }
    
    if (toggleConfirmarSenha) {
      toggleConfirmarSenha.addEventListener('click', function() {
        togglePasswordVisibility('confirmar-senha', this);
      });
    }
  }
  
  // Função para alternar a visibilidade da senha
  function togglePasswordVisibility(inputId, toggleElement) {
    const input = document.getElementById(inputId);
    const icon = toggleElement.querySelector('i');
    
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'fas fa-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'fas fa-eye';
    }
  }
  
  // Função para mostrar mensagens de erro
  function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
      input.classList.add('error');
    }
  }
  
  // Função para ocultar mensagens de erro
  function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
      input.classList.remove('error');
    }
  }
  
  // Validação de email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Coletar todos os dados do formulário
  function collectFormData(formType) {
    const formData = {};
    
    // Dados comuns para ambos formulários
    formData.nome = document.getElementById('nome').value;
    formData.email = document.getElementById('email').value;
    formData.telefone = document.getElementById('telefone').value;
    formData.senha = document.getElementById('senha').value;
    
    if (formType === 'investidor') {
      // Dados específicos do investidor
      formData.tipoInvestidor = getSelectValue('tipo-investidor');
      formData.montante = getSelectValue('montante');
      formData.setores = getCheckboxValues('setores');
      formData.estagios = getCheckboxValues('estagios');
      formData.experiencia = getSelectValue('experiencia');
    } else if (formType === 'anunciante') {
      // Dados específicos do anunciante
      formData.empresa = document.getElementById('empresa').value;
      formData.segmento = getSelectValue('segmento');
      formData.descricao = document.getElementById('descricao').value;
      formData.areas = getCheckboxValues('areas');
      formData.investimento = document.getElementById('investimento').value;
    }
    
    return formData;
  }
  
  // Obter valor de um select
  function getSelectValue(id) {
    const select = document.getElementById(id);
    if (select && select.value) {
      const selectedOption = select.options[select.selectedIndex];
      return {
        value: select.value,
        text: selectedOption.text
      };
    }
    return { value: '', text: '' };
  }
  
  // Obter valores dos checkboxes selecionados
  function getCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    const values = [];
    
    checkboxes.forEach((checkbox) => {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      values.push({
        value: checkbox.value,
        text: label ? label.textContent : checkbox.value
      });
    });
    
    return values;
  }
  
  // Mostrar mensagem de sucesso e redirecionar
  function showSuccessAndRedirect() {
    const successMessage = document.getElementById('success-message');
    const formContainer = document.querySelector('.form-container form');
    
    if (successMessage && formContainer) {
      formContainer.style.display = 'none';
      successMessage.style.display = 'block';
      
      // Redirecionar após 2 segundos
      setTimeout(function() {
        window.location.href = 'resumo-cadastro.html';
      }, 2000);
    }
  }