// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    hamburger.classList.toggle('active');
});

// Page Navigation Logic
const pages = {
    home: document.getElementById('home'),
    underConstruction: document.getElementById('under-construction'),
    services: document.getElementById('services'),
    contact: document.getElementById('contact')
};

// Function to hide all sections
function hideAllSections() {
    pages.home.style.display = 'none';
    pages.underConstruction.style.display = 'none';
    pages.services.style.display = 'none';
    pages.contact.style.display = 'none';
}

// Function to show specific section
function showSection(section) {
    hideAllSections();
    section.style.display = section === pages.services ? 'flex' : 'block';
    
    // Ensure we're at the top of the page
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    }, 0);
}

// Handle navigation clicks
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Show appropriate section
        switch(page) {
            case 'about':
            case 'careers':
            case 'projects':
            case 'search':
                // Show under construction page
                showSection(pages.underConstruction);
                break;
            case 'services':
                // Show services page
                showSection(pages.services);
                break;
            case 'contact':
                // Show contact page
                showSection(pages.contact);
                break;
            default:
                // Show home page
                showSection(pages.home);
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    }
    
    lastScroll = currentScroll;
});

// Logo click to return home
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    showSection(pages.home);
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animation for service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add animation to badges
const badges = document.querySelectorAll('.badge');
badges.forEach((badge, index) => {
    badge.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Add CSS animation for floating effect
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: rotate(-5deg) translateY(0px);
        }
        50% {
            transform: rotate(-5deg) translateY(-10px);
        }
    }
    
    .badge-blue {
        animation: floatBlue 3s ease-in-out 0.2s infinite !important;
    }
    
    @keyframes floatBlue {
        0%, 100% {
            transform: rotate(3deg) translateY(0px);
        }
        50% {
            transform: rotate(3deg) translateY(-10px);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);