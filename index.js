const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576
c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.4
let Loose = false

class Sprite{
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 40
        this.width = 40
    }
    draw(){
        c.fillStyle="red"
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height + this.velocity.y  >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y +=gravity
    }
}

class Blocks{
    constructor({position,velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 170
        this.width = 50
    }
    draw(){
        c.fillStyle="green"
        c.fillRect(this.position.x,0,this.width,canvas.height)
        c.fillStyle="blue"
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
    }
}

const player = new Sprite({
    position:{
    x:50,
    y:0
},
velocity:{
    x:0,
    y:0
}
})

const block = new Blocks({
    position:{
    x:canvas.width+50,
    y:getRandomY()
},
velocity:{
    x:-5,
    y:0
}
})
const keys = {
    a:{
        pressed : false
    },
    d:{
        pressed : false
    },
    w:{
        pressed : false
    }
}
let lastkey
function getRandomY(){
    return (canvas.height-200) * Math.random()
}

function CheckCollision({box1,box2}){
        
        if(box1.position.x + box1.width >= box2.position.x 
        && box1.position.x <= box2.position.x + box2.width
        ){
            if( box1.position.y >= box2.position.y
                && box1.position.y + box1.height <= box2.position.y + box2.height){
                    return false
                }
            return true
        }
        return false
}

function animate()
{
    window.requestAnimationFrame(animate)
    if(!Loose){
        
        c.fillStyle="black"
        c.fillRect(0,0,canvas.width,canvas.height)
        player.update()
        block.update()
        player.velocity.x = 0
        if(keys.a.pressed && lastkey ==='a'){
            player.velocity.x = -2
        }else if (keys.d.pressed  && lastkey ==='d')
        {player.velocity.x =2}
        
        if(block.position.x <-block.width){
            block.position.x = canvas.width + block.width
            block.position.y = getRandomY()
        }

        //dtect for collision
        if(CheckCollision({
            box1:player,
            box2:block})){
                block.velocity.x = 0
                Loose = true;
            }
    }
}

animate()



window.addEventListener("keydown",(event)=>{
    switch(event.key){
        case 'a':
            keys.a.pressed =true
            lastkey = 'a'
        break
        case 'd':
            keys.d.pressed =true
            lastkey = 'd'
        break
        case ' ':
           if(!Loose){
            player.velocity.y = -10
           }
        break
        case 'r' : 
           window.location.reload()
        break
    }
})

window.addEventListener("keyup",(event)=>{
    switch(event.key){
        case 'a':
            keys.a.pressed =false
        break
        case 'd':
            keys.d.pressed =false
        break
    }
})