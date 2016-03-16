# Lightning-client

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`
* See the deployment section for additional setup

## Running / Development

* `ember server`
* Run redis in a separate terminal `$ redis-server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deployment Setup

This repo uses the [ember-cli-deploy-lightning-pack](https://github.com/ember-cli-deploy/ember-cli-deploy-lightning-pack) for deployment. Using the app locally requires you to have redis running, and you will need a `.env.deploy.development` file to read ENV variables from. For local development your file only needs to have:

```
REDIS_URL=redis://localhost:6379
```

(or whatever your local Redis URL is).

To deploy to a production environment, you will need:

* An AWS S3 Bucket
* A web host (I'm using Heroku)
* A redis instance living somewhere on the interwebs (I'm using the Heroku addon)

You need a separate `.env.deploy.production` file to deploy to production, it should look like this:

```
AWS_KEY=xxxxxxxxxxxxxxxxxxxx
AWS_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REDIS_URL=redis://some-user:some-password@some-host.com:1234
```

Where the KEY/SECRET are credentials to an IAM User in your AWS Account.

- - -

In this repo's `ember-cli-build.js` file, make sure your S3 bucket path is set to the fingerprint prepend option.

For example, my S3 bucket is named `lightning-assets`, and my production fingerprint prepend option is:

```javascript
switch (env) {
  case 'development':
    fingerprintOptions.prepend = 'http://localhost:4200/';
  break;
  case 'production':
    fingerprintOptions.prepend = 'https://s3-us-west-2.amazonaws.com/lightning-assets/lightning-client/';
  break;
}
```

You'll need a bucket policy as well - a minimum policy looks like this:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1457407316264",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::123456789:user/i-am-user-name"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObjectACL",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::lightning-assets/*"
    }
  ]
}
```

Where the `Principal.AWS` is the IAM user that matches your KEY/SECRET credentials in the .env file.

### Deploying

To deploy to production, run:

`$ ember deploy production --verbose`

This will update your remote redis with a new version of `index.html` with updated asset links, and also upload the assets to the `lightning-assets` S3 bucket. It won't be active until you activate it - the log from running `ember deploy production --verbose` should give you a revision number and a command to paste into terminal to activate it. After activating, you can hit the URL for the Rails app and see the updated frontend.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

