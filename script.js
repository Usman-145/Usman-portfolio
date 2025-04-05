// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Typewriter Effect
const typewriterTexts = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "UI/UX Designer"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    const typewriter = document.querySelector('.typewriter');
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex >= typewriterTexts.length) {
            textIndex = 0;
        }
        setTimeout(typeWriter, 500);
    } else {
        const typingSpeed = isDeleting ? 100 : 150;
        setTimeout(typeWriter, typingSpeed);
    }
}

// Initialize typewriter after page loads
setTimeout(typeWriter, 1000);

// Initialize Swiper for Services Slider
const swiper = new Swiper('.services-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

// Animate Skill Bars
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const percent = item.getAttribute('data-percent');
        const progressBar = item.querySelector('.skill-progress');
        
        // Only animate if in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                progressBar.style.width = `${percent}%`;
                observer.unobserve(item);
            }
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// Countdown Timer
function setupCountdown() {
    // Set the date we're counting down to (1 month from now)
    const countDownDate = new Date();
    countDownDate.setMonth(countDownDate.getMonth() + 1);
    
    // Update the countdown every 1 second
    const countdown = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished, write some text
        if (distance < 0) {
            clearInterval(countdown);
            document.querySelector('.countdown').innerHTML = "<p>Projects are coming very soon!</p>";
        }
    }, 1000);
}

// Setup Form Submissions
function setupFormSubmissions() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Your message has been sent successfully!');
            contactForm.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for subscribing to my newsletter!');
            newsletterForm.reset();
        });
    }
}

// Theme Toggle
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', '');
            updateThemeIcon('');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        }
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (theme === 'light-theme') {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
    }
}

// Notification
function showNotification(message) {
    const notification = document.querySelector('.notification');
    notification.textContent = message;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCountdown();
    setupFormSubmissions();
    setupThemeToggle();
    animateSkillBars();
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});