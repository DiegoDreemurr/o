class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leaderboardTitle = createElement("h2")
    this.leader1 = createElement("h2");
    this.leader2 = createElement ("h2");
    this.playermoving = false;
    this.leftKeyActive = false;
  };
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // AM
  start() {
    
 player = new Player();
    playerCount = player.getCount();
    
  form = new Form();
  form.display();
    
 
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;
    cars = [car1, car2];
// definir el grupo
    powerCoins = new Group ();
    fuel = new Group ();
    obstacle1 = new Group(); 
    obstacle2 = new Group(); 
    var obstacle1Positions = [
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
     
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
    ];

    var obstacle2Positions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
     
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];
    this.addSprites(fuel,10,fuelImage,0.2);
    
    
   
    this.addSprites(powerCoins,13,powerCoinsImg,0.09);

this.addSprites(obstacle1, obstacle1Positions.length, obstacle1Image, 0.04, obstacle1Positions);
this.addSprites(obstacle2, obstacle1Positions.length, obstacle2Image, 0.04, obstacle2Positions);


  };

  addSprites(spriteGroup,numberOfSprites,spriteImage,scale, positions =[]){
    for (var i=0;i<numberOfSprites;i++){
      var x,y;

if(positions.length > 0){
x = positions[i].x;
y = positions[i].y;
spriteImage = positions[i].image;
} else{
x = random(width / 2 - 150, width / 2 + 150);
y = random(-height *4.5,height - 400);
}

      var sprite = createSprite(x,y);

      sprite.addImage("sprite",spriteImage);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    };
  
  };

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTile.html("Reiniciar juego");
    this.resetTile.class("resetText");
    this.resetTile.position(width / 2 + 200,40);


    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100)
    
  this.leaderboardTitle.html("Tabla de puntuaciones");
  this.leaderboardTitle.class("resetText");
  this.leaderboardTitle.position(width / 3 - 60,40);
  
  this.leader1.class("leadersText");
  this.leader1.position(width / 3 - 50,80)

  this.leader2.class("leadersText");
  this.leader2.position(width / 3 - 50,130)
}

  //AA
  play() {
    this.handleElements();
    this.handleResetButton();
    
    
    Player.getPlayersInfo();
    player.getCarsAtEnd();


    if(allPlayers !== undefined){
      image (track,0,-height*5,width,height*6);
      this.showLife();
      this.showFuelBar();
      this.showLeaderBoard();

      var index = 0;
      
      for(var plr in allPlayers){
        index = index	+ 1;
        var x = allPlayers[plr].positionX;
        var y = height-allPlayers[plr].positionY;
        cars[index-1].position.x=x;
        cars[index-1].position.y=y;
      



    if(index === player.index){
      stroke(10);
      fill("red")
      ellipse(x,y,60,60)
    


    this.handleObstacleCollision();
    this.handlePowerCoins(index);
    this.handlefuel(index);


    
    camera.position.x = cars[index - 1].position.x;
    camera.position.y = cars[index-1].position.y;
    };
      };
if(this.playermoving){
  player.positionY += 5;
  player.update();
};


    if(keyIsDown(UP_ARROW)){
      player.positionY += 10;
      player.update();
};

this.handlePlayerControls();



  const FinshLine = height*6 - 100;
  if(player.positionY > FinshLine){
    gameState = 2;
    player.rank += 1;
    Player.updateCarsAtEnd(player.rank);
    player.update();
    this.showRank();
  };
  drawSprites();
}

  }; 
    
showFuelBar(){
  push();
  image(fuelImage, width / 2 - 100, height - player.positionY - 180, 20, 20);
  fill("white");
    rect(width / 2 - 100, height - player.positionY - 180, 185, 20);
    fill("orange");
    rect(width / 2 - 100, height - player.positionY - 180, player.fuel, 20);
    pop();
  };

  handlefuel(index){
    cars[index-1].overlap(fuel, function(collector,collected){
      player.fuel = 185;
      collected.remove();
    });
    if(player.fuel > 0 && this.playermoving){
 player.fuel -= 0.3
    };
if (player.fuel <= 0){
 gameState = 2;
 this.gameOver();
};


  };


    handlePowerCoins(index){
      cars[index-1].overlap(powerCoins, function(collector,collected){
        player.score += 21
        player.update();
        collected.remove();
      });

   



    };





handleResetButton(){

// contiene los datos de los jugadores
  this.resetButton.mousePressed(()=>{
    database.ref("/").set({
      playerCount:0,
      gameState:0,
      players:{}
    });
  window.location.reload();
  })
  

};

handleObstacleCollision(index){
  if(cars[index-1].collide(obstacle1) || cars[index-1].collide(obstacle2)){
    if(this.leftKeyActive){
      player.positionX += 100
    }else{
      player.positionY -= 100
    }
if(player.life > 0){
    player.life -= 185 / 4
  };
  player.update();
  }
  

};

showLife(){
push();
  image(lifeImage, width / 2 - 130, height - player.positionY - 180, 20, 20);
  fill("white");
  rect(width / 2 - 100, height - player.positionY - 180, 185, 20);
  fill("red");
  rect(width / 2 - 100, height - player.positionY - 180, player.life, 20);
  pop();
};



showLeaderBoard(){
  var leader1
  var leader2
  var players = Object.values(allPlayers); 
  if((players[0].rank == 0 && players[1].rank == 0) || 
  players[0].rank == 1){
  leader1 = 
  players[0].rank + 
  "&emsp;"+ 
  players[0].name +
  "&emsp;" +
  players[0].score;


    leader2 = 
    players[1].rank + 
    "&emsp;"+ 
    players[1].name +
    "&emsp;" +
    players[1].score;  
  };


  if(player[1].rank == 1){
    leader1 = 
    players[1].rank + 
    "&emsp;"+ 
    players[1].name +
    "&emsp;" +
    players[1].score;
  
  
      leader2 = 
      players[0].rank + 
      "&emsp;"+ 
      players[0].name +
      "&emsp;" +
      players[0].score;    
  };
  this.leader1.html(leader1);
  this.leader2.html(leader2);
};


handlePlayerControls(){
  if(!this.blast ){

  
  if(keyIsDown(UP_ARROW) && player.positionX> width / 3 - 50){
  player.positionY += 10;
  player.update();
    };
    if(keyIsDown(LEFT_ARROW) && player.positionX> width / 2 + 300){
    this.leftKeyActive = true;  
    player.positionX -= 5;
    player.update();
  };
  if(keyIsDown(RIGHT_ARROW) && player.positionX> width / 2 + 300){
    this.leftKeyActive = false;
    player.positionX += 5
    player.update();
  //borde para que no salgan
  
  };
  

};

};



showRank(){
  swal({
    title:'Impresionante... ${"\n"}posicion${"\n"}${player.rank}',
     text:"Cruzaste la linea de meta con exito",
      imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
       imageSize:"100x100",
         confirmButton:"Okay"
});




};







}

