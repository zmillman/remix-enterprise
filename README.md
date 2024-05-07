# Remix.run Enterprise Boilerplate

Inspired by [Blazity/next-enterprise](https://github.com/Blazity/next-enterprise), this sets you up with a boilerplate app that's ready for enterprise app development. This template pre-implements a skeleton app with support for Google Oauth login with users segmented by their organization's email domain.

## Features

With this template, you get a full app stack:

- [Remix](https://remix.run/) on [Express](https://expressjs.com/) - Fast and developer-friendly
- [Joy UI](https://mui.com/joy-ui/getting-started/) - MUI's customizable component library
- [Remix Auth](https://github.com/sergiodxa/remix-auth) - Authentication through [several providers](https://github.com/sergiodxa/remix-auth/discussions/111) ([Auth.js](https://authjs.dev/) would be preferred but doesn't integrate with Remix...[yet](https://authjs.dev/getting-started/integrations))
- [Prisma](https://www.prisma.io/) - Easy persistence management
- [Postgres](https://www.postgresql.org/) - The most popular SQL database
- TBD - For running async jobs

Development:

- [Extremely strict TypeScript](https://www.typescriptlang.org/) - With [ts-reset](https://github.com/total-typescript/ts-reset) library for ultimate type safety
- [Jest](https://jestjs.io/) - For running test suites
- [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) - For clean, consistent, correct code
- [VSCode configuration](https://code.visualstudio.com/docs/getstarted/settings) - For quick developer onboarding
- [Docker compose](https://docs.docker.com/compose/) - For running infrastructure locally

Production:

- [AWS CDK](https://aws.amazon.com/cdk/) - Deploy on AWS
- TODO - Observability
- TODO - Exception reporting

## Getting Started

To get started with this boilerplate, follow these steps:

1\. Fork & clone the repository

```sh
git clone https://github.com/{your_username}/remix-enterprise
```

2\. Install the dependencies

```sh
npm install
```

3\. Follow the steps on [the Google documentation](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred) to configure a new application and get a client ID and secret. (The callback url is `http://localhost:3000/auth/google/callback`)

```sh
# .env
GOOGLE_CLIENT_ID=<your client id>
GOOGLE_CLIENT_SECRET=<your client secret>
```

Then configure a secret for encrypting session cookies:

```sh
echo "AUTH_SECRET=`openssl rand -base64 33`" >> .env
```

And some settings for the database:

```sh
# .env
DATABASE_USER=app
DATABASE_DB=app
DATABASE_PASSWORD=S3cre7 # arbitrary secret
DATABASE_URL="postgresql://app:S3cre7@localhost:5432/app?schema=public"
```

4\. Start the local [Docker](https://docs.docker.com/desktop/install/mac-install/) services...

```sh
npm run dev:docker
```

...then open a new tab and populate the DB schema:

```sh
npx prisma migrate deploy
```

5. Run the dev server and open [localhost:3000](http://localhost:3000/):

```sh
npm run dev
```

## Developer workflow

- `npm run dev` run the app in dev mode (hot module refresh)
- `npm run start` run the app in production mode
- `npm run test` perform the jest unit tests
- `npm run lint` run linters
- `npm run prettier` run prettier (and `npm run prettier:fix` to apply the changes)
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## Going to production

TODO: Take more inspo from https://github.com/wikka/aws-cdk-demo

Before you start trying out this code by yourself, make sure you have:

- An AWS account: https://portal.aws.amazon.com/billing/signup#/start
- Credentials setup: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds
- Installed `aws-cdk` globally: `npm install -g aws-cdk` https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html
