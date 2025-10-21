export function initDialogs() {
  const openModalButtons = document.querySelectorAll("[data-dialog-target]");
  
  openModalButtons.forEach(button => {
    const modalId = button.getAttribute("data-dialog-target");
    const modal = document.getElementById(modalId);
    const closeModalButton = modal.querySelector("[data-close]");

    // Open Modal
    button.addEventListener("click", (event) => {
      event.preventDefault();
      modal.showModal();
    });

    // Close Modal
    closeModalButton.addEventListener("click", () => {
      modal.close();
    });

    // Close Modal with ESC key
    modal.addEventListener("cancel", (event) => {
      event.preventDefault(); // Prevent default close behavior to handle it ourselves
      modal.close();
    });
  });
}