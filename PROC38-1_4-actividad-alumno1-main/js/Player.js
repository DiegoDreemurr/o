class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.score = 0;
    this.fuel = 185;
    this.life = 185;
    this.rank = 0;
  }

  
  


  addPlayer(){
    var playerIndex= "players/player"+ this.index
      if (this.index === 1){
        this.positionX = width/2 - 100;
      }
        else{
          this.positionX = width/ 2 + 100;
        }
    database.ref(playerIndex).set({
      name : this.name,
      positionX : this.positionX,
      positionY : this.positionY,
      rank: this.rank,
      score: this.score
    })
  }
  
  
  getDistance(){
    var PlayerDistanceRef = database.ref("players/player" + this.index)
    PlayerDistanceRef.on("value",data =>{
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
    //leer la base de datos y guardar una snapshot de esta
    //database.on
  
  }



  getCount(){
    var playerCountRef=database.ref("playerCount");
    playerCountRef.on("value",(data)=>{
      playerCountRef=data.val();
    });
  }
  
  




  updateCount(count){
    //obtener la cuenta de jugadores
    //modifica la base de datos
    database.ref("/").update({
      playerCount:count
    });
    console.log(playerCountRef);
  }


  update(){
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).update({
      name:this.name,
      positionX : this.positionX,
      positionY : this.positionY,
      rank:this.rank,
      life:this.life,
      score:this.score
    });
  }

  static getPlayersInfo(){
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value",data =>{
    allPlayers = data.val();
  });
}

  getCarsAtEnd(){
    database.ref("CarsAtEnd").on("value",data =>{
    this.rank = data.val()

    });



  };

static updateCarsAtEnd(rank){
  database.ref("/").update({
    CarsAtEnd: rank
  })
  
};


}