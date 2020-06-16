import React from 'react'
import { Consumer } from './Context'

const PlayButton = () => {
  return (
    <Consumer>
      {({ actions, isPlaying }) => (
        <div>
          <button type="submit" onClick={(e) => actions.startLoop(e)}>
            {isPlaying ? 'Stop' : 'Start'}
          </button>
        </div>
      )}
    </Consumer>
  )
}

export default PlayButton
