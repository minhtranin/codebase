# ![VeewMe](https://veewme.com/static/img/veewme-tour-hosting-platform.svg)

## Hacking

```
$ npm install
$ npm run dev
```

### Using docker

```
(terminal 1)
$ npm run docker:up
Attaching to veewme2_prisma_1, veewme2_dev_1, veewme2_postgres_1
...

(terminal 2)
$ npm run docker:attach
$ npm install
$ npm run dev
```

### Build configuration

Build configuration is read from process' environment and `.env*` files. Env files are chosen based on `NODE_ENV` value. The order of precedence for variables is following (most important are first): 1. `process.env`, 2. `.env.${NODE_ENV}.local`, 3. `.env.${NODE_ENV}`, 4. `.env`. Variables must be defined in `.env` in order to be read from other sources. Some commands set default `NODE_ENV` if not provided via `process.env` (see scripts inside `package.json`). `.env.*.local` files are ignored by git.

Examples:

`npm run build:prod` will read variables from `process.env`, `.env.production.local`, `.env.production`, `.env` (in that order).

`npm run dev` will read variables from `process.env`, `.env.development.local`, `.env.development`, `.env` (in that order).

#### TL;DR

If you want to change HTTP port for dev environment set `SERVER_HTTP_PORT=8123` in `.env.development.local`.

## GraphQL

### Adding new operations and data types

1. Add new data type in Prisma's data model file.

```
type DemoThing {
  id: ID! @id
  foo: String
  bar: Int!
}
```

2. Add signatures for operations in GraphQL's schema (`src/lib/graphql/schema.graphql`).

```
type Mutation {
  createDemoThing(data: DemoThingCreateInput!): DemoThing!
}

type Query {
  demoThings(where: DemoThingWhereInput, orderBy: DemoThingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DemoThing]!
}
```

3. Write queries and mutations

```
export const CreateDemoThing = gql`
  mutation createDemoThing($foo: String, $bar: Int!) {
    createDemoThing(data: {
      foo: $foo
      bar: $bar
    }) {
      id
      foo
      bar
    }
  }
`

export const AllDemoThings = gql`
  query allDemoThings {
    demoThings {
      id
      foo
      bar
    }
  }
`
```

4. Add resolvers

You can directly proxify requests to prisma by setting `forwardTo('prisma')` as a resolver.

In most cases though, you'll need [Prisma Client](https://www.prisma.io/docs/prisma-client/).

```
 resolvers: ResolversRequired = {
    Mutation: {
      createDemoThing: forwardTo('prisma')
    },
    Query: {
      demoThings: forwardTo('prisma')
    }
 }
```

5. Run `npm run prisma:generate` to update models.

### Configuration options

- `GRAPHQL_MOCKS` - serve mocks instead of getting data from Prisma if true. Mocks can be overriden in `src/server/mocks.ts`.

### Using non-local Prisma server

Set the following variables:

```
GRAPHQL_MOCKS=false
PRISMA_MANAGEMENT_API_SECRET=uEcrX2dPQ96QpAkmr3NI9
PRISMA_HOST=35.237.42.90
PRISMA_STAGE=some-identifier-like-your-name
```

To deploy changes (TODO as for now you need to list env variables by hand, sorry about that):

```
PRISMA_MANAGEMENT_API_SECRET=uEcrX2dPQ96QpAkmr3NI9 PRISMA_HOST=35.237.42.90 PRISMA_STAGE=some-identifier-like-your-name npm run prisma:deploy
```

### Important files

- `src/lib/graphql/datamodel.prisma` - Prisma's schema, database tables, GraphQL types, and orm api are inferred from it
- `src/lib/graphql/schema.graphql` - GraphQL api definition. Every operation must be defined or imported there
- `src/lib/graphql/queries.ts` - list of all frontend queries and mutations
- `src/lib/graphql/seed.graphql` - initial data seed

## Submitting new code

1. Create a pull request.

2. Request a review and wait for comments/acceptance.

3. (As a reviewer) Accept or deny the changes.

4. Submit fixes or reply to comments. Go back to 2. Please remember to re-request a review.

