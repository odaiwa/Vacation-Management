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

//Get vacation by id
async function getOneVacationAsync(id) {
    const sql =`SELECT vacationId ,destination, DATE_FORMAT(startDate,"%Y-%m-%d")as startDate, DATE_FORMAT(endDate,"%Y-%m-%d")as endDate, price, description , img FROM vacations WHERE vacationId = ?`;
    const vacation = await dal.executeAsync(sql,[id]);
    if (vacation.length === 0) return null; 
    return vacation;
}

//add vacation to DB
async function addVacationAsync(vacation, image) {
    console.log("image: "+image);
      if(!image) {
          return null;
      }
     const imgExtention = image?.name.substr(image.name.lastIndexOf("."));
     const newFileName = uuid.v4() + imgExtention;
     console.log(newFileName);
    const sql = `INSERT INTO vacations VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)`;
    const info = await dal.executeAsync(sql,[vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.description, newFileName]); 
    vacation.vacationId = info.insertId;
    vacation.img = newFileName;
    const absolutePath = path.join(__dirname, "..", "images", "vacations", vacation.img);
    await image.mv(absolutePath);
    return vacation;
}

async function addImageToVacation(image,vacationId){
    const imgExtention = image?.name.substr(image.name.lastIndexOf("."));
    const newFileName = uuid.v4() + imgExtention;
    const sql = `INSERT INTO vacations img VALUES ${newFileName} WHERE vacationId = ${vacationId}`;
    const info = await dal.executeAsync(sql); 
    vacation.img = newFileName;
    const absolutePath = path.join(__dirname, "..", "images", "vacations", vacation.img);
    await image.mv(absolutePath);
    return vacation;

}

async function updateFullVacationAsync(vacation, newImage, currentImageName) {
    let newFileName = uuid.v4();
    if(!newImage){
        vacation.img = currentImageName;
    }
    else{
        let absolutePath = path.join(__dirname, "..", "images", "vacations",currentImageName);
        filesHelper.safeDelete(absolutePath);
        const extension = newImage.name.substr(newImage.name.lastIndexOf("."));
        imageName = newFileName + extension ;
        vacation.img = imageName;
        absolutePath = path.join(__dirname, "..", "images", "vacations", imageName);
        await newImage.mv(absolutePath);
    }
    const sql = `UPDATE vacations SET destination = ?, startDate = ?, endDate = ?, price = ?, description = ?, img = ?
                WHERE vacations.vacationId = ?`;
    const info = await dal.executeAsync(sql,[vacation.destination, vacation.startDate, vacation.endDate, vacation.price, vacation.description, vacation.img, vacation.vacationId]);
    return info.affectedRows === 0 ? null : vacation;
}


async function getOrdersByVacationsFollowesAsync(userId) {
    const sql = `SELECT vacations.vacationId ,destination, DATE_FORMAT(startDate,"%Y-%m-%d")as startDate, DATE_FORMAT(endDate,"%Y-%m-%d")as endDate, price, description , img FROM vacations 
                LEFT JOIN (SELECT * FROM followers WHERE userId = ?) as following
                ON vacations.vacationId = following.vacationId
                ORDER BY following.userId DESC`;
    const vacations = await dal.executeAsync(sql,[userId]);
    return vacations;
}

//delete vacatoin bt id
async function deleteVacationAsync(id, currentImageName) {
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    await dal.executeAsync(sql,[id]);
    const absolutePath = path.join(__dirname, "..", "images", "vacations", currentImageName);
    filesHelper.safeDelete(absolutePath);
}

module.exports = {
    getAllVacationsAsync,
    addVacationAsync,
    getOneVacationAsync,
    updateFullVacationAsync,
    getOrdersByVacationsFollowesAsync,
    deleteVacationAsync,
    addImageToVacation
};
