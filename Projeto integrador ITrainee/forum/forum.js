
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--primary-color)';
    } else {
        navbar.style.background = 'var(--gradient-primary)';
    }
}

window.addEventListener('load', updateNavbar);

window.addEventListener('scroll', updateNavbar);

document.getElementById('threadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const button = document.querySelector('.submit-btn');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
});

function handleNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 50) {
        navbar.style.background = 'var(--primary-color)';
        navbar.style.backdropFilter = 'none'; 
    } else {
        navbar.style.background = 'var(--gradient-primary)';
        navbar.style.backdropFilter = 'blur(10px)'; 
    }
}

let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleNavbar, 50);
});

document.addEventListener('DOMContentLoaded', handleNavbar);
window.addEventListener('load', handleNavbar);
window.addEventListener('resize', handleNavbar);

document.getElementById('threadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('.submit-btn');
    
    button.style.transform = 'scale(0.95)';
    button.style.backgroundColor = '#9e0f0e'; 
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.style.backgroundColor = 'var(--accent-color)';
    }, 200);
});

function searchThreads() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let threads = document.querySelectorAll('.thread-card');

    threads.forEach(thread => {
        let title = thread.querySelector('.thread-title').textContent.toLowerCase();
        let content = thread.querySelector('.thread-content').textContent.toLowerCase();
        
        if (title.includes(input) || content.includes(input)) {
            thread.style.display = 'block';
        } else {
            thread.style.display = 'none';
        }
    });
}