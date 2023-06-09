var express = require('express');
var router = express.Router();
var House =require('../classes/House')
//post route to create house
router.post('/', function(req, res, next) {
  async function createHousefunc(){
    var id=await House.createHouse(req.body.address,req.body.currentValue,req.body.loanAmount)
    res.send({res:id})
    }
  createHousefunc()
});
//et route to get details house
router.get('/:Id', function(req, res, next) {
  async function getHousefunc(){
    var house=await House.getHouse(req.params.Id)
    res.send({house:house})
  }
  getHousefunc()
});
//put route to update house
router.put('/:Id', function(req, res, next) {
  async function updateHousefunc(){
    var update_House=await House.updateHouse(req.params.Id,req.body.address,req.body.currentValue,req.body.loanAmount)
    res.send({house:update_House})
  }
  updateHousefunc()
});
module.exports = router;
