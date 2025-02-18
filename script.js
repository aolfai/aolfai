document.addEventListener("DOMContentLoaded", function () {
    fetch("projects.json")
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById("projects-container");
            projects.forEach(project => {
                const projectElement = `
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover rounded">
                        <h3 class="text-xl font-semibold mt-4">${project.title}</h3>
                        <p class="text-gray-600 mt-2">${project.description}</p>
                        <a href="${project.link}" class="text-blue-500 mt-3 inline-block">Learn More</a>
                    </div>
                `;
                container.innerHTML += projectElement;
            });
        })
        .catch(error => console.error("Error fetching projects:", error));
});
