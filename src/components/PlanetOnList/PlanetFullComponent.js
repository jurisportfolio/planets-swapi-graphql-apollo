import React from "react";
import gql from "graphql-tag";
import { Query, withApollo } from 'react-apollo';

import PlanetDetailsViewComponent from "./PlanetDetailsViewComponent";

const PlanetFullComponent = ({ planetBasicInfo }) =>

  <Query query={PLANET_MORE_INFO} variables={{ planetID: planetBasicInfo.id }}>
    {({ loading, error, data }) => {

      if (loading) return <h5>LOADING...</h5>;
      if (error) return <h5>NO INFORMATION</h5>;
      const planetFullInfo = { ...planetBasicInfo, ...data.planet };
      return <PlanetDetailsViewComponent planetFullInfo={planetFullInfo} />
    }
    }
  </Query>

const PLANET_MORE_INFO = gql`
query Planet(
  $planetID: ID
) {
  planet(id: $planetID) {
    rotationPeriod
    orbitalPeriod
    gravity
    climates
    terrains
    filmConnection {
      films {
        id
        title
      }
    }
    residentConnection {
      residents {
        id
        name
      }
    }
  }
}
`;

export default withApollo(PlanetFullComponent);
