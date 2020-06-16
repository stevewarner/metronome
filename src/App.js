import React from 'react'
import './style.scss'
import SetBPM from './components/SetBPM'
import SetTimeSignature from './components/SetTimeSignature'
import PlayButton from './components/PlayButton'

const App = () => (
  <>
    <h1>Metronome</h1>
    <SetBPM />
    <SetTimeSignature />
    <PlayButton />
  </>
)

export default App
