import { Synth, Envelope, Loop, Transport } from 'tone'

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

export const toggleOnOff = (isPlaying) => {
  if (!isPlaying) {
    loop.start(0)
    Transport.start()
  } else {
    Transport.stop()
  }
}

export const setTransportBPM = (e) => {
  Transport.bpm.value = e
}

export const setTransportTimeSig = (e) => {
  Transport.timeSignature = e
}
