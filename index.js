addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Handles incoming anchor elements.
 */
class AnchorElementHandler {
  element(element) {
    const attribute = element.getAttribute('href');
    element.setAttribute(
      'href',
      attribute.replace('cloudflare.com', 'linkedin.com/in/camilapretiz')
    );
    element.setInnerContent('Go to Camila\'s Linkedin!');
  }
}

const htmlRewriter = new HTMLRewriter().on('a#url', new AnchorElementHandler());

/**
 * Response with random variant page content.
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  const responseJson = await response.json();
  const urls = responseJson['variants'];
  const index = Math.floor(Math.random() * 2);
  const variantResponse = await fetch(urls[index]);
  return htmlRewriter.transform(variantResponse);
}
