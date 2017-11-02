import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

const API_KEY = "AIzaSyAVXrETWS6zjE00ZMMxdk3FYbSE2PAGd3k";

export default class AddressAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {value: {freeform: ' '}, results: []};
    this.onChange = this.onChange.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
  }

  componentWillMount() {
    const exists = document.getElementById('gmap_tag');
    if (!exists) this.addScriptTag();
  }

  addScriptTag() {
    let script = document.createElement('script');
    script.src = `//maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.noAsync = true;
    script.id = 'gmap_tag';
    script.crossorigin = true;
    this.script = script;
    document.body.appendChild(script);
  }

  performQuery(query) {
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({input: query}, (results , status) => {
      this.setState({results: results || [], status})
    });
  }

  onChange(e) {
    const { minLengthToQuery = 3 } = this.props;
    const query = e.target.value;

    this.setState({value: {freeform: query}})

    if (query.length >= minLengthToQuery) {
      this.performQuery(query)
    } else {
      this.setState({results: []})
    }
  }

  onSelectItem(prediction) {
    this.getPlaceDetails(prediction.place_id, (place, status) => {
      console.log(place)
      if (status === 'OK') this.setState({
        value: {
          ...place,
          freeform: prediction.freeform
        },
        results: []
      });
    });
  }

  getPlaceDetails(placeId, cb) {
    const el = findDOMNode(this.script)
    this.placesService = this.placesService || new window.google.maps.places.PlacesService(el);
    this.placesService.getDetails({placeId}, (place, status) => cb(place, status));
  }

  render() {
    const { results, value, status } = this.state;
    return (
      this.props.children({
        onChange: this.onChange,
        onSelect: this.onSelectItem,
        results,
        status,
        value
      })
    );
  }
}


