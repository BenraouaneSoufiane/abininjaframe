module.exports = {
    apps: [
      {
        name: 'NextAppName2',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: 'tsx',
        args: 'server.ts',
        env_local: {
          APP_ENV: 'local' // APP_ENV=local
        },
        env_dev: {
          APP_ENV: 'dev' // APP_ENV=dev
        },
        env_prod: {
          APP_ENV: 'prod' // APP_ENV=prod
        }
      }
    ]
  }