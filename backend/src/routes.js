const express = require("express")

routes.get("/", async (request, response) => {
    return response.json({
        skill: "done"
    })
})

module.exports = routes