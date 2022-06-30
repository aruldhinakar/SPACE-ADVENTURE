var spaceship
var bgsprite
var laserbeam
var gameState = "play"
var score = 0



function preload(){
bgimg = loadImage("spacebg.jpeg")
shipimg = loadImage("ship.png")
lbimg = loadImage("laser beam.jpeg")
gmimg = loadImage("meteor.png")

}





function setup(){
createCanvas(windowWidth,windowHeight)
 bgsprite = createSprite(width/2,height/2,windowWidth*2,windowHeight)
bgsprite.addImage("bgpic",bgimg)
 spaceship = createSprite(width/2,height-300)
spaceship.addImage("ss",shipimg)
spaceship.scale = 0.3
spaceship.debug = false
spaceship.setCollider("rectangle",0,0,200,200)
meteorGroup = new Group()


//console.log(windowWidth)
//console.log(windowHeight)


}

function draw(){
  background("black")
 console.log(frameCount)
  if(gameState == "play"){
 if(keyDown("RIGHT")&& spaceship.x<1400){
        spaceship.x = spaceship.x+5
       
        }
if(keyDown("LEFT")&& spaceship.x>450){
spaceship.x = spaceship.x-5
       
}
if(meteorGroup.isTouching(laserbeam)){
  meteorGroup.destroyEach()
  score = score+10
}
spawnLaser()
spawnMeteor()
if(meteorGroup.isTouching(spaceship)){
    gameState = "end"
    
}
}
else if(gameState == "end"){
gameOver()
spaceship.velocityY = 0
meteorGroup.destroyEach()



}
 
bgsprite.velocityY = 3
if(bgsprite.y>height-486){
bgsprite.y = height - 586
}


drawSprites()
fill("red")
textSize(40)
text("Score :"+score,windowWidth - 500,windowHeight-800)
}
function spawnLaser(){
if(keyWentDown("SPACE")){
laserbeam = createSprite(width/2,height - 350)
laserbeam.addImage("lb",lbimg)
laserbeam.scale = 0.7 
laserbeam.velocityY = -7
laserbeam.x = spaceship.x
}


}
function spawnMeteor(){
    if(frameCount%120 === 0){
    meteor = createSprite(random(400,1000),windowHeight - 1000)
    meteor.addImage("mt",gmimg)
    meteor.scale = random(0,1.2)
    meteor.velocityY = 7+2*score/50
    meteor.debug = false
    spaceship.depth = meteor.depth
    spaceship.depth +=1
    meteorGroup.add(meteor)
    }
}
function gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  
