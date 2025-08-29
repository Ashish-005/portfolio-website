// Loading Screen
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 2000);
        });

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });

        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }

        // Scroll Progress
        window.addEventListener('scroll', () => {
            const scrollProgress = document.getElementById('scrollProgress');
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = progress + '%';
        });

        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Smooth Scrolling
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
                // Close mobile menu
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Typing Animation
        const typingText = document.getElementById('typingText');
        const texts = [
            'Passionate about creating beautiful web applications',
            'Skilled in React.js, JavaScript, and modern web technologies',
            'Always learning and growing as a developer',
            'Ready to bring your ideas to life'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, typingSpeed);
        }

        // Start typing animation after page loads
        setTimeout(typeWriter, 3000);

        // Particles Animation
        function createParticles() {
            const particles = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particles.appendChild(particle);
            }
        }

        createParticles();

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger counter animation for stats
                    if (entry.target.classList.contains('stat-card')) {
                        const counter = entry.target.querySelector('.stat-number');
                        const target = parseInt(counter.dataset.target);
                        animateCounter(counter, 0, target, 2000);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.section-title, .about-text, .profile-card, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form').forEach(el => {
            observer.observe(el);
        });

        // Counter Animation
        function animateCounter(element, start, end, duration) {
            let current = start;
            const increment = (end - start) / (duration / 16);
            
            const timer = setInterval(() => {
                current += increment;
                const value = Math.floor(current);
                
                if (end === 2026) {
                    element.textContent = value;
                } else if (end === 100) {
                    element.textContent = value;
                } else {
                    element.textContent = value + '+';
                }
                
                if (current >= end) {
                    element.textContent = end + (end === 2026 || end === 100 ? '' : '+');
                    clearInterval(timer);
                }
            }, 16);
        }

        // Contact Form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Create success message
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                this.reset();
            }, 3000);
        });

        // Parallax Effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-shapes');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add hover effects for interactive elements
        document.querySelectorAll('.btn, .project-card, .skill-category, .stat-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursorFollower.style.transform = 'scale(0)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple CSS
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Console log for fun
        console.log(`
        ╔══════════════════════════════════════════════════════════════════╗
        ║                                                                  ║
        ║   🚀 Welcome to Ashish Rajpoot's Portfolio!                      ║
        ║                                                                  ║
        ║   This portfolio was crafted with:                               ║
        ║   • Vanilla JavaScript for interactivity                        ║
        ║   • CSS3 for stunning animations                                 ║
        ║   • HTML5 for semantic structure                                 ║
        ║   • A lot of creativity and passion                             ║
        ║                                                                  ║
        ║   Thanks for visiting! 💜                                        ║
        ║                                                                  ║
        ╚══════════════════════════════════════════════════════════════════╝
        `);