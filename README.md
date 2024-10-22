# Webflow template

`jQuery` is already installed and declared as an external dependency.

## Files structure & How to use

Write compponent specific code in the components folder, main.js will dynamically load it in dependant on if there is an element on the page with the name of the js file. eg. slider.js will look for [data-slider], if it exists it will dynamicallly import that code. Just add files to the component folder and you're golden. Use camelCase and data-* so you can use the dataset api (if you want to)


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
  	s.onload = () => document.dispatchEvent(event)
}
const urlParams = new URLSearchParams(window.location.search);
const debug = urlParams.get("debug");
const path = window.location.pathname.split("/")[1];

if (debug !== null) {
	addScript('client', "http://localhost:3000/@vite/client", true);
	addScript('main',"http://localhost:3000/src/main.js", true);
  	console.log('debug mode activated')
} else {
	const prodUrl = "https://dynamic-code.vercel.app";
	addScript('main', `${prodUrl}/main.js`, true);
}
  
  // keyboard shortcut to debug mode
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'd') {
        event.preventDefault(); // Prevent the default action (e.g., bookmarking the page)
        
        let currentUrl = window.location.href;
        let newUrl;

        if (currentUrl.includes('?')) {
            // If there are already query parameters, append the new one
            if (currentUrl.includes('debug=true')) {
                // If debug=true is already present, do nothing or alert
                alert('Debug mode is already enabled.');
                return;
            }
            newUrl = currentUrl + '&debug=true';
        } else {
            // If no query parameters are present, add the first one
            newUrl = currentUrl + '?debug=true';
        }

        window.location.href = newUrl;
    }
    });
  
  </script>
```

