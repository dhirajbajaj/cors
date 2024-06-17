# cors forwarding proxy on vercel

A simple Node.js script, you can deploy on Vercel to act as a CORS proxy server, adding the `Access-Control-Allow-Origin` header for GET requests: Feel free to clone and add your use-cases. 



**Deployment on Vercel:**

1. Create a new Vercel project and link your code repository.
2. Make sure the script above is saved as `index.js` in your project root.
3. Create a `vercel.json` file in the root directory with the following content:

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
https://your-vercel-project.vercel.app?url=decodedURI(https://api.example.com/data?param1=param1&p2=p2)
```
This will fetch data from the actual API endpoint (`https://api.example.com/data`), add the necessary CORS headers, and return the response to your application.

IMPORTANT="Make sure to decode the URL parameter componenet" ie. decode the thirs-party API component so that the whole URL is treated as one. Otherwise & will cause more parameters that arent handled in the script.  


**Remember:** 

* Update the `allowedOrigin` variable with the specific origin(s) you want to allow if you don't want to allow all origins (`'*'`).
* Make sure to decode the API endpoint so that all extra parameters are treated as part of URL param. 
* This approach provides basic CORS functionality. Consider security implications if exposing your proxy server publicly.
