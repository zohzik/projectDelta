//This is an object that holds all variables that are not player-specific
function gameFeild(){
  
  //links to the html document
  this.htmlLinks = {
    
    //axe and top-space icons
    icons : {
      axeIcon : document.getElementById("main-clicker-img"),
      goldIcon : document.getElementById("player-gold-space-insert")
    },
    
    //the in-game pages
    pages : {
      inventoryPage : document.getElementById("inventory-page"),
      storePage : document.getElementById("store-page"),
      peoplePage : document.getElementById("people-page")
    }
    
  };
  
  //different variables tracked in the top-space
  this.currency = {
    gold : 0
  };
  
  //array that is filled with all the different ores in-game
  this.inventory = [];
  
  //array that is filled with all the different store items in-game
  this.store = [];
  
  //array that is filled with all the different people in-game
  this.people = [];
  
  //timers, carrier variables
  this.others = {
    activePage : "inventory",
    collectionTimer : function(){
      update();
      window.setTimeout(function(){Game.others.collectionTimer();}, 1000);
    }
  };
  
  //player object
  this.player = {
    
    //object containing all basic variables needed for saving player progress
    variables : {
      minePerClick : 1,
      gold : 0
    },
    
    //array of items bought in the store
    storeItemsBought : [0]
  };
}

//update, money collection
function update(){
  for(var i = 0; i < Game.people.length; i++){
    for(var w = 0; w < Game.people[i].qty; w++){
      for(var q = 0; q < Game.people[i].mineTimes; q++){
        mineWithAxe();
      }
    }
  }
}

//basic ore object, includes links to repective html document box.
function ore(name, worth, qty, amountLink, sellLink, boxLink){
  this.name = name;
  this.worth = worth;
  this.qty = qty;
  this.amountLink = amountLink;
  this.sellLink = sellLink;
  this.boxLink = boxLink;
}

//initilizes ore, and puts it inside the Game.inventory array
function initOre(name, worth, qty, amountLink, sellLink, boxLink){
  Game.inventory[Game.inventory.length] = new ore(name, worth, qty, amountLink, sellLink, boxLink);
}

//basic item object, includes links to respective html document box
function item(name, cost, boxLink, effect){
  this.name = name;
  this.cost = cost;
  this.boxLink = boxLink;
  this.effect = effect;
}

//initilizes item, and puts it inside the Game.store array
function initItem(name, cost, boxLink, effect){
  Game.store[Game.store.length] = new item(name, cost, boxLink, effect);
}

//basic people object, includes links to respective html document box
function people(name, cost, qty, maxQty, mineTimes, costIncrease, amountLink, maxAmountLink, costLink, mineTimesLink, effect){
  this.name = name;
  this.cost = cost;
  this.qty = qty;
  this.maxQty = maxQty;
  this.mineTimes = mineTimes;
  this.costIncrease = costIncrease;
  this.amountLink = amountLink;
  this.maxAmountLink = maxAmountLink;
  this.costLink = costLink;
  this.mineTimesLink = mineTimesLink;
  this.effect = effect;
}

//initilizes people, and puts it inside the Game.people array
function initPeople(name, cost, qty, maxQty, mineTimes, costIncrease, amountLink, maxAmountLink, costLink, mineTimesLink, effect){
  Game.people[Game.people.length] = new people(name, cost, qty, maxQty, mineTimes, costIncrease, amountLink, maxAmountLink, costLink, mineTimesLink, effect);
}

//asks user for username, loads gameFeild, then loads all other respective elements
window.onload = function(){
  document.getElementById("player-name-space-insert").innerHTML = "testing"; //prompt("What is your name?", "Max nine characters");
  window.Game = new gameFeild();
  loadInventory();
  loadStore();
  loadPeople();
  Game.others.collectionTimer();
};

//calls initOre on each ore
function loadInventory(){
  initOre("dirt", 0.01, 0, document.getElementById("inventory-box-0-amount"), document.getElementById("inventory-box-0-sell-num"), document.getElementById("inventory-box-0"));
  initOre("rock", 0.10, 0, document.getElementById("inventory-box-1-amount"), document.getElementById("inventory-box-1-sell-num"), document.getElementById("inventory-box-1"));
  initOre("clay", 0.50, 0, document.getElementById("inventory-box-2-amount"), document.getElementById("inventory-box-2-sell-num"), document.getElementById("inventory-box-2"));
  initOre("coal", 1, 0, document.getElementById("inventory-box-3-amount"), document.getElementById("inventory-box-3-sell-num"), document.getElementById("inventory-box-3"));
}

//calls initItem on each store item
function loadStore(){
  initItem("Pickaxe efficiency x2", 50, document.getElementById("store-box-0"), function(){
    Game.player.variables.minePerClick*=2;
  });
}

//calls initPeople on each people item
function loadPeople(){
  initPeople("Miner", 100, 0, 5, 1, 1.45, document.getElementById("people-box-0-amount"), document.getElementById("people-box-0-max-amount"), document.getElementById("people-box-0-cost"), document.getElementById("people-box-0-per-sec"), function(){
    if(Game.people[0].qty===1){
      //unlocks option for level 2 upgrades
    }
  });
}

//pickaxe animation
function replaceImage(){
  Game.htmlLinks.icons.axeIcon.src = "./assets/pic2.jpg";
  window.setTimeout(function(){Game.htmlLinks.icons.axeIcon.src="./assets/pic.jpg"}, 50);
}

