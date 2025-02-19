document.addEventListener("DOMContentLoaded", () => {
    const dataContainer = document.getElementById("data-container");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    // Fetch JSON data
    fetch("projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("data-item");
                div.textContent = item.title;
                div.addEventListener("click", () => openModal(item));
                dataContainer.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading JSON:", error));

    // Open Modal
    function openModal(item) {
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        modal.style.display = "flex";
    }

    // Close Modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close Modal on clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
