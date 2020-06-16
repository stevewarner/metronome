import React from 'react'
import { Consumer } from './Context'

const SetTimeSignature = () => {
  return (
    <Consumer>
      {({ actions, timeSignature }) => (
        <span id="set-time">
          <span>Time Signature: </span>
          <select
            value={timeSignature}
            onChange={(e) => actions.setTimeSig(e.target.value)}
          >
            <option value="2">2/4</option>
            <option value="3">3/4</option>
            <option value="4">4/4</option>
            <option value="5">5/4</option>
            <option value="6">6/8</option>
            <option value="7">7/8</option>
          </select>
        </span>
      )}
    </Consumer>
  )
}

export default SetTimeSignature
