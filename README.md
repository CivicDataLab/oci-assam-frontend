<h1 align="center">Public Procurement Explorer - Assam</h1>
<p align="center">In collaboration between <a href="https://civicdatalab.in/">CivicDataLab</a> and <a href="https://www.open-contracting.org/implement/lift/">Open Contracting Partnership</a></p>
<br/>
<p align="center">
<img alt="" src="https://github.com/CivicDataLab/oci-assam-frontend/raw/main/public/assets/images/CDLxOCP.png"/>
<br/>
<br/>
<a href="https://github.com/CivicDataLab/oci-assam-frontend/blob/main/LICENSE">
<img alt="MIT License" src="https://img.shields.io/apm/l/atomic-design-ui.svg?"/>
</a>
</p>
<p align="center">A data-driven tool to enable public officials in the state of Asaam to make smarter, data-informed decisions about public spending</p>

- [Features](#features)
- [Getting Started](#getting-started)
- [Guide](#guide)
  - [Styling 🎨](#styling-)
  - [Backend](#backend)
  - [Pages](#pages)
  - [Data fetching](#data-fetching)
    - [i18n configuration](#i18n-configuration)
    - [Pre-fetch data in the server-side](#pre-fetch-data-in-the-server-side)
    - [Access data from a component](#access-data-from-a-component)
- [Developers](#developers)
  - [Boot the local instance](#boot-the-local-instance)
  - [Architecture](#architecture)
- [Contributing](#contributing)
- [Credits](#credits)

## Features

- 🗺️ Unified sites: present data and content in one seamless site, pulling datasets from a DMS (e.g. CKAN) and content from a CMS (e.g. wordpress) with a common internal API.
- ♿ Accessible: The platform is screen-reader friendly.
- 👩‍💻 Developer friendly: built with NextJS, SASS, GraphQL to make the developer experience a treat.
- 🚀 ITCSS & BEM: Combination of BEM methodology and ITCSS architecture to better organize the styling and make it scalable.
- 📋 Typescript: Developed usign typescript to improve development experience by catching errors and providing fixes.
- 🧱 Extensible: quickly extend and develop/import your own React components
- 📝 Well documented: full set of documentation plus the documentation of NextJS and Apollo

## Getting Started

Install a recent version of Node. Node 16 is recommended.

## Guide

### Styling 🎨

We use SASS preprocessor to manage styling. All of it can be found at `/styles` directory where it's managed by using ITCSS architecture to make it scalable. For naming, we use BEM methodology.


### Backend

You can connect CMS and DMS backends easily via environment variables:

```console
$ export DMS=http://ckan:5000
$ export CMS=http://myblog.wordpress.com
```

> Note that we don't yet have implementations for the following CKAN features:
>
> - Activities
> - Auth
> - Groups

### Pages

- Home `/`
- Dataset lisitng `/datasets`
- Tender `/datasets/[tender]`
- KPI listing `/kpi`
- KPI Analysis `/kpi/[analysis]`
- Stories `/stories`
- About `/about`

### Data fetching

We use Apollo client which allows us to query data with GraphQL. We have setup CKAN API for the demo (it uses demo.ckan.org as DMS):

Note that we don't have Apollo Server but we connect CKAN API using [`apollo-link-rest`](https://www.apollographql.com/docs/link/links/rest/) module. You can see how it works in [lib/apolloClient.ts](https://github.com/civicdatalab/opubfront-haq/blob/main/lib/apolloClient.ts) and then have a look at [pages/_app.tsx](https://github.com/civicdatalab/opubfront-haq/blob/main/pages/_app.tsx).

For development/debugging purposes, we suggest installing the Chrome extension - https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm.

#### i18n configuration

This is configured by default to support both `English` and `French` subpath for language translation. But for subsequent users, this following steps can be used to configure i18n for other languages;

1.  Update `next.config.js`, to add more languages to the i18n locales

```js
i18n: {
  locales: ['en', 'fr', 'nl-NL'], // add more language to the list
  defaultLocale: 'en',  // set the default language to use
},
```

2. Create a folder for the language in `locales` --> `locales/en-Us`

3. In the language folder, different namespace files (json) can be created for each translation. For the `index.js` use-case, I named it `common.json`

```json
// locales/en/common.json
{
   "title" : "Portal js in English",
}

// locales/fr/common.json
{
   "title" : "Portal js in French",
}
```

4. To use on pages using Server-side Props.

```js
import { loadNamespaces } from './_app';
import useTranslation from 'next-translate/useTranslation';

const Home: React.FC = ()=> {
  const { t } = useTranslation();
  return (
    <div>{t(`common:title`)}</div> // we use common and title base on the common.json data
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
      ........  ........
  return {
    props : {
      _ns:  await loadNamespaces(['common'], locale),
    }
  };
};

```

5. Go to the browser and view the changes using language subpath like this `http://localhost:3000` and `http://localhost:3000/fr`. **Note** The subpath also activate chrome language Translator

#### Pre-fetch data in the server-side

When visiting a dataset page, you may want to fetch the dataset metadata in the server-side. To do so, you can use `getServerSideProps` function from NextJS:

```javascript
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/apolloClient';
import gql from 'graphql-tag';

const QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result
    }
  }
`;

...

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY,
    variables: {
      id: 'my-dataset'
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
```

This would fetch the data from DMS and save it in the Apollo cache so that we can query it again from the components.

#### Access data from a component

Consider situation when rendering a component for org info on the dataset page. We already have pre-fetched dataset metadata that includes `organization` property with attributes such as `name`, `title` etc. We can now query only organization part for our `Org` component:

```javascript
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_ORG_QUERY = gql`
  query dataset($id: String) {
    dataset(id: $id) @rest(type: "Response", path: "package_show?{args}") {
      result {
        organization {
          name
          title
          image_url
        }
      }
    }
  }
`;

export default function Org({ variables }) {
  const { loading, error, data } = useQuery(
    GET_ORG_QUERY,
    {
      variables: { id: 'my-dataset' }
    }
  );

  ...

  const { organization } = data.dataset.result;

  return (
    <>
      {organization ? (
        <>
          <img
            src={
              organization.image_url
            }
            className="h-5 w-5 mr-2 inline-block"
          />
          <Link href={`/@${organization.name}`}>
            <a className="font-semibold text-primary underline">
              {organization.title || organization.name}
            </a>
          </Link>
        </>
      ) : (
        ''
      )}
    </>
  );
}
```

## Developers

### Boot the local instance

Install the dependencies:

```bash
npm i
```

Boot the demo frontend:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the home page 🎉

You can start editing the page by modifying `/pages/index.tsx`. The page auto-updates as you edit the file.

### Architecture

- Language: Javascript
- Framework: [Next.js](https://nextjs.com/)
- Styling: [SASS](https://sass-lang.com/) with [BEM](http://getbem.com/) and ITCSS

## Contributing

For any new feature or bug reports, please request it in [issues](https://github.com/CivicDataLab/oci-assam-frontend/issues).

See [CONTRIBUTING.md](https://github.com/CivicDataLab/oci-assam-frontend/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to [Code of Conduct](https://github.com/CivicDataLab/oci-assam-frontend/blob/main/CODE_OF_CONDUCT.md).

## Credits

This is based on a [PortalJS](https://github.com/datopian/portal.js).
