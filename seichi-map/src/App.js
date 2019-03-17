import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon, Popover } from 'antd';

const response = require('./data/res.json');

const Marker = (place) => {
  const {
    lat,
    lng,
    id,
    placename,
    title,
    url,
  } = place;
  const content = (
    <div>
      <p>
        <strong>Title: </strong>
        <a href={url}>
          {title}
        </a>
      </p>
      <p>
        <strong>Latitude: </strong>
        {Math.abs(lat) + ((lat >= 0) ? '˚ N' : '˚ S')}
      </p>
      <p>
        <strong>Longitude: </strong>
        {Math.abs(lng) + ((lng >= 0) ? '˚ E' : '˚ W')}
      </p>
    </div>
  );
  return (
    <div key={id} lat={lat} lng={lng}>
      <Popover content={content} title={placename}>
        <Icon type="pushpin" style={{ fontSize: '10px', color: '#eb2f96' }} />
      </Popover>
    </div>
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 35.675888,
        lng: 139.744858,
      },
      zoom: 11,
      data: response,
    };
  }

  render() {
    const { center, zoom, data } = this.state;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAS_gZ-8P6SSW5eru7JCoFTls4vT6fp3KU' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {data.filter(place => place.lat).map(place => <Marker {...place} />)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
