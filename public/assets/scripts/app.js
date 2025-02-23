const repositories = document.querySelector('.content-main');
const myReposTitle = document.getElementById('my-repos-title');
const errorMessage = document.getElementById('error-message');
const usernameInput = document.getElementById('username');

usernameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchRepos();
    }
});

function fetchRepos() {
    const username = usernameInput.value.trim();

    if (username === '') {
        errorMessage.textContent = 'Por favor, digite um nome de usuário.';
        return;
    }

    // Esconde o título "Meus repositórios:" quando uma nova busca é realizada
    myReposTitle.style.display = 'none';
    
    // Limpa os repositórios existentes e a mensagem de erro
    repositories.innerHTML = '';
    errorMessage.textContent = '';

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(async res => {
            if (!res.ok) {
                if (res.status === 404) {
                    errorMessage.textContent = 'Erro ao buscar repositórios: 404 - Usuário não encontrado';
                } else {
                    errorMessage.textContent = `Erro ao buscar repositórios: ${res.status}`;
                }
                return;
            }

            let data = await res.json();
            if (data.length === 0) {
                errorMessage.textContent = 'Este usuário não possui repositórios.';
                return;
            }

            data.forEach(item => {
                let project = document.createElement('div');
                project.innerHTML = `
                <div class="project">
                    <div>
                        <h4 class="title">${item.name}</h4>
                        <span class="date-create">${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</span>
                    </div>
                    <div>
                        <a href="${item.html_url}" target="_blank">${item.html_url}</a>
                        <span class="language"><span class="circle"></span>${item.language}</span>
                    </div>
                </div>
                `;
                repositories.appendChild(project);
            });
        })
        .catch(error => {
            errorMessage.textContent = `Erro ao buscar repositórios: ${error.message}`;
        });
}

function getApiGitHub() {
    fetch('https://api.github.com/users/Alan118020/repos')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            let data = await res.json();
            data.forEach(item => {
                let project = document.createElement('div');

                project.innerHTML = `
                <div class="project">
                    <div>
                        <h4 class="title">${item.name}</h4>
                        <span class="date-create">${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}</span>
                    </div>
                    <div>
                        <a href="${item.html_url}" target="_blank">${item.html_url}</a>
                        <span class="language"><span class="circle"></span>${item.language}</span>
                    </div>
                </div>
                `;
                repositories.appendChild(project);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os repositórios do usuário AndreRavacini:', error);
        });
}

getApiGitHub();