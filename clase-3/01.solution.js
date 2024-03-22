import http from 'http';

const PORT = 3000;

const server = http.createServer((request, response) => {
      response.write("estoy en el server");
      console.log(request.url);
      response.end();
});

server.listen(PORT, () =>{
    console.log("el servidor ya arranco")

});