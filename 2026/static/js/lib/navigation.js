const menuTriggers = document.querySelectorAll('.site-nav-list [aria-expanded]');
const navTrigger = document.querySelector('[aria-controls="SiteNavLists"]');
const siteHeader = document.querySelector('.site-header');

const toggleMenu = (trigger, closeAll) => {
  const menuId = trigger.getAttribute('aria-controls');
  const menu = document.getElementById(menuId);

  const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

  // XXX - This is fine, but it could be improved
  // Toggle is-open for main nav trigger (mobile menu), or for sub-menus on desktop only
  const isDesktop = window.innerWidth >= 1140;
  if (trigger === navTrigger || isDesktop) {
    siteHeader.classList.toggle('is-open', !isExpanded);
  }

  if (closeAll) closeAllMenus(trigger);

  trigger.setAttribute('aria-expanded', !isExpanded);
  menu.setAttribute('aria-expanded', !isExpanded);
  menu.setAttribute('aria-hidden', isExpanded);
  menu.toggleAttribute('hidden', isExpanded);
};

const closeAllMenus = (trigger) => {
  menuTriggers.forEach((otherTrigger) => {
    if (otherTrigger !== trigger) {
      otherTrigger.setAttribute('aria-expanded', 'false');
      const menuId = otherTrigger.getAttribute('aria-controls');
      const menu = document.getElementById(menuId);

      menu.setAttribute('aria-hidden', 'true');
    }
  });

  // Close main nav and remove is-open class when all menus are closed
  if (!trigger) {
    siteHeader.classList.remove('is-open');
    if (navTrigger) {
      navTrigger.setAttribute('aria-expanded', 'false');
      const navMenuId = navTrigger.getAttribute('aria-controls');
      const navMenu = document.getElementById(navMenuId);
      if (navMenu) {
        navMenu.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
        navMenu.setAttribute('hidden', '');
      }
    }
  }
};

const initNavigation = () => {
  menuTriggers.forEach((trigger) => {
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

  // Close menus when crossing 1140 breakpoint
  let wasAboveBreakpoint = window.innerWidth >= 1140;
  window.addEventListener('resize', () => {
    const isAboveBreakpoint = window.innerWidth >= 1140;
    if (wasAboveBreakpoint !== isAboveBreakpoint) {
      closeAllMenus();
      wasAboveBreakpoint = isAboveBreakpoint;
    }
  });

  // Add background to nav when scrolled past original position
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = siteHeader.offsetHeight;

      if (scrollPosition > threshold) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
  }
};

export { initNavigation, toggleMenu, closeAllMenus };
