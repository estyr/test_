
const { Sequelize, Model, DataTypes } = require("sequelize");
//create sqlite db 
const sequelize = new Sequelize("sqlite:DB_Houses.db");
//create the table with attributes
const DB = sequelize.define("DB", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
  address: {
    type: DataTypes.STRING,
    allowNull: false
    },
  currentValue: {
    type: Sequelize.FLOAT,
    allowNull: false
    },
  loanAmount: {
    type: Sequelize.FLOAT,
    allowNull: false
    },
  risk: {
    type: Sequelize.FLOAT,
    allowNull: false
    }
});
//create a new house
//function get address,currentValue,loanAmount 
//and return new house id or error
module.exports.createHouse=async function (address,currentValue,loanAmount){
  try{
    var risk=0
    var loanAmount=parseFloat(loanAmount)
    var currentValue=parseFloat(currentValue)
    if(loanAmount<currentValue)
      return ("loanAmount must be >=currentValue") 
    risk=currentValue/loanAmount
    if (loanAmount>=currentValue+(currentValue/100)*50)
      risk+=(risk/100)*10
    const house = await DB.create({ address: address ,currentValue:currentValue,loanAmount:loanAmount,risk:risk.toFixed(3) });
    return(house.id)}
  catch(error){
    return({"error":error}) 
    }
}
//get house details
//function get id and return house object or error
module.exports.getHouse=async function (id){
  try{
    var house= await DB.findAll({
      where: {
        id: id
      }
    });
    return(house)}
  catch(error){
    return({"error":error}) 
    }
}
//update house
//function get :id,address,currentValue,loanAmount
//update address,currentValue,loanAmount attributes and calculate rhe risk attribute
//and return an array of affected rows or error
module.exports.updateHouse=async function (id,address,currentValue,loanAmount){
  try{
    var risk=0
    var loanAmount=parseFloat(loanAmount)
    var currentValue=parseFloat(currentValue)
    if(loanAmount<currentValue)
      return ("loanAmount must be >=currentValue") 
    risk=currentValue/loanAmount
    if (loanAmount>=currentValue+(currentValue/100)*50)
      risk+=(risk/100)*10
    var update_row =  await DB.update({ address: address ,currentValue:currentValue,loanAmount:loanAmount,risk:risk.toFixed(3)  }, {
      where: {
        id: id
      }
    });
    return(update_row)}
  catch(error){
    return({"error":error}) 
    }
}

