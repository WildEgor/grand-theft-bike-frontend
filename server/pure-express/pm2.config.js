module.exports = {
    apps: [{
      name        : 'app-server',
      script      : './dist/server.js',
      combine_logs: 'combined.log',
      output      : 'NULL',
      error       : './dist/log',
      merge_logs  : true,
      watch       : ['dist'],
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
          NODE_ENV: "development",
      }
    }]
};