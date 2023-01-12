import React from 'react';
import RouterView, { routeCreate } from './RouterView';
import routerMap from './map';

const routerData = [
  ...routerMap.map(routeCreate)
];

export const BasicRoute = props => {
  return (
    <RouterView data={routerData} isMobile={props.isMobile}/>
  )
}
