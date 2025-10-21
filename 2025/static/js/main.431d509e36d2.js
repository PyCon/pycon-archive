import { initNavigation } from './lib/navigation.js';
import { initAlerts } from './lib/alerts.js';
import { initDialogs } from './lib/dialog.js';
import { initSearchSuggest } from './lib/search_suggest.js';

window.confYear = '2025';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDialogs();
  initAlerts();
  initSearchSuggest();
});