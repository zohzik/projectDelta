//This is an object that holds all variables that are not player-specific
function gameFeild(){
  
  //links to the html document
  this.htmlLinks = {
    
    //axe and top-space icons
    icons : {
      axeIcon : document.getElementById("main-clicker-img"),
      goldIcon : document.getElementById("player-gold-space-insert"),
      populationIcon : document.getElementById("player-population-space-insert")
    },
    
    //the in-game pages
    pages : {
      inventoryPage : document.getElementById("inventory-page"),
      storePage : document.getElementById("store-page"),
      peoplePage : document.getElementById("people-page"),
      craftingPage: document.getElementById("crafting-page")
    }
    
  };
  
  //different variables tracked in the top-space
  this.currency = {
    gold : 0,
    population : 0,
    maxPopulation : 0
  };
  
  //array that is filled with all the different ores in-game
  this.inventory = [];
  
  //array that is filled with all the different store items in-game
  this.store = [];
  
  //array that is filled with all the different people in-game
  this.people = [];
  
  //array that is filled with all the crafting items
  this.crafting = [];
  
  //timers, carrier variables
  this.others = {
    activePage : "inventory",
    mainButtonLevel: 0,
    minerLevel : 0,
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
      minePerClickMultiplier : 1,
      gold : 0
    },
    
    //array of items bought in the store
    storeItemsBought : [0]
  };
}

