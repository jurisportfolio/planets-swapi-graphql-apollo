import React from "react";
import { withApollo } from "react-apollo";

import PageQueryComponent from "./PageQueryComponent";

const numberPlanetsOnPage = 10;

class ListOfPlanetsComponent extends React.Component {
  state = {
    pageQueryVars: {
      firstFromList: numberPlanetsOnPage,
      lastFromList: null,
      cursorAfter: null,
      cursorBefore: null
    }
  }

  render() {
    return (
      <React.Fragment>
        <PageQueryComponent queryVars={this.state.pageQueryVars} />
      </React.Fragment>

    )
  }
}

export default withApollo(ListOfPlanetsComponent)

