Application have been published at [planets-swapi-graphql-apollo](https://jurisportfolio.github.io/planets-swapi-graphql-apollo/)

### 1. Task

Aplication based on GraphQL API from [https://graphql.org/swapi-graphql/](https://graphql.org/swapi-graphql/)

User should see the list of planets with simple information about them.
List should contain pagination (there are 10 planets on page by default) with “back” and ”next” buttons under it.
On click user get all available information about planet together with list of films, where the planet was reminded and list of Star Wars characters which connect to this planet.
For styling use styled-componets; Free choose yourself the way to access graphql data.

### 1. Libraries and technologies

Application was built by using
ReactJS for building UI components;
Create React App to manage the project;
Apollo Client to fetch data from server;
graphql as a query language;
styled-components to style react components;
CSS grid to create responsive web design layout;
gh-pages to deploy the app.

### 1. Description of the solution

Project was started and manage by Create React App tools. UI components I’m building by ReactJS. To make queries and fetch data from server (https://swapi.apis.guru/) I’m using Apollo Client. GraphQL API of this database allows to build cursor pagination, which is used to partition whole list of planet on couple pages by 10 elements. User able to change page by clicking on “Previous Page” or “Next Page” buttons. Every time after page changes, application fetching data for next 10 planets after or before actual list.

### 1. Development directions

### 1. Restrictions and bags
