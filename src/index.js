import Interval from 'node-interval'
import 'isomorphic-fetch'

class drum {

  start (config) {
    const defaults = {
      endpoint: 'http://localhost',
      payload: () => {},
      debug: false,
      frequency: 1000,
      method: 'POST',
    }
    const newconfig = Object.assign({}, defaults , config)
    this.payload = newconfig.payload
    this.endpoint = newconfig.endpoint
    this.debug = newconfig.debug
    this.method = newconfig.method
    this.interval = new Interval(this.ping.bind(this), newconfig.frequency)
    this.ping()
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
    this.ping()
    this.interval.start()
  }

  ping () {

    const body = typeof (this.payload) === 'function' ? this.payload() : this.payload;

    fetch(this.endpoint, {
      method: this.method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        if (this.debug) [
          console.log('Request succeeded with JSON response', data)
        ]
      })
      .catch((error) => console.log(error))
  }
}

const drumstick = new drum()

export default drumstick
