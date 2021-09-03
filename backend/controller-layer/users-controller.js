const express = require("express");
const usersLogic = require("../business-logic-layer/users-logic");
const errorHelper = require("../helpers/errors-helper");

const router = express.Router();

//Get all users http://localhost:3001/api/users
router.get("/" ,async (request, response)=> {
    try {
        const users = await usersLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/users/:uuid
router.get("/:uuid", async (request, response)=> {
    try {
        const uuid = request.params.uuid; // uuid of the user
        const user = await usersLogic.getOneUserByUuidAsync(uuid); 
        if(!user) return response.status(404).send(`User not found.`);
        response.json(user);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// PUT http://localhost:3001/api/users/:uuid'
// update user info
router.put("/:uuid", async (request, response)=> {
    try {
        // Data:
        const uuid = request.params.uuid;
        request.body.uuid = uuid;
        const oneUser = new UserModel(request.body);

        // Validation: 
        const errors = oneUser.validatePut();
        if (errors) return response.status(400).send(errors);

        // Logic:
        const updatedUser = await usersLogic.updateFullUserAsync(oneUser);
        if(!updatedUser) return response.status(404).send(`User not found.`);
        response.json(updatedUser);

    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// DELETE http://localhost:3001/api/users/:uuid
router.delete("/:uuid", async (request, response)=> {
    try {
        const uuid = request.params.uuid;
        await usersLogic.deleteUserAsync(uuid);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;