// Test data in case the fetch fails
const fallbackData = [
    { title: "Test Project 1", description: "Description 1" },
    { title: "Test Project 2", description: "Description 2" }
];

document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById("data-container");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    // Try fetching from your URL, fall back to local data if it fails
    fetch("https://aolfai.github.io/aolfai/projects.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
            displayData(fallbackData); // Use fallback data if fetch fails
        });

    function displayData(data) {
        data.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("data-item");
            div.textContent = item.title;
            div.addEventListener("click", () => openModal(item));
            dataContainer.appendChild(div);
        });
    }

    // Rest of your modal code remains the same
    function openModal(item) {
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        modal.style.display = "flex";
    }

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
