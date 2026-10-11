export function initDialogs() {
  const openModalButtons = document.querySelectorAll('[data-dialog-target]');
  const dialogs = new Set();

  openModalButtons.forEach((button) => {
    const modalId = button.getAttribute('data-dialog-target');
    const modal = document.getElementById(modalId);
    if (!modal) return;
    dialogs.add(modal);
    const closeModalButton = modal.querySelector('[data-close]');

    // Open Modal
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openDialog(modal);
    });

    // Close Modal
    if (closeModalButton) {
      closeModalButton.addEventListener('click', () => closeDialog(modal));
    }

    // Close Modal with ESC key
    modal.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeDialog(modal);
    });
  });

  // Clear the URL hash when a dialog closes so re-deep-linking to the same
  // dialog works (a no-op hashchange wouldn't re-fire).
  dialogs.forEach((dialog) => {
    dialog.addEventListener('close', () => {
      if (dialog.id && location.hash === `#${dialog.id}`) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  });

  function openDialog(modal) {
    if (modal.open) return;
    // Schedule-day tab panels carry `hidden` for the inactive days; a
    // <dialog> inside one won't render even via top-layer, so switch to
    // its panel manually. We replicate schedule_tabs' state changes here
    // because initDialogs runs before initScheduleTabs binds its click
    // handler — calling tab.click() at this point would no-op.
    const panel = modal.closest('[role="tabpanel"]');
    if (panel && panel.hidden) {
      const container = panel.parentElement;
      if (container) {
        container.querySelectorAll('[role="tabpanel"]').forEach((p) => {
          p.hidden = p !== panel;
        });
      }
      document.querySelectorAll('[role="tab"]').forEach((t) => {
        const isMatch = t.getAttribute('aria-controls') === panel.id;
        t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        t.setAttribute('tabindex', isMatch ? '0' : '-1');
      });
    }
    modal.showModal();
    document.body.classList.add('no-scroll');
    if (modal.id && location.hash !== `#${modal.id}`) {
      history.replaceState(null, '', `#${modal.id}`);
    }
  }

  function closeDialog(modal) {
    modal.close();
    document.body.classList.remove('no-scroll');
  }

  // Hash-based deep linking: open the dialog whose id matches location.hash.
  // Non-<dialog> targets (tab anchors like #May17) are ignored.
  function openDialogFromHash() {
    const id = location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target || target.tagName !== 'DIALOG') return;
    openDialog(target);
  }

  openDialogFromHash();
  window.addEventListener('hashchange', openDialogFromHash);
}
