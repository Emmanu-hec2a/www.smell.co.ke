 // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
            });
        });
        
        // Scroll Animation Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
        
        // Stats Counter Animation
        const counters = document.querySelectorAll('.counter');
        let counterAnimated = false;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counterAnimated) {
                    counterAnimated = true;
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        const duration = 2000;
                        const increment = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.floor(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        
                        updateCounter();
                    });
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => counterObserver.observe(counter));
        
        // Service Card Expand/Collapse
        document.querySelectorAll('.learn-more-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.service-card');
                const details = card.querySelector('.service-details');
                const icon = this.querySelector('.material-icons');
                
                card.classList.toggle('expanded');
                details.classList.toggle('hidden');
                
                if (card.classList.contains('expanded')) {
                    this.querySelector('span:first-child').textContent = 'Show Less';
                    icon.textContent = 'expand_less';
                } else {
                    this.querySelector('span:first-child').textContent = 'Learn More';
                    icon.textContent = 'expand_more';
                }
            });
        });
        
        // Projects Carousel
        const carousel = document.getElementById('projectCarousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carouselDots');
        const slides = document.querySelectorAll('.carousel-slide');
        
        let currentIndex = 0;
        let slidesToShow = 1;
        
        // Determine slides to show based on screen width
        function updateSlidesToShow() {
            if (window.innerWidth >= 1024) {
                slidesToShow = 3;
            } else if (window.innerWidth >= 768) {
                slidesToShow = 2;
            } else {
                slidesToShow = 1;
            }
            updateCarousel();
            createDots();
        }
        
        // Create carousel dots
        function createDots() {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(slides.length - slidesToShow + 1);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.className = 'w-3 h-3 rounded-full transition ' + (i === 0 ? 'bg-blue-600' : 'bg-gray-300');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateCarousel() {
            const slideWidth = 100 / slidesToShow;
            carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
            updateDots();
        }
        
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('button');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.className = 'w-3 h-3 rounded-full bg-blue-600 transition';
                } else {
                    dot.className = 'w-3 h-3 rounded-full bg-gray-300 transition';
                }
            });
        }
        
        function goToSlide(index) {
            const maxIndex = slides.length - slidesToShow;
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
        }
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const maxIndex = slides.length - slidesToShow;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Auto-play carousel
        let autoPlayInterval = setInterval(() => {
            const maxIndex = slides.length - slidesToShow;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
        
        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                const maxIndex = slides.length - slidesToShow;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }, 5000);
        });
        
        // Initialize carousel
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        
        // Contact Form Validation and Submission
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !phone || !service || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Phone validation (basic)
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                showMessage('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Success message
            showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real implementation, you would send the data to a server here
            console.log('Form submitted:', { name, email, phone, service, message });
        });
        
        function showMessage(text, type) {
            formMessage.textContent = text;
            formMessage.className = 'mt-4 p-4 rounded-lg ' + (type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800');
            formMessage.classList.remove('hidden');
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        }
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Header shadow on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        });
        
        // Lazy loading images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Add hover effect to cards
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Keyboard navigation for carousel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        });
        
        // Add active state to navigation links based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('text-blue-600');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('text-blue-600');
                        }
                    });
                }
            });
        });
        
        // Prevent form submission with Enter key on select elements
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        });
        
        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
        
        // Console message for developers
        console.log('%cSan Marina Engineering Limited', 'color: #1e3a8a; font-size: 24px; font-weight: bold;');
        console.log('%cWebsite developed with modern web technologies', 'color: #3b82f6; font-size: 14px;');
        console.log('%cFor inquiries: sanmarinaengineering@gmail.com', 'color: #10b981; font-size: 12px;');