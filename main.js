// ==========================================
// CYRUS RESTAURANT - JAVASCRIPT
// Authentieke Perzische Keuken Brugge
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // PRELOADER
    // ==========================================
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.preloader').classList.add('hidden');
        }, 500);
    });

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenu.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // ==========================================
    // FADE IN ANIMATION ON SCROLL
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });

    // ==========================================
    // MENU FILTER FUNCTIONALITY
    // ==========================================
    window.filterMenu = function(category) {
        const items = document.querySelectorAll('.menu-item');
        const buttons = document.querySelectorAll('.category-btn');
        
        // Update active button
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.toLowerCase().includes(category) || 
                (category === 'all' && btn.textContent === 'Alles')) {
                btn.classList.add('active');
            }
        });
        
        // Filter items
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    };

    // ==========================================
    // DYNAMIC YEAR IN FOOTER
    // ==========================================
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${currentYear} Cyrus Restaurant. Alle rechten voorbehouden. | Gistelse Steenweg 120, 8200 Brugge | <a href="https://cyruscuisine.be" target="_blank">cyruscuisine.be</a>`;
    }

    // ==========================================
    // GALLERY LIGHTBOX (SIMPLE)
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('src');
            const title = this.querySelector('h4') ? this.querySelector('h4').textContent : '';
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${src}" alt="${title}">
                    <p>${title}</p>
                </div>
            `;
            
            // Add styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            lightbox.querySelector('.lightbox-content').style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            lightbox.querySelector('img').style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 10px;
            `;
            
            lightbox.querySelector('p').style.cssText = `
                color: #C9A961;
                text-align: center;
                margin-top: 1rem;
                font-size: 1.2rem;
            `;
            
            lightbox.querySelector('.lightbox-close').style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: #fff;
                font-size: 2rem;
                cursor: pointer;
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.className === 'lightbox-close') {
                    lightbox.remove();
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });

    // ==========================================
    // FORM VALIDATION (IF FORMS EXIST)
    // ==========================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form handling logic here
            alert('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.');
            form.reset();
        });
    });

    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('🍽️ Cyrus Restaurant website loaded successfully!');
});