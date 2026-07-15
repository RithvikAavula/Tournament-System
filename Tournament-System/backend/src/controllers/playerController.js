const PlayerService = require("../services/playerService");
const { successResponse } = require("../utils/response");

class PlayerController {

    static async createPlayer(req, res, next) {

        try {

            const player =
                await PlayerService.createPlayer(req.body);

            return successResponse(

                res,

                "Player created successfully.",

                player,

                201

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async getPlayers(req, res, next) {

        try {

            const players =
                await PlayerService.getPlayers();

            return successResponse(

                res,

                "Players fetched successfully.",

                players

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async getAvailablePlayers(req,res,next){

        try{

            const players=

            await PlayerService.getAvailablePlayers(

                req.params.id

            );

            return successResponse(

                res,

                "Available players fetched successfully.",

                players

            );

        }

        catch(error){

            next(error);

        }

    }

    static async getPlayer(req, res, next) {

        try {

            const player =
                await PlayerService.getPlayer(
                    req.params.id
                );

            return successResponse(

                res,

                "Player fetched successfully.",

                player

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async updatePlayer(req, res, next) {

        try {

            const player =
                await PlayerService.updatePlayer(

                    req.params.id,

                    req.body

                );

            return successResponse(

                res,

                "Player updated successfully.",

                player

            );

        }

        catch (error) {

            next(error);

        }

    }

    static async deletePlayer(req, res, next) {

        try {

            const result =
                await PlayerService.deletePlayer(
                    req.params.id
                );

            return successResponse(

                res,

                result.message

            );

        }

        catch (error) {

            next(error);

        }

    }

}

module.exports = PlayerController;