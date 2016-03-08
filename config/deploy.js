const VALID_DEPLOY_TARGETS = [
  'development',
  'production',
  'development-postbuild'
];

// http://blog.isleofcode.com/getting-started-with-ember-cli-deploy-and-lightning-pack/
// https://www.youtube.com/watch?v=fcSL5poJ1gQ
// https://github.com/ghedamat/ember-deploy-demo

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    pipeline: {},
    redis: {
      url: process.env.REDIS_URL,
      allowOverwrite: true,
      keyPrefix: 'lightning-client:index'
    },
    s3: {
      prefix: 'lightning-client'
    }
  };
  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    ENV.pipeline.activateOnDeploy = true;
    ENV.plugins = ['build', 'redis'];
    ENV.redis.revisionKey = 'development';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3.accessKeyId = process.env.AWS_KEY;
    ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = 'lightning-assets';
    ENV.s3.region = 'us-west-2';
  }

  if (deployTarget === 'development-postbuild') {
    ENV.plugins = ['redis'];

    ENV.build = {
      environment: 'development'
    };

    ENV.redis = {
      keyPrefix: 'lightning-client:index',
      revisionKey: '__development__',
      allowOverwrite: true,
      host: 'localhost', // this can be omitted because it is the default
      port: 6379, // this can be omitted because it is the default
      distDir: function(context) {
        return context.commandOptions.buildDir;
      }
    };
  }

  return ENV;

  // LEFT OFF HERE:
  // try ember deploy production to see if assets go into S3 and see if Redis gets the index.
  // then redeploy the rails app to see if it can read the index file from redis.

  /* Note: a synchronous return is show above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */
}
