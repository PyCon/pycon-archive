let timeout = null;

function fetchSuggestions(query) {
  const url = `/${window.confYear}/search_autocomplete_json/?query=${encodeURIComponent(query)}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching suggestions:', error);
      return {};
    });
}

function displaySuggestions(suggestions, resultsContainer) {
  resultsContainer.innerHTML = ''; // Clear previous results

  const ul = document.createElement('ul');
  ul.classList.add('menu');
  for (const [text, url] of Object.entries(suggestions)) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${url}" tabindex="0">${text}</a>`;
    ul.appendChild(li);
  }

  resultsContainer.appendChild(ul);

  // Add keyboard navigation
  const links = ul.querySelectorAll('a');
  let currentIndex = -1;

  function focusLink(index) {
    if (index >= 0 && index < links.length) {
      links[index].focus();
    }
  }

  resultsContainer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % links.length;
      focusLink(currentIndex);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      currentIndex = (currentIndex - 1 + links.length) % links.length;
      focusLink(currentIndex);
    }
  });
}

function handleSearchInput(event) {
  const query = event.target.value;
  const resultsContainer = document.querySelector('.search-dialog-results');

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    if (query.length > 0) {
      fetchSuggestions(query).then(suggestions => {
        if (Object.keys(suggestions).length > 0) {
          displaySuggestions(suggestions, resultsContainer);
        } else {
          resultsContainer.innerHTML = ''; // Clear results if no suggestions
        }
      });
    } else {
      resultsContainer.innerHTML = ''; // Clear results if query is empty
    }
  }, 300); // Slight delay of 300ms
}

function initSearchSuggest() {
  const searchInput = document.querySelector('#SearchDialog input[name="query"]');
  searchInput.addEventListener('input', handleSearchInput);
  searchInput.addEventListener('keydown', (event) => {
    const resultsContainer = document.querySelector('.search-dialog-results');
    if (resultsContainer.innerHTML !== '') {
      resultsContainer.dispatchEvent(new KeyboardEvent('keydown', event));
    }
  });
}

export { initSearchSuggest };