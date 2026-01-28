// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.className = savedTheme;
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.className;
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark-mode' ? 'fas fa-sun' : 'fas fa-moon';
}

// ==================== Smooth Scroll ====================
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

// ==================== Portfolio Filter ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'slideInUp 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ==================== Animated Counter ====================
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
};

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stat-number')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (!entry.target.hasAttribute('data-animated')) {
                animateCounter(entry.target, target);
                entry.target.setAttribute('data-animated', 'true');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
});

// ==================== Contact Modal ====================
const contactBtn = document.getElementById('contactBtn');
const contactBtn2 = document.getElementById('contactBtn2');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

const openContactModal = () => {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

if (contactBtn) contactBtn.addEventListener('click', openContactModal);
if (contactBtn2) contactBtn2.addEventListener('click', openContactModal);

closeModal.addEventListener('click', () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    // Show success message
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.style.opacity = '0.8';
    
    // Reset form
    contactForm.reset();
    
    // Restore button after 2 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 2000);
});

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ==================== Mobile Menu Toggle ====================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// ==================== Scroll Animations ====================
const createScrollAnimation = () => {
    const elements = document.querySelectorAll('.feature-card, .portfolio-item, .stat');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', createScrollAnimation);

// ==================== Active Navigation Link ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add active nav link styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #00d4ff;
    }
`;
document.head.appendChild(style);
