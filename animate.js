function animate() {
    if (run) {
        requestAnimationFrame(animate)
    }
    c.clear()
    printPlayer()
    printMap()
    let ma = player.ma
    if (player.d != 0) {
        ma += mouthSpeed
    }
    const maxMA = 100
    const minMA = 30
    if (ma > maxMA & ma < 180) {
        ma += (180-maxMA)*2
    }
    if (ma > 360-minMA) {
        ma = 360-ma
    }
    player.ma = ma

    move()
}

animate()

function printMap() {
    for (let i = 0; i < map.length; i++) {
        b = map[i]
        block(b.x,b.y)
        for (let n = 0; n < i; n++) {
            b2 = map[n]
            if (b.x == b2.x & Math.abs(b.y-b2.y) == 1 | b.y == b2.y & Math.abs(b.x-b2.x) == 1) {
                connection(b.x,b.y,b2.x,b2.y)
            }
            
        }
    }
}

function printPlayer() {
    const size = playerSize*bs
    const mx = (player.x+0.5)*bs
    const my = (player.y+0.5)*bs
    c.oval(mx,my,size,size,'yellow')
    const rad = Math.PI/180
    const r = size/2
    const tr = -r*Math.tan(player.ma/2*rad)
    let p1 = {}
    let p2 = {}
    let dir = player.d
    if (dir == 0) {
        dir = player.pd
    }
    if (dir == 1) {
        p1 = {x:mx+r,y:my-tr}
        p2 = {x:mx+r,y:my+tr}
    } else if (dir == 2) {
        p1 = {x:mx+tr,y:my-r}
        p2 = {x:mx-tr,y:my-r}
    } else if (dir == 3) {
        p1 = {x:mx-r,y:my+tr}
        p2 = {x:mx-r,y:my-tr}
    } else if (dir == 4) {
        p1 = {x:mx+tr,y:my+r}
        p2 = {x:mx-tr,y:my+r}
    }
    c.line([{x:mx,y:my},p1,p2],'black',0,'black')
}

function block(x,y) {
    const mx = (x+0.5)*bs
    const my = (y+0.5)*bs
    c.rect(mx,my,bs*blockSize,bs*blockSize,'#0943E2')
    c.rect(mx,my,bs*(blockSize-lineWidth*2),bs*(blockSize-lineWidth*2),'black')
}

function connection(x1,y1,x2,y2) {
    const rad = Math.PI/180
    const deg = -Math.atan2(y1-y2,x1-x2)/rad
    const mx = ((x1+x2)/2+0.5)*bs
    const my = ((y1+y2)/2+0.5)*bs
    const width = (1-blockSize)+lineWidth*2
    c.rect(mx,my,bs*width,bs*blockSize,'#0943E2',deg)
    c.rect(mx,my,bs*width,bs*(blockSize-lineWidth*2),'black',deg)
}
