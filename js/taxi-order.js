// setting the price for taxi
var pricePerKm = {
	"tuk-tuk" : 50,
	"mini-car" : 75,
	"luxury car" : 100,
	"luxury van" : 150,
	"luxury bus" : 200
}

// setting fuel cost
var fuelCost = {
	"High" : 200,
	"Medium" : 1000,
	"Low" : 500
}

//define overallorder
var overrallOrder = {
	orders : []
}

// define current order 
var currentOrder = {}


function addToCart() {
	currentOrder = addOrder()
	getPrice(currentOrder)
	overrallOrder.orders.push(currentOrder)
	console.log(overrallOrder)
}

function addOrder() {
	var order = {
		'name' : document.getElementById('name').value,
		'cars' :  document.getElementById('cars').value,
		'fuel' : document.getElementById('fuel').value,
		'distance': document.getElementById('distance').value,
		'stay' :document.getElementById('stay').value,
		'point' :  document.getElementById('point').value,
		 "totalPrice" : 0
	}
	return order;
}

function calculateTotal() {
	var total = 0 
	console.log("orders __ " + overrallOrder.orders[0])
	overrallOrder.orders.forEach (co => { total += co.totalPrice})
	console.log ("total __ " + total)
}

function getPrice(currentOrder) {
	if(currentOrder.stay === "oneway") {
		currentOrder.totalPrice = pricePerKm[currentOrder.cars] *  currentOrder.distance
	} 
	// add other conditions
}


function saveFavourite() {
	localStorage.setItem("favouriteOrder" , JSON.stringify(addOrder()))
}

function orderFavourite() {
	overrallOrder.orders.push(JSON.parse(localStorage.getItem('favouriteOrder')))
}