import { Router } from "express";
import { createUserController, 
    readUsersController,
    updateUserController,
    deleteUserController,
} from "@controllers/user.controllers";
import verifyToken from "@root/middlewares/auth.middleware";

const router = Router()
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener un solo usuario u obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Ana
 *                   surnames:
 *                     type: string
 *                     example: Pérez
 *                   email:
 *                     type: string
 *                     example: ana@example.com
 *                   role:
 *                     type: string
 *                     example: client
 *       404:
 *         description: No se encontraron usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se encontraron usuarios en la base de datos
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error inesperado en el servidor
 *                 statusCode:
     *                 type: integer
 *                     example: 500 
 *
 */
router.post("/user", createUserController);

/**
* @swagger
* /user:
    * post:
*
*
*
*/
router.get("/user", readUsersController);

router.put("/user", verifyToken,  updateUserController);

router.delete("/user", verifyToken, deleteUserController);

export default router
