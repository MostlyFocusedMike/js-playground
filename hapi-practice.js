const Hapi = require('hapi');
const Path = require('path');
// this sets the port that hapi runs on
const server = Hapi.server({
    port: 8100,
    host: 'localhost',
    routes: {
      files: {
          relativeTo: Path.join(__dirname, "public") // this sets the relative path base for files
      }
    }
});

// actually starts the server 
const init = async () => {

  // this is how to add multiple plugins
  // inert is a package that lets us serve static assets, recomended by Hapi
  // hapi-pino is a pretty logger
  await server.register([
    {
      plugin: require('hapi-pino'),
      options: {
          prettyPrint: true, // false would just give an array with no newlines added, but seems to offer a little more info
          logEvents: ['pid','response', 'onPostStart']
      }
    },
    require('inert')
  ]);
  // this is how to do a single one; it's either an object, or an array of objects
  // await server.register(require('inert'));

  // with hapi-pino, we get nice logs without this anymore
  await server.start();
  // console.log(`Server running at: ${server.info.uri}`);
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
      return h.file('index.html'); // this goes from the root of the project. see tutorial for relative paths
  }
});

// this is an alterante way to serve static files, 
// see more https://hapijs.com/tutorials/serving-files
// this will show you how to set relative paths
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