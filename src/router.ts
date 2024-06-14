import { Router } from "express";
import { createProduct, deleteProduct, readProductById, readProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router()

/**     
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties: 
 *           id:
 *             type: integer
 *             description: the product ID
 *             example: 1
 *           name:
 *             type: string
 *             description: The product name
 *             example: Monitor curvo
 *           price:
 *             type: number
 *             description: The product price
 *             example: 300
 *           availability:
 *             type: boolean
 *             description: The product availability
 *             example: true
*/

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get a list of products
 *      tags:
 *        - Products
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: Succesful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */



//Routing 

//Obtener todos los productos
router.get("/", readProducts)








//Obtener 1 solo producto
router.get("/:id",

    param('id').isInt().withMessage("ID debe ser un número entero"),
    handleInputErrors,
    readProductById)



//Crear un producto nuevo 
router.post("/",
    //Validacion 
    body('name').notEmpty().withMessage("Nombre de producto obligatorio"),

    body('price').isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("Precio de producto obligatorio")
        .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
    handleInputErrors,
    createProduct)



router.put("/:id",
    param('id').isInt().withMessage("ID debe ser un número entero"),
    body('name').notEmpty().withMessage("Nombre de producto obligatorio"),

    body('price').isNumeric().withMessage("El precio debe ser un número")
        .notEmpty().withMessage("Precio de producto obligatorio")
        .custom(value => value > 0).withMessage("El precio debe ser mayor a 0"),
    body('availability').isBoolean().withMessage("Información de disponibilidad no válido"),
    handleInputErrors,
    updateProduct)

router.patch("/:id",
    param('id').isInt().withMessage("ID debe ser un número entero"),
    handleInputErrors,
    updateAvailability)

router.delete("/:id",
    param('id').isInt().withMessage("ID debe ser un número entero"),
    handleInputErrors,
    deleteProduct)


export default router