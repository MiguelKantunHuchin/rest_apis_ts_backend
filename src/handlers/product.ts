import { Request, Response } from 'express'
import Product from '../models/Product.model'



export const readProducts = async (req: Request, res: Response) => {
    try {

        const products = await Product.findAll({ order: ['id']})
        res.json({ data: products })

    } catch (error) {
        console.log(error)
    }
}



export const readProductById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const product = await Product.findByPk(id)


        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'

            })

        }

        res.json({ data: product })


    } catch (error) {
        console.log(error)
    }
}



export const createProduct = async (req: Request, res: Response) => {

    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })

    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'

            })
        }

        //Si existe el producto, se actualiza 

        await product.update(req.body)
        await product.save()



        res.json({ data: product })

    } catch (error) {
        console.log(error)
    }
}


export const updateAvailability = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'

            })
        }

        //Si existe el producto, se actualiza 

        product.availability = !product.dataValues.availability
        await product.save()

        res.json({ data: product })

    } catch (error) {
        console.log(error)
    }
}


export const deleteProduct = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'

            })
        }

        //Si existe el producto, se elimina

        await product.destroy()
        res.json({ data: product })

    } catch (error) {
        console.log(error)
    }

}