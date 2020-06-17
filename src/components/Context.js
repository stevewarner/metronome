/* eslint-disable no-console */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toggleOnOff, setTransportBPM, setTransportTimeSig } from './AudioContext'

const MetronomeContext = React.createContext()

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
        setTransportBPM(bpm)
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
        setTransportBPM(bpm)
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
        setTransportTimeSig(timeSignature)
      }
    )
  }

  handleStartLoop = (e) => {
    e.preventDefault()
    const { isPlaying } = this.state
    toggleOnOff(isPlaying)
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
