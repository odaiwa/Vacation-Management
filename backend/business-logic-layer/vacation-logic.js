const dal = require("../data-access-layer/dal");
const path = require("path");
const uuid = require("uuid"); 
const filesHelper = require("../helpers/files-helper"); 

//Get all vacations from Db
async function getAllVacationsAsync() {
    const sql =`SELECT vacationId ,destination, DATE_FORMAT(startDate,"%Y-%m-%d")as startDate, DATE_FORMAT(endDate,"%Y-%m-%d")as endDate, price, description , img FROM vacations`;
    const vacations = await dal.executeAsync(sql);
    return vacations;
}
