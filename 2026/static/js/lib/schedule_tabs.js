function initScheduleTabs() {
  const containers = document.querySelectorAll('[data-schedule-tabs]');
  if (!containers.length) return;

  containers.forEach((container) => {
    const tabs = container.querySelectorAll('[role="tab"]');
    const heading = container.querySelector('.schedule-current-day');
    if (!tabs.length) return;

    function activateTab(tab) {
      tabs.forEach((t) => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;

      if (heading && tab.dataset.fullDate) {
        heading.textContent = tab.dataset.fullDate;
      }

      // Toggle summit info banners above tabs
      const panelId = tab.getAttribute('aria-controls');
      const panelDate = panelId ? panelId.replace('panel-', '') : '';
      container.querySelectorAll('.schedule-summit-info').forEach((info) => {
        info.hidden = info.dataset.forDate !== panelDate;
      });

      if (tab.dataset.hash) {
        history.replaceState(null, '', '#' + tab.dataset.hash);
      }
    }

    // Activate tab matching URL hash on load and scroll to its container
    if (location.hash) {
      const hash = location.hash.slice(1);
      const match = Array.from(tabs).find((t) => t.dataset.hash === hash);
      if (match) {
        activateTab(match);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTab(tab));

      tab.addEventListener('keydown', (e) => {
        const tabsArray = Array.from(tabs);
        const index = tabsArray.indexOf(tab);
        let target;

        if (e.key === 'ArrowRight') target = tabsArray[(index + 1) % tabsArray.length];
        else if (e.key === 'ArrowLeft') target = tabsArray[(index - 1 + tabsArray.length) % tabsArray.length];
        else if (e.key === 'Home') target = tabsArray[0];
        else if (e.key === 'End') target = tabsArray[tabsArray.length - 1];

        if (target) {
          e.preventDefault();
          target.focus();
          activateTab(target);
        }
      });
    });
  });
}

export { initScheduleTabs };
