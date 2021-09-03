const express = require("express");
const followersLogic = require("../business-logic-layer/followers-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const errorHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();
// router.use(verifyLoggedIn);

// GET http://localhost:3001/api/followers
router.get("/", async (request, response) => {
    try {
        // Logic:
        const followers = await followersLogic.getAllDetailsOfFollowersAsync();
        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});


// GET http://localhost:3001/api/followers/user-count
router.get("/user-count", async (request, response) => {
    try {
        // Logic:
        const followers = await followersLogic.getCountOfUsersFollowingAsync();
        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }

});

// GET http://localhost:3001/api/followers/4
router.get("/:uuid", async (request, response) => {
    try {
        const uuid = request.params.uuid;

        // Data:
        const user = await usersLogic.getOneUserAsync(uuid);
        const userId = user.userId;

        // Logic:
        const followers = await followersLogic.getOneFollowerAsync(userId);

        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/followers/4/2
router.get("/:uuid/:vacationId", async (request, response) => {
    try {
        const uuid = request.params.uuid;
        const vacationId = +request.params.vacationId;

        // Data:
        const user = await usersLogic.getOneUserAsync(uuid);
        const userId = user.userId;

        // Logic:
        const followers = await followersLogic.getOneFollowerByVacationIdAsync(userId, vacationId);
        if (!followers) return response.json(followers);

        // Success:
        response.json(followers);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// GET http://localhost:3001/api/followers/by-userid/7
router.get("/by-userid/:id", async (request, response) => {
    try {
        const id = +request.params.id;

        // Logic:
        const following = await followersLogic.getVacationsFollowingByUserIdAsync(id);
        if (!following)
            return response.status(404).send(`id ${id} not found..`);

        // Success:
        response.json(following);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});



// module.exports = {
//     getAllFollowsAsync,
//     getCountOfUsersFollowingAsync,
//     getOneFolloweAsync,
//     getOneFollowerByVacationIdAsync,
//     getAllDetailsOfFollowerAsync,
//     deleteFollowerAsync,
//     addFollowingToVacationAsync,
//     getVacationsFollowersByUserIdAsync,
//     getUsersByVacationIdAsync
// };