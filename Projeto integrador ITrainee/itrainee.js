document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const tags = document.querySelectorAll('.search-section .tag');
    const jobCards = document.querySelectorAll('.job-card');
    const searchInput = document.querySelector('.search-input');
    const profileIcon = document.getElementById('profileIcon');
    let activeTag = null;

    // Função para filtrar vagas (mantida original)
    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        
        jobCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();
            const matchesSearch = title.includes(searchTerm);
            const matchesTag = !activeTag || tags.includes(activeTag);
            
            card.style.display = (matchesSearch && matchesTag) ? 'block' : 'none';
        });
    }

    // Event listeners para filtros (mantidos originais)
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('active'));
            
            if(activeTag !== tag.textContent.trim().toLowerCase()) {
                tag.classList.add('active');
                activeTag = tag.textContent.trim().toLowerCase();
            } else {
                activeTag = null;
            }
            
            filterJobs();
        });
    });

    searchInput.addEventListener('input', filterJobs);

    // ===== NOVO CÓDIGO PARA REDIRECIONAMENTO PARA REGISTRO =====
    profileIcon.addEventListener('click', (e) => {
        // Verifica se o usuário está logado
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            e.preventDefault(); // Impede o comportamento padrão do link
            
            // Redireciona diretamente para a página de registro
            window.location.href = 'registre-se.html';
        }
        // Se estiver logado, segue o link normal para perfil.html
    });

    // Resetar filtros ao rolar (opcional)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            tags.forEach(tag => tag.classList.remove('active'));
            activeTag = null;
            searchInput.value = '';
            filterJobs();
        }
    });
});