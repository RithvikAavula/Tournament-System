class AuthController {

    static async login(req, res) {

        return res.status(501).json({

            success: false,

            message:
                "Authentication is not implemented."

        });

    }

    static async register(req, res) {

        return res.status(501).json({

            success: false,

            message:
                "Registration is not implemented."

        });

    }

}

module.exports = AuthController;