//update, money collection
function update(){
  for(var i = 0; i < Game.people.length; i++){  //loops through the Game.people array, for each person
    for(var w = 0; w < Game.people[i].qty; w++){  //loops through so the effect works for each person of said type you own
      if(Game.people[i].mineType === "ore"){
        mineWithPickaxe(i);
      }else if(Game.people[i].mineType === "wood"){
        mineWithAxe(i);
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

//basic crafting item object, includes links to respective html document box.
function craft(name, requirements, qty, amountLink, buyLink, effect){
  this.name = name;
  this.requirements = requirements;
  this.qty = qty;
  this.amountLink = amountLink;
  this.buyLink = buyLink;
  this.effect = effect;
}

//intilized craft, and puts it inside the Game.crafting array
function initCraft(name, requirements, qty, amountLink, buyLink, effect){
  Game.crafting[Game.crafting.length] = new craft(name, requirements, qty, amountLink, buyLink, effect);
}

//basic people object, includes links to respective html document box
function people(name, cost, qty, maxQty, mineType, mineTimes, costIncrease, amountLink, maxAmountLink, costLink, mineTimesLink, effect){
  this.name = name;
  this.cost = cost;
  this.qty = qty;
  this.maxQty = maxQty;
  this.mineType = mineType;
  this.mineTimes = mineTimes;
  this.costIncrease = costIncrease;
  this.amountLink = amountLink;
  this.maxAmountLink = maxAmountLink;
  this.costLink = costLink;
  this.mineTimesLink = mineTimesLink;
  this.effect = effect;
}

//initilizes people, and puts it inside the Game.people array
function initPeople(name, cost, qty, maxQty, mineType, mineTimes, costIncrease, amountLink, maxAmountLink, costLink, mineTimesLink, effect){
  Game.people[Game.people.length] = new people(name, cost, qty, maxQty, mineType, mineTimes, costIncrease, amountLink, maxAmountLink, costLink, mineTimesLink, effect);
}

//asks user for username, loads gameFeild, then loads all other respective elements
window.onload = function(){
  document.getElementById("player-name-space-insert").innerHTML = "testing"; //prompt("What is your name?", "Max nine characters");
  window.Game = new gameFeild();
  loadInventory();
  loadStore();
  loadPeople();
  loadCraft();
  Game.others.collectionTimer();
};

//calls initOre on each ore //name, worth, qty, $amount, $sell, $box
function loadInventory(){
  initOre("dirt", 0.01, 0, document.getElementById("inventory-box-0-amount"), document.getElementById("inventory-box-0-sell-num"), document.getElementById("inventory-box-0"));
  initOre("rock", 0.10, 0, document.getElementById("inventory-box-1-amount"), document.getElementById("inventory-box-1-sell-num"), document.getElementById("inventory-box-1"));
  initOre("clay", 0.50, 0, document.getElementById("inventory-box-2-amount"), document.getElementById("inventory-box-2-sell-num"), document.getElementById("inventory-box-2"));
  initOre("coal", 1, 0, document.getElementById("inventory-box-3-amount"), document.getElementById("inventory-box-3-sell-num"), document.getElementById("inventory-box-3"));
  initOre("wood", 0.75, 0, document.getElementById("inventory-box-4-amount"), document.getElementById("inventory-box-4-sell-num"), document.getElementById("inventory-box-4"));
  initOre("iron", 1.50, 0, document.getElementById("inventory-box-5-amount"), document.getElementById("inventory-box-5-sell-num"), document.getElementById("inventory-box-5"));
  initOre("copper", 1.50, 0, document.getElementById("inventory-box-6-amount"), document.getElementById("inventory-box-6-sell-num"), document.getElementById("inventory-box-6"));
  initOre("silver", 3, 0, document.getElementById("inventory-box-7-amount"), document.getElementById("inventory-box-7-sell-num"), document.getElementById("inventory-box-7"));
  initOre("gold", 5, 0, document.getElementById("inventory-box-8-amount"), document.getElementById("inventory-box-8-sell-num"), document.getElementById("inventory-box-8"));
  
}

//calls initItem on each store item //name, cost, $buy, effect
function loadStore(){
  initItem("Pickaxe efficiency x2", 50, document.getElementById("store-box-0"), function(){
    Game.player.variables.minePerClickMultiplier++;
  });
}

//calls initPeople on each people item //name, cost, qty, maxqty, minetype, minetimes, costIncrement, $amount, $maxamount, $cost, $minetimes, effect
function loadPeople(){
  
  initPeople("Miner", 100, 0, 5, "ore", 1, 1.215, document.getElementById("people-box-0-amount"), document.getElementById("people-box-0-max-amount"), document.getElementById("people-box-0-cost"), document.getElementById("people-box-0-per-sec"), function(){
    if(Game.people[0].qty===1){
      //unlocks option for level 2 upgrades if bought with woodsman
    }
  });
  
  initPeople("Woodsman", 250, 0, 2, "wood", 1, 1.5, document.getElementById("people-box-1-amount"), document.getElementById("people-box-1-max-amount"), document.getElementById("people-box-1-cost"), document.getElementById("people-box-0-per-sex"), function(){
    //unlocks option for level 2 upgrades if bought with miner
  });
  
}

//calls initCraft on each craft item //name, requirements(follows pattern page Id amount page Id amount ie: [0, [0, 10], 0, [3, 50]]), qty, amountLink, buyLink, effect
function loadCraft(){
  initCraft("Dirt hut", [0, [0, 100], 0, [2, 50]], 0, document.getElementById("crafting-box-0-amount"), document.getElementById("crafting-box-0-buy"), function(){
    Game.currency.maxPopulation++;
    Game.htmlLinks.icons.populationIcon.innerHTML = Game.currency.population + "/" + Game.currency.maxPopulation;
    //unlocks people tab
  });
  initCraft("Rock slate", [0, [1, 50], 0, [2, 10]], 0, document.getElementById("crafting-box-1-amount"), document.getElementById("crafting-box-1-buy"), function(){
    //does nothing yet
  });
  initCraft("refined pickaxe", [3, [1, 10], 0, [4, 20]], 0, document.getElementById("crafting-box-2-amount"), document.getElementById("crafting-box-2-buy"), function(){
    document.getElementById("crafting-box-2").className="na";
    Game.player.variables.minePerClick += 4;
    Game.others.mainButtonLevel=1;
  });
}

//pickaxe animation
function replaceImage(){
  Game.htmlLinks.icons.axeIcon.src = "./assets/pic2.jpg";
  window.setTimeout(function(){Game.htmlLinks.icons.axeIcon.src="./assets/pic.jpg"}, 50);
}

//basic mining structure
function mine(id){
  Game.inventory[id].boxLink.className = "box";
  Game.inventory[id].qty++;
  Game.inventory[id].amountLink.innerHTML = Game.inventory[id].qty;
}

//adds +1 to generated ore for each ore you get per click
function mineWithMainButton(){
  for(var i = 0; i < (Game.player.variables.minePerClick * Game.player.variables.minePerClickMultiplier); i++){
    var carrierId = generateOreId(Game.others.mainButtonLevel);
    mine(carrierId);
  }
}

//same as above, but for the people objects
function mineWithPickaxe(id){
  for(var i = 0; i < Game.people[id].mineTimes; i++){
    var carrierId = generateOreId(Game.others.minerLevel);
    mine(carrierId);
  }
}

//adds +1 to generated wood typed ore
function mineWithAxe(id){
  for(var i = 0; i < Game.people[id].mineTimes; i++){
    mine(4);
  }
}

//animates pickaxe, then mines
function mainButtonClick(){
  replaceImage();
  mineWithMainButton();
}

//generates a random ore based on a % likelyhood of apperance
function generateOreId(level){
  var carrierId = Math.floor(Math.random() * 100) + 1;
  switch(level){
    case 0:
      return generate0(carrierId);
    case 1:
      return generate1(carrierId);
    default:
      break;
  }
}

//level 0 ore generator
function generate0(carrierId){
  if(carrierId > 50){
    return 0;
  }else if(carrierId > 20){
    return 1;
  }else if(carrierId > 5){
    return 2;
  }else if(carrierId >= 1){
    return 3;
  }
}

//level 2 ore generator
function generate1(carrierId){
  if(carrierId === 1)
    return 8;
  else if(carrierId <= 6)
    return 7;
  else if(carrierId <= 16)
    return 6;
  else if(carrierId <= 26)
    return 5;
  else if(carrierId <= 41)
    return 3;
  else if(carrierId <= 56)
    return 2;
  else if(carrierId <= 75)
    return 1;
  else if(carrierId <= 100)
    return 0;
}

//sells specific amount of specific ore
function sellOre(id){
  if(Game.inventory[id].qty >= Game.inventory[id].sellLink.value && Game.inventory[id].sellLink.value > 0){
    Game.inventory[id].qty-=Game.inventory[id].sellLink.value;
    Game.currency.gold+=(Game.inventory[id].sellLink.value * Game.inventory[id].worth);
    Game.currency.gold = fixNum(Game.currency.gold);
    Game.htmlLinks.icons.goldIcon.innerHTML = Game.currency.gold;
    Game.inventory[id].amountLink.innerHTML = Game.inventory[id].qty;
    Game.inventory[id].sellLink.value = 0;
    if(Game.inventory[id].qty === 0){
      Game.inventory[id].boxLink.className = "na";
    }
  }else{
    Game.inventory[id].sellLink.value = 0;
  }
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
  if(Game.currency.gold >= Game.people[id].cost && Game.people[id].qty < Game.people[id].maxQty && Game.currency.population < Game.currency.maxPopulation){
    Game.currency.gold -= Game.people[id].cost;
    Game.currency.gold = fixNum(Game.currency.gold);
    Game.htmlLinks.icons.goldIcon.innerHTML = Game.currency.gold;
    Game.currency.population++;
    Game.htmlLinks.icons.populationIcon.innerHTML = Game.currency.population + "/" + Game.currency.maxPopulation;
    Game.people[id].qty++;
    Game.people[id].cost*=Game.people[id].costIncrease;
    Game.people[id].cost = fixNum(Game.people[id].cost);
    Game.people[id].amountLink.innerHTML = Game.people[id].qty;
    Game.people[id].costLink.innerHTML = Game.people[id].cost;
    Game.people[id].effect();
    
  }
}

/*buys person, bypassing the cost, and max qty , and max population
used for loading, since other effects and upgrades may not be in place to raise max qty yet in loading*/
function buyPeopleBypass(id){
  Game.people[id].qty++;
  Game.people[id].cost*=Game.people[id].costIncrease;
  Game.people[id].cost = fixNum(Game.people[id].cost);
  Game.people[id].amountLink.innerHTML = Game.people[id].qty;
  Game.people[id].costLink.innerHTML = Game.people[id].cost;
  Game.people[id].effect();
}

//crafts item
function craftItem(id){
  var carrierId = 0;
  var carrierPage = "inventory";
  for(var i = 0; i < Game.crafting[id].requirements.length; i++){
    if(i % 2 === 0){
      switch(Game.crafting[id].requirements[i]){
        case 0:
          carrierPage = "inventory";
          continue;
        case 1:
          carrierPage = "store";
          continue;
        case 2:
          carrierPage = "people";
          continue;
        case 3:
          carrierPage = "crafting";
          continue;
        default:
          break;
      }
    }else{
      carrierId = Game.crafting[id].requirements[i][0];
      if(Game[carrierPage][carrierId].qty >= Game.crafting[id].requirements[i][1]){
        continue;
      }else{
        return;
      }
    }
  }
  for(i = 0; i < Game.crafting[id].requirements.length; i++){
    if(i % 2 === 0){
      switch(Game.crafting[id].requirements[i]){
        case 0:
          carrierPage = "inventory";
          continue;
        case 1:
          carrierPage = "store";
          continue;
        case 2:
          carrierPage = "people";
          continue;
        case 3:
          carrierPage = "crafting";
          continue;
        default:
          break;
      }
    }else{
      carrierId = Game.crafting[id].requirements[i][0];
      Game[carrierPage][carrierId].qty -= Game.crafting[id].requirements[i][1];
      if(carrierPage === "inventory"){
        if(Game.inventory[carrierId].qty === 0){
          Game.inventory[carrierId].boxLink.className = "na";
        }
      }
      Game[carrierPage][carrierId].amountLink.innerHTML = Game[carrierPage][carrierId].qty;
    }
  }
  Game.crafting[id].qty++;
  Game.crafting[id].amountLink.innerHTML = Game.crafting[id].qty;
  Game.crafting[id].effect();
}

//crafts item, bypassing the ore requirements
function craftItemBypass(id){
  Game.crafting[id].qty++;
  Game.crafting[id].amountLink.innerHTML = Game.crafting[id].qty;
  Game.crafting[id].effect();
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

//debugging and testing function, gives crafted item
function giveCraft(craft){
  for(var i = 0; i < Game.crafting.length; i++){
    if(craft.toLowerCase() === Game.crafting[i].name.toLowerCase()){
      craftItemBypass(i);
      return;
    }
  }
}