import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
//
export const routeCreate = (props) => {
  return {type: 'Route', props};
};
export const redirectCreate = (props) => {
  return {type: 'Redirect', props};
};

export default class extends React.Component {

  renderItem = (item, index) => {
    let Component = null;
    const {type, props} = item;
    if (type === 'Route') {
      Component = Route;
    } else if (type === 'Redirect') {
      Component = Redirect;
    }
    return Component ? (
      <Component key={index} {...props}/>
    ) : null;
  };

  render() {
    const {data} = this.props;
    return (
      <HashRouter>
        <Switch>
          {data.map((item, index) => this.renderItem(item, index))}
        </Switch>
      </HashRouter>
    )
  }
}