Pull requests should be working and finished entities. They should be properly named, all commits must pass tests/linting, there should be no new functionality added unless the PR is marked as \[WiP\].

Pull requests must be rebased against `master` branch. **No merge commits**. When adding fixes to your own PR it's usually better to amend previous commits and force push changes. Don't litter the repository with fix commits.

A commit should cover exactly what's stated in its message. If there are a couple named changes the commit should probably be split. Commits introducing large pieces of code are fine if they cover one functionality (e.g. a subpage) - no need to split them. Each introduction of a potentially reusable code, like a common component or util function, deserves a separate commit. Short one-sentence descriptions are usually enough. Use imperative (_Add sth_ instead of _Added sth_).

If you add something temporarily or know your code won't work in some cases - add a TODO comment. If you paste something from Stack Overflow add a link to it.

Please read [On commit messages (Who-T)](http://who-t.blogspot.com/2009/12/on-commit-messages.html) and adhere to it.

## Style guide

- We use [StandardJS](https://standardjs.com/).
- Avoid lodash. It doesn't play well with typescript. Use ramda instead.

## DevOps

### Setting up CircleCI

1. Create service user in Google Cloud.

```
gcloud iam service-accounts create circleci
gcloud projects add-iam-policy-binding veewme2 --member "serviceAccount:circleci@veewme2.iam.gserviceaccount.com" --role "roles/owner"
gcloud iam service-accounts keys create circleci-key.json --iam-account circleci@veewme2.iam.gserviceaccount.com
gcloud iam service-accounts keys list --iam-account circleci@veewme2.iam.gserviceaccount.com
```

2. Create GitHub API token.

3. Create service user in Amazon AWS.

```
aws iam create-user --user-name circleci
aws iam attach-user-policy --user-name circleci --policy-arn arn:aws:iam::aws:policy/AdministratorAccess
aws iam create-access-key --user-name circleci
```

4. Go to CircleCI project settings and set:

  - `GCLOUD_KEY` (filled with `circleci-key.json` contents)
  - `GITHUB_TOKEN` (GitHub API token)
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `PRISMA_MANAGEMENT_API_SECRET`

And select `Only build pull requests` option.

## Resources

### Git

- [Pro Git](https://git-scm.com/book/en/v2)
- [On commit messages (Who-T)](http://who-t.blogspot.com/2009/12/on-commit-messages.html)
- [Writing good commit messages (Erlang/OTP)](https://github.com/erlang/otp/wiki/writing-good-commit-messages)
- [A tidy, linear Git history](http://www.bitsnbites.eu/a-tidy-linear-git-history/)
- [Git Linear Flow](http://git.ninja/)
- [Keep a readable Git history](https://fangpenlin.com/posts/2013/09/30/keep-a-readable-git-history/)
- [Merging vs. Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

### TypeScript

- [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/)
- [TypeScript playground](https://stackblitz.com/edit/typescript-playground)

### React + TypeScript

- [Awesome TypeScript -> React](https://github.com/dzharii/awesome-typescript#react)
- [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)
- [react-typescript-cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)
- [react-typescript-samples](https://github.com/Lemoncode/react-typescript-samples)

### GraphQL

- [GraphQL cheatsheet](https://devhints.io/graphql)

### DevOps

#### CircleCI configs

- [CircleCI-Public/circleci-demo-k8s-gcp-hello-app](https://github.com/CircleCI-Public/circleci-demo-k8s-gcp-hello-app/blob/master/.circleci/config.yml)
- [eddiewebb/circleci-multi-cloud-k8s](https://github.com/eddiewebb/circleci-multi-cloud-k8s/blob/master/.circleci/config.yml)
- [kubeapps/kubeapps](https://github.com/kubeapps/kubeapps/blob/master/.circleci/config.yml)
- [poldracklab/fmriprep](https://github.com/poldracklab/fmriprep/blob/master/.circleci/config.yml)

#### Kubernetes

- [A Kubernetes quick start for people who know just enough about Docker to get by](https://blog.sourcerer.io/a-kubernetes-quick-start-for-people-who-know-just-enough-about-docker-to-get-by-71c5933b4633)
