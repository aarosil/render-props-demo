import React, { Component } from 'react';
import AddressAutocomplete from './components/AddressAutocomplete';
import WithPosition from './components/WithPosition';

const AddressResults = ({results, onSelect}) =>  results.map((result, index) =>
  <div key={index} onClick={() => onSelect(result)}>
    {result.description}
  </div>
)

const AddressInput = ({onChange, value, results, onSelect}) =>
  <div>
    <label>address:</label>
      <div style={{position: 'relative'}}>
        <WithPosition>
          {
            ({bottom, width, scrollTop}) => {
              const styles = {
                top: bottom + scrollTop,
                width,
                position: 'fixed',
                backgroundColor: 'lightblue'
              }

              return [
                <input style={{width: '250px'}} key='1' onChange={onChange} value={value.freeform || value.formatted_address} />,
                <div key='2' style={{...styles}}>
                  <AddressResults results={results} onSelect={onSelect} />
                </div>
              ]

            }
          }
        </WithPosition>
        <pre>
        {
          JSON.stringify(value, null, 2)
        }
        </pre>
    </div>
  </div>

export default class Left extends Component {
  render() {
    return (
      <div className="left">
        <AddressAutocomplete minLengthToQuery={3} >
          { props =>  <AddressInput {...props} /> }
        </AddressAutocomplete>
      </div>
    )
  }
}