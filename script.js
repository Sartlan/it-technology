// Анимация появления элементов при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверяем позицию элементов при загрузке
    checkFade();
    
    // Проверяем позицию элементов при прокрутке
    window.addEventListener('scroll', checkFade);
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Анимация для карточек услуг
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Добавление динамического года в футер (если есть)
const yearElement = document.querySelector('.year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Базовые цены услуг
const servicePrices = {
    'pc-repair': 500,
    'windows-install': 1300,
    'linux-install': 4000,
    'drivers-install': 800,
    'software': 800
};

// Коэффициенты срочности
const urgencyMultipliers = {
    'normal': 1,
    'urgent': 1.5
};

// Калькулятор стоимости
function calculatePrice() {
    const serviceSelect = document.getElementById('service-type');
    const urgencySelect = document.getElementById('urgency');
    const priceElement = document.getElementById('calculated-price');

    if (!serviceSelect || !urgencySelect || !priceElement) return;

    const basePrice = servicePrices[serviceSelect.value] || 0;
    let finalPrice;

    // Специальные цены для срочных заказов
    if (serviceSelect.value === 'windows-install' && urgencySelect.value === 'urgent') {
        finalPrice = 1500;
    } else if (serviceSelect.value === 'drivers-install' && urgencySelect.value === 'urgent') {
        finalPrice = 1200;
    } else {
        finalPrice = basePrice * (urgencyMultipliers[urgencySelect.value] || 1);
    }

    priceElement.textContent = `${finalPrice} ₽`;
}

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    // Калькулятор
    const serviceSelect = document.getElementById('service-type');
    const urgencySelect = document.getElementById('urgency');
    const priceCalculator = document.getElementById('price-calculator');
    
    if (serviceSelect && urgencySelect) {
        serviceSelect.addEventListener('change', calculatePrice);
        urgencySelect.addEventListener('change', calculatePrice);
        // Предотвращаем отправку формы при нажатии Enter
        priceCalculator.addEventListener('submit', (e) => e.preventDefault());
        // Инициализация начальной цены
        calculatePrice();
    }

    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.calculator, .contact-form-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => observer.observe(element));
});

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Изменение иконки меню
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
    
    // Открытие/закрытие мобильного меню
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Закрытие меню при клике на ссылку и плавная прокрутка
    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                toggleMenu(); // Закрываем меню
                setTimeout(() => {
                    const offset = 70; // Высота навбара
                    const targetPosition = targetSection.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300); // Задержка для анимации закрытия меню
            }
        });
    });

    // Закрытие меню при клике на оверлей
    menuOverlay.addEventListener('click', toggleMenu);

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Обработчик для кнопки услуг
document.addEventListener('DOMContentLoaded', function() {
    const servicesToggleBtn = document.querySelector('.services-toggle-btn');
    const servicesGrid = document.querySelector('.services-grid');
    
    if (servicesToggleBtn && servicesGrid) {
        const toggleServices = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = servicesGrid.classList.contains('hidden');
            
            // Переключаем классы
            this.classList.toggle('active');
            servicesGrid.classList.toggle('hidden');
            
            if (!isHidden) {
                // Скрываем услуги
                servicesGrid.style.maxHeight = '0';
                const cards = servicesGrid.querySelectorAll('.service-card');
                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                });
            } else {
                // Показываем услуги
                servicesGrid.style.maxHeight = servicesGrid.scrollHeight + 'px';
                
                // Активируем анимацию для каждой карточки
                const cards = servicesGrid.querySelectorAll('.service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        };

        // Добавляем обработчики событий
        servicesToggleBtn.addEventListener('click', toggleServices);
        servicesToggleBtn.addEventListener('touchend', toggleServices);
        
        // Предотвращаем стандартное поведение при касании
        servicesToggleBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
    }
}); 