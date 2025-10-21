function closeAlert(elem) {
  const li = elem.closest('.alert');
  const ul = li.parentElement;

  ul.removeChild(li);

  // Remove the UL if it's empty
  if (ul.children.length === 0) {
    ul.parentElement.removeChild(ul);
  }
}

function initAlerts() {
  document.querySelectorAll('[data-alert-close]').forEach(button => {
    button.addEventListener('click', (event) => {
      closeAlert(event.target);
    });
  });
}

export { initAlerts, closeAlert };