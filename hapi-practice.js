const Hapi = require('hapi');

// this sets the port that hapi runs on
const server = Hapi.server({
    port: 8100,
    host: 'localhost'
});

// actually starts the server 
const init = async () => {
  // inert is a package that lets us serve static assets, recomended by Hapi
  // await server.register(require('inert'));

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// run server 
init();

// these are routes 
// notice how there is no more reply() anymore
// also that h stands for hapi, and it's basically the reply() now 
// however, the file() function is only possible once you use inert 
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
      console.log(h)
      return h.file('./public/index.html');
  }
});

// this is an alterante way to serve static files, 
// server.route({
//   method: 'GET',
//   path: '/picture.jpg',
//   handler: {
//       file: 'picture.jpg'
//   }
// });


server.route({
  method: 'GET',
  path: '/server-info',
  handler: (request, h) => {
    // hapi automatically parse js objects into JSON
    return server.info;
  }
});

server.route({
  method: 'GET',
  path: '/request-info/{variable}',
  handler: (request, h) => {
    console.log('request info', request);
      const goodStuff = {
        params: request.params,
        paramsArray: request.paramsArray,
        path: request.path,
      }
      return goodStuff;
  }
});

server.route({
  method: 'GET',
  path: '/users/{name}',
  handler: (request, h) => {
      // encodeURI is not hapi, it is just escaping any input by the user
      return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
  }
});