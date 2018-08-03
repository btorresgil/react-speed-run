# Speed Run from React Meetup

This was a random experiment at a React Meetup group hosted by [FullStack Labs](https://www.fullstacklabs.co/).

I volunteered to build an app deployed in production in front of the group, with backend database, GraphQL API, user
authentication, and React front-end... in under 10 minutes. Partly so folks could learn something from seeing the whole
process beginning-to-end while tying together several topics we'd been chatting about, and partly to see if I could do it that fast!

**Spoiler alert:** I couldn't.  I did build the app, but it took over 10 minutes, about 22 minutes, and we had
to cut user authentication. Ironically similar to most software projects, it was past deadline and scope-reduced before
delivery.

Even so, it was fun to try, see what was possible, and learn some things in the process!

Here's a flimsy explanation of what I built during this speed run:

#### Architecture

```
React Frontend
      |
      |
 GraphQL API
      |
      |
   Database
```

#### Serverless

I don't like patching servers, configuring server software, paying for compute no one is using, manually scaling
services, or troubleshooting anything except my app code, so I made the architecture entirely
[serverless](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9).

This approach makes the app scale as big as I want automatically and costs me nothing to host.. as long as I have zero users.

#### Technologies

The frontend is created with [create-react-app](https://github.com/facebook/create-react-app), hosted on [AWS S3](https://aws.amazon.com/s3/) and
served on CDN via [AWS CloudFront](https://aws.amazon.com/cloudfront/). The GraphQL API is served by [AWS
AppSync](https://aws.amazon.com/appsync/) while [AWS Amplify](https://aws-amplify.github.io/amplify-js/index.html) and
[Apollo Client](https://www.apollographql.com/docs/react/) are used in the frontend to connect to the API. The database is [AWS
DynamoDB](https://aws.amazon.com/dynamodb/).

*Side note on cloud infrastructure providers*: I'm not trying to advocate for AWS here. Choose the cloud platform that makes sense for you. AWS is
currently way ahead in serverless features, so I chose them because they have the features I need, but every cloud
platform has something unique to offer.

#### Build a production app from scratch

I used these commands on the terminal to create this app:

```bash
yarn create react-app speedrun
cd speedrun/
awsmobile init
awsmobile features  # In the menu, I selected AppSync
awsmobile push  # This creates the backend which starts the GraphQL server

# Now I logged into AWS AppSync and clicked 'Create Resource'.
# I created 2 resources, one called Meetups and one called Attendee
# Note that Meetups should be singular ('Meetup'), but hey, it's a speed run, can't be perfect.
# Now you have 2 DynamoDB tables and a bunch of GraphQL fields and resolvers
# I also configured AppSync for API Key authentication at this point when I decided to cut AWS Cognito User Auth

awsmobile pull  # Bring down your changes you made in the AWS console into your app

# Next add all the libraries you'll need
yarn add aws-amplify aws-amplify-react apollo-boost graphql graphql-tag react-apollo aws-appsync aws-appsync-react

# Now add some app code such as configure Amplify, create an Apollo Provider, and a Query to pull from the database

# Don't forget to add some sample data to your DynamoDB tables.

# Test the app
yarn start

# Deploy the app in production
awsmobile publish
```

Boom!  You got an app in production with frontend and backend.  This app is completely free to host in the AWS Free Tier
and can scale to as many users as Hacker News can send you, if you simply turn on autoscale for DynamoDB.

*Security Note:* You shouldn't run AppSync in API Key mode for long as this isn't secure. Just use it to test.

Maybe someday I'll turn this into a cohesive Medium post, or maybe not.  Until that hypothetical day you'll have to
decipher my comment-less code. Enjoy!
