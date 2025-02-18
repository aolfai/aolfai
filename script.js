document.addEventListener("DOMContentLoaded", function () {
    fetchProjects();
    fetchModalContent();
});

// Fetch and display projects from JSON
function fetchProjects() {
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectContainer = document.querySelector('.project-container');
            projectContainer.innerHTML = ''; 

            projects.forEach(project => {
                const projectHTML = `
                    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover rounded mb-4">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-700">${project.description}</p>
                    </div>
                `;
                projectContainer.innerHTML += projectHTML;
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
}

// Fetch and display modal window content
function fetchModalContent() {
    fetch('modal.json')
        .then(response => response.json())
        .then(modalData => {
            const modalHTML = `
                <div id="modal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center hidden">
                    <div class="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 class="text-2xl font-bold mb-4">${modalData.title}</h2>
                        <p class="text-gray-700 mb-6">${modalData.content}</p>
                        <button onclick="closeModal()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Close</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        })
        .catch(error => console.error('Error fetching modal content:', error));
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function openModal() {
    document.getElementById("modal").classList.remove("hidden");
}
<