//adds +1 to generated ore
function mineWithAxe(){
  for(var i = 0; i < Game.player.variables.minePerClick; i++){
    var carrierId = generateOreId();
    Game.inventory[carrierId].boxLink.className = "box";
    Game.inventory[carrierId].qty++;
    Game.inventory[carrierId].amountLink.innerHTML = Game.inventory[carrierId].qty;
  }
}

//animates pickaxe, then mines
function mainButtonClick(){
  replaceImage();
  mineWithAxe();
}

//generates a random ore based on a % likelyhood of apperance
function generateOreId(){
  var carrerId = Math.floor(Math.random() * 100) + 1;
  if(carrerId > 50){
    return 0;
  }else if(carrerId > 20){
    return 1;
  }else if(carrerId > 5){
    return 2;
  }else if(carrerId >= 1){
    return 3;
  }
}

//sells specific amount of specific ore
function sellOre(id){
  if(Game.inventory[id].qty >= Game.inventory[id].sellLink.value){
    Game.inventory[id].qty-=Game.inventory[id].sellLink.value;
    Game.currency.gold+=(Game.inventory[id].sellLink.value * Game.inventory[id].worth);
    Game.currency.gold = fixNum(Game.currency.gold);
    Game.htmlLinks.icons.goldIcon.innerHTML = Game.currency.gold;
    Game.inventory[id].amountLink.innerHTML = Game.inventory[id].qty;
    if(Game.inventory[id].qty === 0){
      Game.inventory[id].boxLink.className = "na";
    }
  }
  Game.inventory[id].sellLink.value = 0;
}

//sells entire inventory
function sellAll(){
  for(var i = 0; i < Game.inventory.length; i++){
    Game.currency.gold+=(Game.inventory[i].qty * Game.inventory[i].worth);
    Game.inventory[i].qty = 0;
    Game.inventory[i].sellLink.value = 0;
    Game.inventory[i].boxLink.className = "na";
  }
  Game.currency.gold = fixNum(Game.currency.gold);
  Game.htmlLinks.icons.goldIcon.innerHTML = Game.currency.gold;
}

//rounds to 2 decmimal places
function fixNum(num){
  var carrierId = Math.round(num * 100);
  return carrierId / 100;
}

//buys respective store item
function buyItem(id){
  if(Game.currency.gold >= Game.store[id].cost){
    Game.currency.gold -= Game.store[id].cost;
    Game.currency.gold = fixNum(Game.currency.gold);
    Game.htmlLinks.icons.goldIcon.innerHTML = Game.currency.gold;
    Game.store[id].effect();
    Game.store[id].boxLink.className = "na";
  }
}

//buys store item, bypassing the cost
function buyItemBypass(id){
  Game.store[id].effect();
  Game.store[id].boxLink.className = "na";
}

//buys person
function buyPeople(id){
  if(Game.currency.gold >= Game.people[id].cost && Game.people[id].qty < Game.people[id].maxQty){
    Game.currency.gold -= Game.people[id].cost;
    Game.currency.gold = fixNum(Game.currency.gold);
    Game.htmlLinks.icons.goldIcon.innerHTML = Game.currency.gold;
    Game.people[id].qty++;
    Game.people[id].cost*=Game.people[id].costIncrease;
    Game.people[id].cost = fixNum(Game.people[id].cost);
    Game.people[id].amountLink.innerHTML = Game.people[id].qty;
    Game.people[id].costLink.innerHTML = Game.people[id].cost;
    Game.people[id].effect();
  }
}

//buys person, bypassing the cost, and max qty (used for loading, since other effects and upgrades may not be in place to raise max qty yet in loading)
function buyPeopleBypass(id){
  Game.people[id].qty++;
  Game.people[id].cost*=Game.people[id].costIncrease;
  Game.people[id].cost = fixNum(Game.people[id].cost);
  Game.people[id].amountLink.innerHTML = Game.people[id].qty;
  Game.people[id].costLink.innerHTML = Game.people[id].cost;
  Game.people[id].effect();
}

//changes what page is being displayed
function cyclePage(pageName){
  if(pageName !== Game.others.activePage){
    Game.htmlLinks.pages[Game.others.activePage+"Page"].className = "na";
    Game.htmlLinks.pages[pageName+"Page"].className = "";
    Game.others.activePage = pageName;
  }
}

//debugging and testing function, gives currencies
function giveCurrency(currency, amount){
  Game.currency[currency] += amount;
  Game.currency[currency] = fixNum(Game.currency[currency]);
  Game.htmlLinks.icons[currency+"Icon"].innerHTML = Game.currency[currency];
}

//debugging and testing function, gives ores
function giveOre(ore, amount){
  for(var i = 0; i < Game.inventory.length; i++){
    if(ore.toLowerCase() === Game.inventory[i].name.toLowerCase()){
      Game.inventory[i].qty += amount;
      Game.inventory[i].boxLink.className = "box";
      Game.inventory[i].amountLink.innerHTML = Game.inventory[i].qty;
      return;
    }
  }
}

//debugging and testing function, gives store item
function giveItem(item){
  for(var i = 0; i < Game.store.length; i++){
    if(item.toLowerCase() === Game.store[i].name.toLowerCase()){
      buyItemBypass(i);
      return;
    }
  }
}

//debugging and testing function, gives people item
function givePeople(people){
  for(var i = 0; i < Game.people.length; i++){
    if(people.toLowerCase() === Game.people[i].name.toLowerCase()){
      buyPeopleBypass(i);
      return;
    }
  }
}