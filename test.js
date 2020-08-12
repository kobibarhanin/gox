
// async function myfunction() {
// 	gox = await Gox.deployed();
// 	console.log(gox);
// }

// myfunction();


// gox = await Gox.deployed();
// console.log(gox);

module.exports = function(callback) {


const artifacts = require('./build/contracts/Gox.json')
const contract = require('truffle-contract')
const Gox = contract(artifacts);

  	console.log('here')

Gox.deployed()
	.then(function(instance) {
  	console.log(instance.address)
	callback();

}).catch(function(error) {
  console.error(error)
})

}