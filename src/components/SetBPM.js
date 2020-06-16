import React from 'react'
import { Consumer } from './Context'

const SetBPM = () => {
  return (
    <Consumer>
      {({ actions, bpm }) => (
        <span id="set-bpm">
          <button type="button" onClick={() => actions.changeBPM(-1)}>
            {'<'}
          </button>
          <span id="bpm">
            <input
              type="number"
              name="bpm"
              value={bpm}
              onChange={(e) => actions.setBPM(e.target.value)}
              min="50"
              max="450"
            />
            BPM
          </span>
          <button type="button" onClick={() => actions.changeBPM(1)}>
            {'>'}
          </button>
        </span>
      )}
    </Consumer>
  )
}

export default SetBPM
