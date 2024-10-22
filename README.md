# Webflow template

`jQuery` is already installed and declared as an external dependency.

## Files structure & How to use

Write compponent specific code in the components folder, main.js will dynamically load it in dependant on if there is an element on the page with the name of the js file. eg. slider.js will look for [data-slider], if it exists it will dynamicallly import that code. Just add files to the component folder and you're golden.


## How to use with Webflow

Add the folllowing code in the global custom code of the project:

```js
<script>
function addScript(key, src, module) {
    const s = document.createElement("script");
    if (module) s.setAttribute("type", "module");
    s.setAttribute("src", src);
    document.body.appendChild(s);
    const event = new Event(`${key}ScriptLoaded`);
    s.onload = () => document.dispatchEvent(event);
}

const urlParams = new URLSearchParams(window.location.search);
const debug = urlParams.get("debug");
const path = window.location.pathname.split("/")[1];

// Check if the domain contains ".webflow.io"
if (window.location.hostname.includes('.webflow.io')) {
    if (debug !== null) {
        addScript('client', "http://localhost:3000/@vite/client", true);
        addScript('main', "http://localhost:3000/src/main.js", true);
        console.log('debug mode activated');
    } else {
        const prodUrl = "https://dynamic-code.vercel.app";
        addScript('main', `${prodUrl}/main.js`, true);
    }

    // Ctrl+D for toggling debug
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'd') {
            event.preventDefault(); // Prevent the default action (e.g., bookmarking the page)

            let currentUrl = window.location.href;
            let newUrl;

            if (currentUrl.includes('debug=true')) {
                // If debug=true is present, remove it to toggle off
                newUrl = currentUrl.replace(/(\?|&)debug=true(&|$)/, (match, p1, p2) => p1 === '?' && !p2 ? '?' : p2 ? p1 : '');
            } else {
                // If debug=true is not present, add it to toggle on
                if (currentUrl.includes('?')) {
                    newUrl = currentUrl + '&debug=true';
                } else {
                    newUrl = currentUrl + '?debug=true';
                }
            }

            window.location.href = newUrl;
        }
    });
}
  </script>
```

