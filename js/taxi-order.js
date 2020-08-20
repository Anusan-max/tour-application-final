//to reuse the same variable and reduce memory use 
const nameField = document.getElementById('name')
const distanceField = document.getElementById('distance')
const pointField = document.getElementById('pointId')
const carsField = document.getElementById('cars')
const fuelField = document.getElementById('fuel')
const stayField = document.getElementById('stay')

const addToCartButton = document.getElementById('addToCartId')

var submitName;


function submitForm (form)
{
  if (submitName == "addtoCart")
  {
	addToCart()
  }
  else if (submitName == "reserve")
  {
	showOrderThankYouMessageAndReset()
  } else if (submitName == "saveFavourite") {
	saveFavourite()
  }else if (submitName == "orderFavourite") {
	orderFavourite()
  }else if (submitName == "Loyality") {
	checkLoyality()
  }
  return false;
}

function setSubmit(button)
{
  submitName = button.value;
}



  function checkValidFiend(){}

// setting the price for taxi
var pricePerKm = {
	"tuk-tuk" : 50,
	"mini-car" : 75,
	"luxury-car" : 100,
	"luxury-van" : 150,
	"luxury-bus" : 200
}

// setting fuel cost
var fuelCost = {
	"High" : 2000,
	"Medium" : 1000,
	"Low" : 500
}

//define overallorder
var overrallOrder = {
	orders : []
}

// define current order 
var currentOrder = {}

var loyalityPoints = 0;

function addToCart() {
	currentOrder = addOrder()
	setPrice(currentOrder)
	overrallOrder.orders.push(currentOrder)
	displayCurrentOrder()
	console.log(overrallOrder)
}

function addtoFavourite() {
	currentFavouriteOrder = addOrder()
	setPrice(currentFavouriteOrder)
	return currentFavouriteOrder

}

function addOrder() {
	var order = {
		'name' : nameField.value,
		'cars' :  carsField.value,
		'fuel' : fuelField.value,
		'distance': distanceField.value,
		'stay' :stayField.value,
		'point' :  pointField.value,
		 "totalPrice" : 0
	}
	return order;
}

function calculateTotal() {
	var total = 0 
	console.log("orders __ " + overrallOrder.orders[0])
	overrallOrder.orders.forEach (co => { total += co.totalPrice})
	return total;
}

function setPrice(currentOrder) {
	if(currentOrder.stay === "oneway") {
		console.log('cost is ' + oneWayCost(currentOrder))
		currentOrder.totalPrice = fuelCost[currentOrder.fuel] + oneWayCost(currentOrder)
	} if(currentOrder.stay === "twoway") {
		currentOrder.totalPrice = twoWayCost(currentOrder)
	} if(currentOrder.stay === "overnight") {
		currentOrder.totalPrice = twoWayCost(currentOrder) + 500
	} 
}

function oneWayCost(currentOrder) {
	return pricePerKm[currentOrder.cars] *  currentOrder.distance
}

function twoWayCost(currentOrder) {
	return fuelCost[currentOrder.fuel] + (2 * oneWayCost(currentOrder))
}



function saveFavourite() {
	localStorage.setItem("favouriteOrder" , JSON.stringify(addtoFavourite()))
}

function orderFavourite() {
	overrallOrder.orders.push(JSON.parse(localStorage.getItem('favouriteOrder')))
	displayCurrentOrder()
}

function checkLoyality() {
	var noOfTaxis = overrallOrder.orders.length;
		if(noOfTaxis > 4) {
			loyalityPoints = noOfTaxis * 20
			localStorage.setItem("loyalityPoints" , loyalityPoints)
		}
	displayLoyalityPoints()
}

function getLoyalityPoints() {
	localStorage.getItem('loyalityPoints')
}

function displayLoyalityPoints() {
	var loyalityPoints = localStorage.getItem('loyalityPoints')
	if(loyalityPoints === null) {
		document.getElementById('loyalityPoints').innerHTML = 0
	} else{
		document.getElementById('loyalityPoints').innerHTML = loyalityPoints
	}
}

 
  
function displayCurrentOrder() {
	if(currentOrder.totalPrice === undefined) {
		document.getElementById('currentOrder').innerHTML = 0;
		document.getElementById('totalOrder').innerHTML = 0;
		document.getElementById('taxiNo').innerHTML = 0;
	} else if (calculateTotal() === undefined) {
		document.getElementById('currentOrder').innerHTML = currentOrder.totalPrice;
		document.getElementById('totalOrder').innerHTML =calculateTotal();
	}else  {
		document.getElementById('currentOrder').innerHTML = currentOrder.totalPrice;
		document.getElementById('totalOrder').innerHTML = calculateTotal();
		document.getElementById('taxiNo').innerHTML = overrallOrder.orders.length;
	}
}

function showOrderThankYouMessageAndReset() {
	displayThankYouMessage()
	clearFieldsAndOrders()
	localStorage.clear();
	clearOrders();
	displayCurrentOrder();
}

function displayThankYouMessage() {
	document.getElementById('orderThanksMessage').innerHTML = "Thank you for your custom - " + currentOrder.name + " ( Total payment is " + calculateTotal() + " )";
}

function clearFieldsAndOrders() {
		nameField.value ='',
	    carsField.value = 'tuk-tuk',
		fuelField.value ='Medium',
		distanceField.value = '',
		stayField.value = 'oneway',
		pointField.value = ''

}

function clearOrders() {
	overrallOrder = {orders : []},
	currentOrder = {} 
}

window.onload  = function(){ 
	localStorage.clear();
}
