import Interval from 'node-interval'
import {fetchUrl} from 'fetch'

class drum {

  start (config) {
    const defaults = {
      endpoint: 'http://localhost',
      payload: {},
      debug: false,
      frequency: 1000,
    }
    const newconfig = Object.assign({}, defaults , config)
    this.payload = newconfig.payload
    this.endpoint = newconfig.endpoint
    this.debug = newconfig.debug
    this.interval = new Interval(this.ping.bind(this), newconfig.frequency)
    this.interval.start()
  }

  pause () {
    this.interval.pause()
  }

  resume () {
    this.interval.resume()
  }

  changePayload (payload) {
    this.payload = payload
  }

  changeFrequency (frequency) {
    this.interval.stop()
    this.interval = new Interval(this.ping.bind(this), frequency)
    this.interval.start()
  }

  ping () {
    fetchUrl(this.endpoint, {
      method: 'POST',
      payload: JSON.stringify(this.payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }, (error, body, meta) => {
      if (error) {
        console.log('Request failed', error)
      } else {
        if (this.debug) {
          console.log('Request succeeded with JSON response', body)
        }
      }
    })
  }
}

const drumstick = new drum()

export default drumstick
