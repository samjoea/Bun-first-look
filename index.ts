const server = Bun.serve({
   port: 4000,
   fetch(req) {
      const url = new URL(req.url);
      if (url.pathname === "/") {
         return new Response("Hello Bun! 🐰 from Deno and Node.js")
      }

      if (url.pathname === "/json") {
         throw new Error("Error from Bun")
      }

      if (url.pathname === "/html") {
         return new Response("<h1>Hello Bun! 🐰 from Deno and Node.js</h1>", {
            headers: {
               "content-type": "text/html"
            }
         })
      }

      if (url.pathname === "/greet") { 
         return new Response(Bun.file("./greet.txt"))
      }

      return new Response("Not found", { status: 404 })
   },
   error(err) {
      return new Response(err.message, { status: 500, headers: { "content-type": "text/plain" } })
   }
});

console.log(`Listening on PORT http://localhost:${server.port}`)