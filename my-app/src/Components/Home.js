import React, { Component } from 'react'
import Wallpaper from '../Components/Wallpaper';
import QuickSearch from '../Components/QuickSearch';

export default class Home extends Component {
  render() {
    return (
      <div>
          <React.Fragment>
              <Wallpaper s2='pqr'/>
              <QuickSearch/>
          </React.Fragment>
      </div>
    )
  }
}
