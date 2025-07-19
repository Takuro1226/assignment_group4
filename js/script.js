document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-menu-button');
    const headerSiteMenu = document.querySelector('.header-site-menu');

    if (toggleButton && headerSiteMenu) {
        toggleButton.addEventListener('click', () => {
            headerSiteMenu.classList.toggle('is-show');
        });
    }

    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
        const swiper = new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    } 

    const video1 = document.getElementById('video1');
    const video2 = document.getElementById('video2');

    if (video1 && video2) {
        video1.addEventListener('ended', function() {
            video1.style.display = 'none';
            video2.style.display = 'block';
            video2.play();
        });

        video2.addEventListener('ended', function() {
            video2.style.display = 'none';
            video1.style.display = 'block';
            video1.play();
        });
    } 

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5 //
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('animated-text')) {
                    entry.target.classList.add('is-active');
                }
                else if (entry.target.classList.contains('scroll-reveal-section')) {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedTextElements = document.querySelectorAll('.animated-text');
    if (animatedTextElements.length > 0) {
        animatedTextElements.forEach(element => {
            observer.observe(element);
        });
    }

    const scrollRevealSections = document.querySelectorAll('.scroll-reveal-section');
    if (scrollRevealSections.length > 0) {
        scrollRevealSections.forEach(section => {
            observer.observe(section);
        });
    }
});