<script>
        // Password Protection Script
        const correctPassword = "GurudevAolAi2025";
        
        function checkPassword() {
            const passwordInput = document.getElementById('password-input');
            const errorMessage = document.getElementById('error-message');
            const overlay = document.getElementById('password-overlay');
            const mainContent = document.getElementById('main-content');
            
            if (passwordInput.value === correctPassword) {
                overlay.style.display = 'none';
                mainContent.classList.remove('content-hidden');
                sessionStorage.setItem('passwordEntered', 'true');
            } else {
                errorMessage.classList.remove('hidden');
                passwordInput.value = '';
            }
        }

        function logout() {
            sessionStorage.removeItem('passwordEntered');
            document.getElementById('password-overlay').style.display = 'flex';
            document.getElementById('main-content').classList.add('content-hidden');
            document.getElementById('password-input').value = '';
            document.getElementById('error-message').classList.add('hidden');
        }

        // Allow Enter key to submit
        document.getElementById('password-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });

        // Check if password was already entered in this session
        window.onload = function() {
            if (sessionStorage.getItem('passwordEntered') === 'true') {
                document.getElementById('password-overlay').style.display = 'none';
                document.getElementById('main-content').classList.remove('content-hidden');
            }
            fetchProjects();
        };

        // Fetch and display projects
        async function fetchProjects() {
            try {
                const response = await fetch('projects.json');
                const data = await response.json();
                displayProjects(data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        function displayProjects(projects) {
            const container = document.querySelector(".project-container");
            container.innerHTML = "";
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
            container.style.gap = "20px";
            container.style.padding = "20px";

            projects.forEach((project, index) => {
                let projectTile = document.createElement("div");
                projectTile.classList.add("project-tile");
                projectTile.innerHTML = `
                    <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                    <p class="text-gray-600 mb-4 flex-grow">${project.description}</p>
                    <button onclick="openModal(${index})" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">Learn More</button>
                `;
                container.appendChild(projectTile);
            });
        }

        async function openModal(index) {
            try {
                const response = await fetch('projects.json');
                const data = await response.json();
                const project = data.projects[index];

                document.getElementById("modal-title").textContent = project.title;
                document.getElementById("modal-team").textContent = project.team;
                document.getElementById("modal-description").textContent = project.description;
                document.getElementById("modal-details").innerHTML = project.problemstatement;
                document.getElementById("modal-solutions").innerHTML = project.solutions;
                document.getElementById("join-button").href = project.joinLink;
                
                document.getElementById("modal").style.display = "block";
                document.body.style.overflow = "hidden";
            } catch (error) {
                console.error('Error opening modal:', error);
            }
        }

        function closeModal() {
            document.getElementById("modal").style.display = "none";
            document.body.style.overflow = "auto";
        }

        window.onclick = function(event) {
            if (event.target === document.getElementById("modal")) {
                closeModal();
            }
        };
    </script>