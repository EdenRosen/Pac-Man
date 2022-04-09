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


var map = []
var player = {x:3,y:3,d:1,nd:1,pd:1,ma:30}

//border
blocks(0,0,20,1)
blocks(0,15,20,1)
blocks(0,0,1,15)
blocks(19,0,1,15)
//E
blocks(2,2,1,5)
blocks(3,2,2,1)
blocks(3,4,2,1)
blocks(3,6,2,1)
//D
blocks(6,2,1,5)
blocks(8,2,1,5)
blocks(7,2,1,1)
blocks(7,6,1,1)
//E
blocks(10,2,1,5)
blocks(11,2,2,1)
blocks(11,4,2,1)
blocks(11,6,2,1)
//N
blocks(14,2,1,5)
blocks(17,2,1,5)
blocks(15,3,1,2)
blocks(16,4,1,2)
//P
blocks(2,8,1,6)
blocks(5,8,1,3)
blocks(3,8,2,1)
blocks(3,10,2,1)
//A
blocks(7,8,1,6)
blocks(11,8,1,6)
blocks(8,8,3,1)
blocks(8,11,3,1)
//C
blocks(13,8,1,6)
blocks(14,8,4,1)
blocks(14,13,4,1)
//other
blocks(15,10,4,2)
blocks(9,13,1,2)
blocks(4,12,2,2)

function move() {
    let x = player.x
    let y = player.y
    let preDir = player.d
    if (0.5-Math.abs(0.5-x%1) < speed & 0.5-Math.abs(0.5-y%1) < speed) {
        x = Math.round(x)
        y = Math.round(y)
        player.d = player.nd
        const d1 = preDir
        const d2 = player.nd
        let blocked = 0
        const udBlocks = map.filter(b => b.x == x & Math.abs(b.y-y) == 1)
        const rlBlocks = map.filter(b => b.y == y & Math.abs(b.x-x) == 1)
        const up = !!udBlocks.find(b => b.y == y-1)
        const down = !!udBlocks.find(b => b.y == y+1)
        const right = !!rlBlocks.find(b => b.x == x+1)
        const left = !!rlBlocks.find(b => b.x == x-1)
        if (d2 == 1 & right | d2 == 2 & up | d2 == 3 & left | d2 == 4 & down) {
            blocked = 1
        }
        if ((blocked == 1 | d1 == d2) & (d1 == 1 & right | d1 == 2 & up | d1 == 3 & left | d1 == 4 & down)) {
            blocked = 2
        }
        if (blocked > 0) {
            console.log(blocked);
            if (blocked == 2) {
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

