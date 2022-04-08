const canvas = document.querySelector('canvas')
const c = new Canvas(canvas)

const cw = 1000
const ch = 800
canvas.width = cw;
canvas.height = ch;
const bs = 50
const lineWidth = 0.05
const blockSize = 0.8
const run = true
const playerSize = 0.8
const speed = 0.07
const mouthSpeed = 15


var map = [
    {x:10,y:10}
]
var player = {x:3,y:3,d:1,nd:1,pd:1,ma:30}

blocks(0,0,20,1)
blocks(0,15,20,1)
blocks(0,0,1,15)
blocks(19,0,1,15)
blocks(10,4,2,6)

function move() {
    let x = player.x
    let y = player.y
    let preDir = player.d
    if (0.5-Math.abs(0.5-x%1) < speed & 0.5-Math.abs(0.5-y%1) < speed) {
        x = Math.round(x)
        y = Math.round(y)
        player.d = player.nd
        let blocked = false
        const udBlocks = map.filter(b => b.x == x & Math.abs(b.y-y) == 1)
        const rlBlocks = map.filter(b => b.y == y & Math.abs(b.x-x) == 1)
        if (udBlocks.length > 0) {
            const up = !!udBlocks.find(b => b.y == y-1)
            if (player.d == 2 & up | player.d == 4 & !up) {
                blocked = true
            }
        }
        if (rlBlocks.length > 0) {
            const right = !!rlBlocks.find(b => b.x == x+1)
            if (player.d == 1 & right | player.d == 3 & !right) {
                blocked = true
            }
        }
        if (blocked) {
            if (player.d == preDir & preDir != 0) {
                player.pd = preDir
                preDir = 0
                player.d = 0
                player.nd = 0
                player.x = x
                player.y = y
            }
            player.d = preDir
        }
        if (preDir != player.d) {
            player.x = x
            player.y = y
            player.pd = preDir
        }
    }
    if (Math.abs(player.d-player.nd) == 2 & player.d != 0) {
        player.d = player.nd
    }
    if (player.d == 1) {
        player.x += speed
    } else if (player.d == 2) {
        player.y -= speed
    } else if (player.d == 3) {
        player.x -= speed
    } else if (player.d == 4) {
        player.y += speed
    }
}

function blocks(x1,y1,w,h) {
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            map.push({x:x1+x,y:y1+y})
        }
    }
}

$(document).keydown(function(e) {
    const key = e.key
    if (key == 'ArrowDown') {
        player.nd = 4
    } else if (key == 'ArrowLeft') {
        player.nd = 3
    } else if (key == 'ArrowRight') {
        player.nd = 1
    } else if (key == 'ArrowUp') {
        player.nd = 2
    }
})

canvas.addEventListener("mousedown", function (e){ 
    const canvasPosNotInBS = getMousePos(canvas, e);
    const canvasPosInBS = { x: canvasPosNotInBS.x/bs, y: canvasPosNotInBS.y/bs };
    const pos = {x:Math.round(canvasPosInBS.x-0.5),y:Math.round(canvasPosInBS.y-0.5)}
})

function  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
  
    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

