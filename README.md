# DreamStore getting started
Welcome to Dreamstore Getting Started !!! 

In this tutorial you will learn how to implement a simple component in dreamstore. By the end of this lesson, you will be able to publish and install your awesome app right in your store

This document is devided in five parts. The first one contains quick warming up section explaining core VTEX IO concepts and how to set up correctly for working with dreamstore. The second part makes an overview in the directory structure and in the app's manifest. The third step consists in explaining how to work with *Pages* and how to place your component where you want. The fourth part focuses on actually creating the component, while the fifth shows how to connect to the backend.

## Warming up
This tutorial uses VTEX IO. This platform is the new way of developing and delivering reactive components throughout VTEX infrastructure. IO has great features and is backed by industry leading technologies React and GraphQL. Keep in mind these references in case you need some help with them
- React 
  - https://reactjs.org/docs/hello-world.html
  - https://reactjs.org/tutorial/tutorial.html
- GraphQL
  - https://graphql.org/learn/
  - https://www.howtographql.com/

VTEX IO is a serverless platform, meaning that you require no, to almost no, local setup and you can focus on your awesome app quickly. The only app you will ever have to install locally is the `vtex` toolbelt. Luckly, it's backed up by NodeJS, which makes it very easy to install and update. First, install [`yarn`](https://yarnpkg.com/lang/en/docs/install/#mac-stable), and then open a terminal and run
```sh
$ yarn global add vtex
```

This will install vtex toolbelt. The toolbet will let you create, link and publish apps in a blink of an eye. After the installation finished successfuly, login into your vtex account by typing
```sh
$ vtex login -a {{account}}
```
where `{{account}}` is your vtex account. 

VTEX IO is havely based on the concept of *workspaces* and taking a minute to understand them will enable you to develop even **faster**. A *workspace* is a status of your store/account where you can develop, install and modify apps settings without interfering in your production store. After your are done with your modifications, you can `promote` your changes to master if you are satisfied or `reset` your entire workspace if you want to restart. Since we are developing our first awesome component, let's use our own workspace by typing
```sh
$ vtex use {{workspacename}}
```
where `{{workspacename}}` is your favorite name for a workspace

> **NOTE** Make sure this workspace is not used by anyone since your changes here will affect this person. To make such check, run `vtex workspace ls`

You can check your current workspace by entering on `https://{{workspace}}--{{account}}.myvtex.com`. This page is the raw dreamstore having one searchbar, followed by a banner and a shelf. 

TODO: INSERT FIGURE HERE

The current dreamstore is awesome, but a little customization is always welcome, so let's add our own component bellow the existing shelf. Our component will be a very simple product list showing the available products in the store. Go back to the terminal, create a new host folder and type
```sh
$ vtex init
```

A selection menu like the one bellow will appear. Choose the `Dreamstore getting started` option and hit enter
```sh
$ vtex init
info:    Hello! I will help you generate basic files and folders for your app.
? Choose where do you want to start from (Use arrow keys)
  react getting-started
  graphql getting-started
  react+graphql
  hello graphql
  hello react
> dreamstore getting-started
  Cancel
```

