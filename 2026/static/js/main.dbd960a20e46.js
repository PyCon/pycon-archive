import { initNavigation } from './lib/navigation.js';
import { initAlerts } from './lib/alerts.js';
import { initDialogs } from './lib/dialog.js';
import { initScheduleTabs } from './lib/schedule_tabs.js';

window.confYear = '2026';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDialogs();
  initAlerts();
  initScheduleTabs();
});
