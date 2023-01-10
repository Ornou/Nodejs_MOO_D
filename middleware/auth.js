const jwt = require('jsonwebtoken');
const jwtSecret = 'YOUR_SECRET_KEY';
const {
    User,
    Role
} = require('./../models/index');

// Middleware pour vérifier les jetons JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('Token not provided');
        }
        try {
            const {
                userId
            } = jwt.verify(token, jwtSecret);
            req.userId = userId;
            next();
        } catch (error) {
            res.status(400).send('Invalid token');
        }
    } else {
        res.status(400).send('Invalid token');
    }
};

// Middleware pour vérifier les rôles d'utilisateur
function authorize (method) {
    return async (req, res, next) => {
        try {
            const user = await User.findByPk(req.userId);
            user_role = user.role;

            const role = await Role.findByPk(user_role);
           // console.log(role.roles);
            
            // Si roles n'est pas un tableau, créez-en un avec un seul élément
            var roles = role.roles.split(",");
            // Vérifiez si l'utilisateur possède l'un des rôles autorisés
            if (!roles.includes(method)) {
                //
                // Si l'utilisateur ne possède pas de rôles autorisés, renvoyez une erreur
                return res.status(401).json({
                    message: 'Insufficient role',
                });
            }

            // Si l'utilisateur possède un rôle autorisé, passez à la suite de l'exécution
            next();
        } catch (error) {
            return res.status(500).send(error);
        }
    };
};

module.exports = {
    authenticateJWT,
    authorize
};