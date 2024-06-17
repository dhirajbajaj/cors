# cors forwarding proxy on vercel

A simple Node.js script, you can deploy on Vercel to act as a CORS proxy server, adding the `Access-Control-Allow-Origin` header for GET requests: Feel free to clone and add your use-cases. 

```javascript
const express = require('express');

const app = express();

// Replace '*' with your desired allowed origin(s)
const allowedOrigin = '*';

app.get('*', (req, res) => {
  const targetUrl = req.url.slice(1); // Remove leading slash

  fetch(targetUrl)
    .then(response => response.json())
    .then(data => {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', req.headers['content-type']); // Reflect original headers
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching data');
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
```

**Explanation:**

1. **Imports:** We import the `express` library for creating the server.
2. **Server Setup:** We create an Express app instance.
3. **Allowed Origin:** Define the allowed origin(s) for the `Access-Control-Allow-Origin` header. Replace `'*'` with the specific domains you want to allow access from.
4. **GET Request Handler:** We define a route handler for all GET requests (`app.get('*'`).
5. **Extract Target URL:** We extract the target URL from the request path by removing the leading slash (`req.url.slice(1)`)
6. **Fetch Data:** We use `fetch` to retrieve data from the target URL.
7. **Add CORS Headers:**  
    - `Access-Control-Allow-Origin`: Set to the allowed origin(s).
    - `Access-Control-Allow-Methods`: Set to `GET` to allow only GET requests.
    - `Access-Control-Allow-Headers`: We reflect the original `Content-Type` header from the request to ensure compatibility.
8. **Respond with Data:** If successful, we send the fetched data as JSON with the added CORS headers.
9. **Error Handling:** We handle any errors during data fetching and send a generic error message to the client.
10. **Start Server:** We listen on the specified port (environment variable `PORT` or default 3000) and log a message when the server starts.

**Deployment on Vercel:**

1. Create a new Vercel project and link your code repository.
2. Install the `express` package using `npm install express` in your project directory.
3. Make sure the script above is saved as `index.js` in your project root.
4. Create a `vercel.json` file in the root directory with the following content:

```json
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ]
}
```

This configuration tells Vercel to use the `@vercel/node` builder for your `index.js` file.

5. Deploy your project to Vercel.

**Usage:**

Once deployed, you can use the Vercel URL of your project as a proxy for your actual API endpoint. For example, if your API endpoint is `https://api.example.com/data` and your Vercel URL is `https://your-vercel-project.vercel.app`, you can access the data with CORS headers by sending a GET request to:

```
https://your-vercel-project.vercel.app/https://api.example.com/data
```

This will fetch data from the actual API endpoint (`https://api.example.com/data`), add the necessary CORS headers, and return the response to your application.

**Remember:** 

* Update the `allowedOrigin` variable with the specific origin(s) you want to allow if you don't want to allow all origins (`'*'`).
* This approach provides basic CORS functionality. Consider security implications if exposing your proxy server publicly.
