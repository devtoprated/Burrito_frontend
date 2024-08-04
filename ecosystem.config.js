module.exports = {
    apps: [
      {
        name: 'burrito-api',
        script: 'dist/main.js',
        env: {
          PORT: 3002, // Specify the port you want to use
          NODE_ENV: 'development', // Other environment variables can go here
        },
      },
    ],
  };
  