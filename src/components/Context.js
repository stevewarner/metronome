/* eslint-disable no-console */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Synth, Envelope, Loop, Transport } from 'tone'

const MetronomeContext = React.createContext()

const synth = new Synth({
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0.01,
    decay: 0.05,
    sustain: 0.0,
    release: 1,
  },
}).toMaster()

const env = new Envelope()

env.set(0.0001, 5, 0.01, 0.001, 0.1, 0)

const loop = new Loop((time) => {
  Transport.setLoopPoints(0, '1m')
  Transport.loop = true
  const index = Transport.getTicksAtTime(time) / 192 + 1
  console.log('Beat:', index)
  if (index === 1) {
    synth.triggerAttackRelease('C6', '16n')
  } else {
    synth.triggerAttackRelease('C5', '16n')
  }
}, '4n')

export class Provider extends Component {
  state = {
    bpm: 120,
    timeSignature: 4,
    isPlaying: false,
  }

  handleSetBPM = (e) => {
    this.setState(
      () => ({
        bpm: Number(e),
      }),
      () => {
        const { bpm } = this.state
        Transport.bpm.value = bpm
      }
    )
  }

  handleChangeBPM = (delta) => {
    this.setState(
      (prevState) => ({
        bpm: prevState.bpm + delta,
      }),
      () => {
        const { bpm } = this.state
        Transport.bpm.value = bpm
      }
    )
  }

  handleSetTimeSig = (e) => {
    this.setState(
      () => ({
        timeSignature: Number(e),
      }),
      () => {
        const { timeSignature } = this.state
        Transport.timeSignature = timeSignature
      }
    )
  }

  handleStartLoop = (e) => {
    e.preventDefault()
    const { isPlaying } = this.state
    if (!isPlaying) {
      loop.start(0)
      Transport.start()
    } else {
      Transport.stop()
    }
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying,
    }))
  }

  render() {
    const { bpm, timeSignature, isPlaying } = this.state
    const { children } = this.props
    return (
      <MetronomeContext.Provider
        value={{
          bpm,
          timeSignature,
          isPlaying,
          actions: {
            setBPM: this.handleSetBPM,
            changeBPM: this.handleChangeBPM,
            setTimeSig: this.handleSetTimeSig,
            startLoop: this.handleStartLoop,
          },
        }}
      >
        {children}
      </MetronomeContext.Provider>
    )
  }
}

Provider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
}
export const { Consumer } = MetronomeContext
