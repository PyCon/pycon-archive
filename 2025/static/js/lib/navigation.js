const menuTriggers = document.querySelectorAll('.site-nav-list [aria-expanded]');
const navTrigger = document.querySelector('[aria-controls="SiteNavLists"]');
const siteHeader = document.querySelector('.site-header');

const toggleMenu = (trigger, closeAll) => {
  const menuId = trigger.getAttribute('aria-controls');
  const menu = document.getElementById(menuId);
  const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

  siteHeader.classList.toggle('is-open', !isExpanded);

  if (closeAll) closeAllMenus(trigger);

  trigger.setAttribute('aria-expanded', !isExpanded);
  menu.setAttribute('aria-hidden', isExpanded);
};

const closeAllMenus = (trigger) => {
  menuTriggers.forEach(otherTrigger => {
    if (otherTrigger !== trigger) {
      otherTrigger.setAttribute('aria-expanded', 'false');
      const menuId = otherTrigger.getAttribute('aria-controls');
      const menu = document.getElementById(menuId);

      menu.setAttribute('aria-hidden', 'true');
    }
  });
}

const initNavigation = () => {
  menuTriggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu(trigger, true);
    });
  });

  navTrigger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu(navTrigger, false);
  });

  document.addEventListener('click', () => {
    closeAllMenus();
  });
};

export { initNavigation, toggleMenu, closeAllMenus };