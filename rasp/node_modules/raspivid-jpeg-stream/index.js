const Raspivid = require('raspivid')
const SplitFrames = require('split-frames')

const JPEG_START = Buffer.from('\xff\xd8', 'binary')
const JPEG_END = Buffer.from('\xff\xd9', 'binary')

module.exports = function(options = {}) {
    options = Object.assign({
        'width': 640,
        'height': 480,
        'timeout': 0,
        'framerate': 24
    }, options, {
        'codec': 'MJPEG'
    })

    return Raspivid(options)
        .pipe(new SplitFrames({
            startWith: JPEG_START,
            endWith: JPEG_END
        }))
}