# drumstick 🎼[![npm version](https://badge.fury.io/js/drumstick.png)](https://badge.fury.io/js/drumstick)

drumstick let's you send a *heartbeat* to a custom endpoint in a fixed interval.
## Features
* 🔁 heartbeat to a server in a fixed interval
* 🖌 at run-time customizable payload
* 🔑 bult-in authentication if needed

## Installation
`npm install --save drumstick`

## Usage

🎼 Import `drumstick` and call `start()`.

```js
import drumstick from 'drumstick'

drumstick.start({
  endpoint: 'http://localhost',
  payload: {},
  frequency: 1000,
  debug: false,
})
```
### Configuration
* __endpoint__: the endpoint drumstick should send the payload
* __payload__: the payload that should be sent to the endpoint (Will be stringified before sending)
* __frequency__: the frequency for the heartbeat in milliseconds
* __debug__: outputs the body of a succeeded request

### Functions
There are also other functions that you can call to change the behavior of `drumstick` at runtime.
#### `changePayload(payload)`
Change the payload at anytime to any json object. It'll be stringified before sending to the endpoint.
#### `changeFrequency(frequency)`
Change the frequency of heartbeat.
#### `pause()`
Pauses the heartbeat.
#### `resume()`
Resumes the heartbeat after it has been paused.
