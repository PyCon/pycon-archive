PyCon Historical Archive
========================

The final resting place for PyCon websites.

In order to better preserve things, we crawl each year's PyCon website to static HTML after the conference ends.

See https://web.archive.org/web/20220926122034/https://gerg.ca/blog/post/2013/archiving-pycon/ 
for tips on producing good archival copies.

## Archiving a year

1. Start a new branch from current `main`. Keep any database backup private and outside this repository.
2. Crawl the live English and Spanish sites anonymously into a separate temporary directory. Never run the crawler in this checkout: its cleanup can remove earlier archives.

   For example, using HTTrack:

   ```sh
   YEAR=2026
   OUT="$(mktemp -d)"
   httrack "https://us.pycon.org/${YEAR}/" \
     "https://us.pycon.org/es/${YEAR}/" \
     "https://us.pycon.org/${YEAR}/schedule/" \
     "https://us.pycon.org/${YEAR}/schedule/posters/" \
     "https://us.pycon.org/${YEAR}/schedule/conference.json" \
     -O "$OUT" -N0 -K4 -c2 -T30 -R1 -b0 -q -I0 \
     '-*' "+us.pycon.org/${YEAR}/*" "+us.pycon.org/es/${YEAR}/*" \
     "+pycon-assets.s3.amazonaws.com/${YEAR}/media/*" \
     "-*/accounts/*" "-*/admin*" "-*/cms*" "-*/api/*" \
     "-*/registration/*" "-*/registripe/*" "-*/signup/*" \
     "-*/utils/*" "-*/travel_grants/*" "-*/applications/apply/*" \
     "-*/schedule/pretalx/*" "-*/schedule/tech/*" "-*/schedule/ox/*" \
     "-*/schedule/streamkeys/*" "-*/schedule/slides/upload/*" \
     "-*/schedule/*/signup/*" "-*/schedule/*/edit/*" "-*?*"
   ```

3. Check the crawl's response log; publish successful responses, not generated error or login-redirect placeholders. Complete missing public pages and assets, including JavaScript module imports, CSS dependencies, webmanifest icons, public media, and sponsor logos. Save `schedule/conference.json` explicitly and use its presentation and speaker URLs to check coverage.
4. Assemble HTML under `YEAR/` and `es/YEAR/`, preserving public paths. Rewrite mirrored asset references locally, home/logo links to `/YEAR/`, and translation links to the appropriate language. Use absolute archive-host URLs for mirrored assets in JSON. Add an archive notice and remove or disable account, registration, search, and submission controls; preserve client-side navigation and schedule tabs.
5. Serve the repository root with `python3 -m http.server`. Check internal links, fragments, asset responses, JSON, both languages, desktop/mobile navigation, schedules, presentations, and speaker pages in a browser.
   Jekyll excludes underscore-prefixed filenames by default. Add any required mirrored assets with those names to `_config.yml`'s `include` list and check them after deployment.
6. Merge into `main`; GitHub Pages publishes the repository root at `https://pycon-archive.python.org/`. Verify the deployed archive before changing Fastly's current-year routing in `pycon-site/infra/main.tf`. Publishing here does not change that routing.

### 2026 snapshot

The 2026 capture includes English and Spanish pages, the public conference JSON, and locally mirrored PyCon media, PSF sponsor logos, and Font Awesome assets. It was assembled from HTTrack's successful responses and supplemented for missing dependencies.

Account-dependent calendar links and submission controls are unavailable in the static archive. Repairs also correct malformed sprint links, the joint Djangonaut Space keynote anchor, and the auction page's unfinished PDF iframe. External websites, Google Maps, and YouTube embeds remain external.
