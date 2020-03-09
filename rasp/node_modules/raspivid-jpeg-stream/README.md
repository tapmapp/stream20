# raspivid-jpeg-stream

[![NPM Version](https://img.shields.io/npm/v/raspivid-jpeg-stream.svg?style=flat-square)](https://www.npmjs.com/package/raspivid-jpeg-stream)
[![Dependency Status](https://david-dm.org/tuckbick/raspivid-jpeg-stream.svg?theme=shields.io)](https://david-dm.org/tuckbick/raspivid-jpeg-stream)
[![NPM Downloads](https://img.shields.io/npm/dm/tuckbick/raspivid-jpeg-stream.svg?style=flat-square)](https://npm-stat.com/charts.html?package=tuckbick/raspivid-jpeg-stream)

A read stream for jpeg data from the Raspberry Pi camera module. Uses the [`raspivid` node module](https://github.com/binocarlos/raspivid) for interfacing with the official [`raspivid` cli](https://www.raspberrypi.org/documentation/usage/camera/raspicam/raspivid.md).

## Installation

```bash
npm install raspivid-jpeg-stream
```

## Usage

```javascript
const RaspividJpegStream = require('raspivid-jpeg-stream')

const camera = new RaspividJpegStream({
    // defaults
    'width': 640,
    'height': 480,
    'timeout': 0,
    'framerate': 24
})

camera.pipe(...)

camera.on('data', function(frame) {
    ...
})
```

## Options

See the official documentation for more options: https://www.raspberrypi.org/documentation/raspbian/applications/camera.md

Alternatively, consult the CLI:
```bash
raspivid --help
```

## License

MIT