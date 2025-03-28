const textarea = document.getElementById('threadContent');
const charCounter = document.querySelector('.char-counter span');

if (textarea && charCounter) {
    textarea.addEventListener('input', () => {
        const currentLength = textarea.value.length;
        charCounter.textContent = currentLength;
        
        if (currentLength > 500) {
            charCounter.style.color = 'var(--accent-color)';
        } else {
            charCounter.style.color = 'inherit';
        }
    });
}

document.getElementById('threadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        title: this.querySelector('#threadTitle').value.trim(),
        category: this.querySelector('#threadCategory').value,
        content: this.querySelector('#threadContent').value.trim(),
        tags: this.querySelector('#threadTags').value
                     .split(',')
                     .map(tag => tag.trim())
                     .filter(tag => tag)
    };
    
    if (formValidation(formData)) {
        console.log('Dados do formulário:', formData);
        showSuccessMessage();
        this.reset();
        charCounter.textContent = '0';
    }
});

function formValidation(data) {
    if (!data.title || data.title.length < 10) {
        alert('Título deve ter pelo menos 10 caracteres');
        return false;
    }
    
    if (!data.category) {
        alert('Selecione uma categoria');
        return false;
    }
    
    if (data.content.length < 100) {
        alert('Descrição deve ter pelo menos 100 caracteres');
        return false;
    }
    
    return true;
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Dúvida publicada com sucesso!
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('invalid', () => {
        input.style.borderColor = 'var(--accent-color)';
    });
    
    input.addEventListener('input', () => {
        if (input.checkValidity()) {
            input.style.borderColor = 'var(--text-color)';
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("threadForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        setTimeout(() => {
            alert("Postagem publicada com sucesso!"); 
            window.location.href = "forum.html"; 
        }, 500); 
    });
});

// Função para filtrar tópicos por categoria
function filterThreads(category) {
    const threads = document.querySelectorAll('.thread-card');

    threads.forEach(thread => {
        const threadCategory = thread.getAttribute('data-category');

        if (category === 'all' || threadCategory === category) {
            thread.style.display = 'block'; 
        } else {
            thread.style.display = 'none'; 
        }
    });
}

document.getElementById('category-all').addEventListener('click', (e) => {
    e.preventDefault();
    filterThreads('all');
});

document.getElementById('category-js').addEventListener('click', (e) => {
    e.preventDefault();
    filterThreads('js');
});

document.getElementById('category-html').addEventListener('click', (e) => {
    e.preventDefault();
    filterThreads('html');
});

document.getElementById('category-node').addEventListener('click', (e) => {
    e.preventDefault();
    filterThreads('node');
});

document.getElementById('category-react').addEventListener('click', (e) => {
    e.preventDefault();
    filterThreads('react');
});

document.getElementById('category-others').addEventListener('click', (e) => {
    e.preventDefault();
    filterThreads('others');
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