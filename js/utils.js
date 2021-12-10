/**
 * Sanitize and encode all HTML in a user-provided/API-provided string. This does not allow for any HTML nodes.
 *
 * @param  {String} str  The provided string (from the user or an API)
 * @return {String} The sanitized string
 */
function sanitizeHTML(str) {
  return str.replace(/[^\w-. ]/gi, (s) => `&#${s.charCodeAt(0)};`);
}

/**
 * Parse a category title and convert it into a suitable URL. Also used on the "category" page to help build button IDs
 *
 * @param  {String} catTitle  The provided title of the category (these are all defined by us)
 * @return {String} The URL-ified string
 */
function categoryToUrl(catTitle) {
  return catTitle.replace(/\s/g, '-').replace(/&/g, 'and').toLowerCase();
}
