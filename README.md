# Remix.run Enterprise Boilerplate

Inspired by https://github.com/Blazity/next-enterprise

## Features

With this template, you get a full app stack:

- [Remix](https://remix.run/) on [Express](https://expressjs.com/) - Fast and developer-friendly
- [Joy UI](https://mui.com/joy-ui/getting-started/) - MUI's customizable component library
- [Authjs](https://authjs.dev/) - Integration with all the big auth providers
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

1. Fork & clone the repository

```sh
git clone https://github.com/{your_username}/remix-enterprise
```

2. Install the dependencies

```sh
npm install
```

3. Run the dev server and open [localhost:3000](http://localhost:3000/)

```sh
npm run dev
```

## Developer workflow

- `npm run dev` run the app in dev mode (hot module refresh)
- `npm run start` run the app in production mode
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## Going to production

TODO: Take more inspo from https://github.com/wikka/aws-cdk-demo

Before you start trying out this code by yourself, make sure you have:

- An AWS account: https://portal.aws.amazon.com/billing/signup#/start
- Credentials setup: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds
- Installed `aws-cdk` globally: `npm install -g aws-cdk` https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html