This will clone this [git repo](https://github.com/vtex-apps/dreamstore-getting-started) in the current folder. The generated code contains a simple extension to the dreamstore. 

Another importante concept in IO is linking an app. Linking means transfering all local code to the remote server, where the code will be built, bundled and setup correctely for you. This is a very simple process and can be achieved by
```sh
$ vtex link
```

Now visit your store (`https://{{workspace}}--{{account}}.myvtex.com`) again. You will see the product list just bellow the shelf.

TODO: IMAGE WITH CHANGES

Congratulations, you have a working app in VTEX IO ! Easy right ? Keep reading this document to learn more on how to customize the component. 

## Overview
VTEX IO is a highly opinionated platform. This means that there is usually one right way of accomplishing what you want to build with the platform. Also our platform prefers standarzation over configuration. This can be seen in the directory layout, containing one folder for each platform build (react, pages, graphql, node) and a `manifest.json`. 

The app's manifest contains usual metadata, like name, vendor, description, etc. Also, it contains the dependencies and builders. 

Dependencies allow us to reuse Components, Extensions and backends (GraphQL resolvers). Depending on `vtex.store-graphql` allow us to use store related queries for listing and searching for products. 

Builders correspond to the resources nedded for building an app in the platform. In this app, we are using react (for building the react component) and pages (for the pages settings)

> **NOTE** VTEX IO is heavily dependent on app's version and an automatic version managment software is highly recommended. We currently use [releasy](https://www.npmjs.com/package/releasy) for version managment in IO

## Pages
For rendering a page, VTEX IO needs meta info on how to properly render it. This meta info is found in `/pages/pages.json`. This file defines the routing resolution policy between extension points and *React* components.

Extension points are literally points of extensions where *React* components can be attached to. For example, to attach the **ListProducts** component to the extension point defined on the product page of dreamstore, add the following code to `pages.json` 
```json
"store/product/sections/9": {
  "component": "ListProducts"
}
``` 

This code makes the extension point `store/product/sections/9` routes to the react component **ListProducts**.

Relink the app and click in a product. You should be redirected to the product page. **ListProducts** component should be rendered bellow the `SKU` selector.

> **NOTE** Extension points are sorted before being rendered, so changing 9 to 0 should make it change order with the `SKU` selector.

> **NOTE\*** You can check all extension poins available in dreamstore [pages](https://github.com/vtex-apps/dreamstore/blob/master/pages/pages.json)

## React Component
The code for the react extension can be found at `/react/ListProduct.js`. It contains the declaration of an ordinary react component. Also, it includes one of the best features VTEX Render provides, an automatic settings schema modifier for in-app setup. In our example this settings schema can be found at 
```javascript
ListProducts.getSchema = (props) => {
  return {
    title: 'ListProducts',
    description: 'A simple shelf',
    type: 'object',
    properties: {
      maxItems: {
        title: 'Max Items',
        type: 'number',
        default: ListProducts.defaultProps.maxItems,
      },
    },
  }
}
```

It allows setting the max number of items shown per page. To use it, click in the edit button on the lower left corner and then click on the product list. A form should appear having the maxItems setting based on the schema, change the default value and save. The number of items shown should change accordingly.

## GraphQL
Any usefull component needs data. GraphQL is the solution for data fetching inside the VTEX IO platform. 

Since GraphQL is a strong typed query language, it enables many usefull features and tools. One of these tools is automatic documentation generation and API execution right out of the box with GraphiQL. 

GraphiQL is an IDE for testing and validating GraphQL queries. It can be accessed via `https://{{workspace}}--{{account}}.myvtexdev.com/_v/vtex.dreamstore-getting-started/graphiql/v1` and contains all queries defined in the current app and in its dependencies. Since the getting started app depends on store-graphql, we can query all queries and mutations defined by it. 

The following query lists all products in the 0-10 range
```graphql
query {
  products(from: 0, to: 10) {
    brand
    categoryId
    description
    link
    linkText
    productId
    productName
    productReference
  }
}
```

To integrate this query with **React**, create a `.graphql` with the query content (this is already done at `/react/graphql/listProducts.graphql`). Now, we need to tell **React** which queries to do before rendering our component. This is achieved by the `graphql` wrapper, accepting the query, variables and target component.

After wrapping the **React** component, `react-graphql` ensures the results of the query will be available on `this.props`, inside the component's `render()` method.

Link the app with 
```
vtex link --verbose
```
and create an awesome app

## References
Production ready, real world working examples can be found at

- https://github.com/vtex-apps/hello-react
- https://github.com/vtex-apps/shelf
- https://github.com/vtex-apps/minicart
- https://github.com/vtex-apps/category-menu
- https://github.com/vtex-apps/product-summary
- https://github.com/vtex-apps/menu
- https://github.com/vtex-apps/carousel
