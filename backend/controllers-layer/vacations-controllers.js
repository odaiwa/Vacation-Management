const express = require("express");
const path = require("path");
const fs = require("fs");
const VacationModel = require("../models/VacationModel");
const vacationLogic = require("../business-logic-layer/vacation-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const errorHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const router = express.Router();
const bodyParser = require('body-parser');


// GET http://localhost:3001/api/vacations
//router.get("/", async (request, response) => {
router.get("/", verifyLoggedIn, async (request, response) => {
    try {
        const vacations = await vacationLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/vacations/:id
//router.get("/:id", async (request, response) => {
router.get("/:id", verifyLoggedIn, async (request, response) => {
    try {
        // Data:
        const id = +request.params.id;
        // Logic
        const vacation = await vacationLogic.getOneVacationAsync(id);
        if (!vacation)
            return response.status(404).send(`no vacation with id ${id} was found.`);
        response.json(vacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});
// express.json();
// POST http://localhost:3001/api/vacations
router.post("/", async (request, response) => {
    //router.post("/", [verifyLoggedIn , verifyAdmin] ,async (request, response)=> {
    try {
        //  console.log("request   "+request.files)
        // console.log("Vacation Controller POST...")
         if (!request.files.img) return response.status(400).send("No Image sent!");
        //Data:
        // console.log("request.body: " + request);
        const newVacation = new VacationModel(request.body);
        // console.log(newVacation);

        // Validation: 
        const errors = newVacation.validatePost();
        if (errors) return response.status(400).send(errors);

        // Logic:         
        // console.log("files: "+request.files);        
        const addedVacation = await vacationLogic.addVacationAsync(newVacation, request.files ? request.files.img : null);
        // if (!addedVacation)
        //     return response.status(400).send("No Image sent!");

        // Success: 
        response.status(201).json(addedVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

router.post("/:id",async(request,response)=>{
    try{
        const id = +request.params.id;
        if(!request.files.img) return response.status(400).send("no image sent!");
        request.body.vacationId = id;
        const addedImageToVacation = await vacationLogic.addImageToVacation(id,request.files.img);
        if (!addedVacation) return response.status(400).send("Somthing oquered");
    }catch(err){
        response.status(500).send(errorHelper.getError(err));
    }
})

// PUT http://localhost:3001/api/vacations/:id
router.put("/:id" , async (request, response)=> {
//router.put("/:id", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        // Data:
        const id = +request.params.id;
        request.body.vacationId = id;
        const vacationToUpdate = new VacationModel(request.body);
        const currentImageName = await vacationLogic.getOneVacationAsync(id);
        // Validation: 
        const errors = vacationToUpdate.validatePut();
        if (errors) return response.status(400).send(errors);
        // Logic:
        const updatedVacation = await vacationLogic.updateFullVacationAsync(vacationToUpdate, request.files ? request.files.img : null, currentImageName[0].img);
        if (!updatedVacation) return response.status(404).send(`id ${id} not found..`);
        // Success:
        response.status(201).json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// DELETE http://localhost:3001/api/vacations/7
router.delete("/:id", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        // Data:
        const id = +request.params.id;
        const currentImageName = await vacationLogic.getOneVacationAsync(id);
        // Logic:
        await vacationLogic.deleteVacationAsync(id, currentImageName[0].img);
        // Success:
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});
module.exports = router;