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


// GET http://localhost:3001/api/vacations
//router.get("/", verifyLoggedIn , async (request, response)=> {
router.get("/", async (request, response) => {
    try {
        const vacations = await vacationLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/vacations/:id
//router.get("/:id", verifyLoggedIn , async (request, response)=> {
router.get("/:id", async (request, response) => {
    try {
        // Data:
        const id = +request.params.id;
        // Logic
        const vacation = await vacationLogic.getOneVacationAsync(id);
        if (!vacation) 
            return response.status(404).send(`no cavation with id ${id} was found.`);
        response.json(vacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// POST http://localhost:3001/api/vacations
//router.post("/", [verifyLoggedIn , verifyAdmin] ,async (request, response)=> {
router.post("/" ,async (request, response)=> {
    try {
        // if(!request.files.img) return response.status(400).send("No Image sent!"); 
        // Data: 
        const newVacation = new VacationModel(request.body);

        // Validation: 
        const errors = newVacation.validatePost();
        if (errors) return response.status(400).send(errors);

        // Logic:         
        const addedVacation = await vacationLogic.addVacationAsync(newVacation , request.files ? request.files.img : null);
        // if (!addedVacation) 
        //     return response.status(400).send("No Image sent!");
        
        // Success: 
        response.status(201).json(addedVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// PUT http://localhost:3001/api/vacations/:id
//router.put("/:id", [verifyLoggedIn , verifyAdmin] , async (request, response)=> {
router.put("/:id" , async (request, response)=> {
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
        const updatedVacation = await vacationLogic.updateFullVacationAsync(vacationToUpdate , request.files ? request.files.img : null, currentImageName[0].img);
        if(!updatedVacation) return response.status(404).send(`id ${id} not found..`);
        // Success:
        response.status(201).json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;