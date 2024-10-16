import { Hono } from 'hono';
import { cors } from 'hono/cors'
import home from './pages/Home';
// Dynamically construct the path to the native module
import path from 'path'; // Use require instead of import
const nativeModulePath = path.join(
  __dirname,
  '../Reinforcements/rs/@bunvader/rustacean'
); // my-module
const { fibonacci, sum } = require(nativeModulePath); // Use require() for native module
const clientSrc = path.join(__dirname, '../client', 'index.html');
import { fibonacci2 } from './workers/jsmod';
const figlet = require('figlet');
import { serveStatic } from '@hono/node-server/serve-static';
import { serve } from '@hono/node-server';
import cluster from 'cluster';
import { Worker } from 'worker_threads'; // Import Worker for threading
import os from 'os';
import main from './pages/Main';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

    console.log(
      `Worker ${worker.process.pid} started at ${new Date().toLocaleTimeString()}`
    );
  }

  // Listen for worker exit
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died at ${new Date().toLocaleTimeString()}. Code: ${code}, Signal: ${signal}`
    );
    console.log('Starting a new worker...');
    const newWorker = cluster.fork();
    console.log(
      `Worker ${newWorker.process.pid} started at ${new Date().toLocaleTimeString()}`
    );
  });

  // Display a Figlet message when the master starts
  figlet('Bausch And Lomb', (err: any, data: any) => {
    if (err) {
      console.error('Something went wrong with Figlet...', err);
      return;
    }
    console.log(data); // Show "Server ON" in Figlet style
  });
} else {
  // Workers can share any TCP connection
  const app = new Hono();
  // Restrict CORS to only allow 'http://127.0.0.1:8787'
// List of allowed origins
const allowedOrigins = [
  'https://shyam20001.github.io', // Add your allowed origins here  http://localhost:5173
];

// Middleware to handle CORS and restrict origins
app.use('*', async (c, next) => {
  const origin = c.req.header('origin'); // Get the request's origin

  // Check if the origin is in the allowed origins list
  if (allowedOrigins.includes(origin)) {
    // Apply CORS settings if the origin is allowed
    const corsMiddlewareHandler = cors({
      origin: `${process.env.ORIGIN}` || origin, // Allow this origin
      allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
      credentials: true,
      maxAge: 600,
    });

    // Execute the CORS middleware
    return corsMiddlewareHandler(c, next);
  }

  // If the origin is not allowed, return a 403 Forbidden response
  return new Response('Forbidden: Unauthorized origin', {
    status: 403,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
});

  // Serve static files from the public directory
  app.use('/public/*', serveStatic({ root: './' }));
  //app.use('/workers/web-workers/*', serveStatic({ root: './' }))
  app.use('/client/*', serveStatic({ root: './' }));

  app.use(
    '/service/*',
    serveStatic({
      root: './', // Serve from the correct folder
      // mimes: {
      //   js: 'application/javascript', // Set correct MIME for JS files
      // },
    })
  );

  app.get('/healthz', (c) => {
    return c.text('Hello Hono!');
  });

  app.route('/', home);
  app.route('/', main);

  // RS and JS + workers fn()s
  // console.log(sum(5, 5))
  // console.log(fibonacci(35))
  // console.log(fibonacci2(32))

  ///

  // Function to calculate Fibonacci in a worker
  function calculateFibonacciInWorker(n: number): Promise<number> {
    return new Promise((resolve, reject) => {
      // Construct the path to the worker script
      const workerPath = path.join(
        __dirname,
        '../workers/server-workers',
        'jsworker.mjs'
      );

      // Create a new worker
      const worker = new Worker(workerPath, {
        workerData: { n },
      });

      worker.on('message', (result) => resolve(result));
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  // Example endpoint to get Fibonacci result
  app.get('/fibonacci/:n', async (c) => {
    const n = parseInt(c.req.param('n') || '0', 10);
    try {
      const result = await calculateFibonacciInWorker(n);
      return c.json({ result }, 200);
    } catch (error) {
      console.error('Error calculating Fibonacci:', error);
      return c.json({ err: `ran into error =>> ${error}` }, 500);
    }
  });

  // rs endpoint
  app.get('/rust-rs', async (c) => {
    let val = fibonacci(30);
    return c.json({ msg: `RUST -> ${val}` }, 200);
  });

  app.get('/node-js', async (c) => {
    let val = fibonacci2(30);
    return c.json({ msg: `NODE -> ${val}` }, 200);
  });

  // ##
  app.get('/client', async (c) => {
    return c.html(clientSrc);
  });

  // # Health Check

  app.get('/healthz', async (c) => {
    return c.json({ msg: `Server is Healthy` })
  })

  const port: any = process.env.PORT || '3549';
  console.log(`Worker ${process.pid} running on port ${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}
