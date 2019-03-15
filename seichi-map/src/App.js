import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'antd';

const data = require('./data/res.json');

class App extends Component {
  static defaultProps = {
    center: {
      lat: 35.675888,
      lng: 139.744858
    },
    zoom: 11
  };

  marklist = (production) => {
    let {places} = production
    return Object.keys(places)
    .filter(k => places[k])
    .map(k => this.icon(places[k]))
  }

  icon = (coord) => {
    console.log(coord)
    if (coord.lat){
      return (
      <Icon type="pushpin" {...coord} style={{ fontSize: '10px', color: '#eb2f96' }}/>
      )}
      else {return(<div/>)}
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAS_gZ-8P6SSW5eru7JCoFTls4vT6fp3KU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        {data.map(production => this.marklist(production))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default App;