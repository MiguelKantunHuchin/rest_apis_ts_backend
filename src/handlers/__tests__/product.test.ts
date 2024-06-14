import request from "supertest";
import server from "../../server";

describe("POST/api/products", () => {


    it("should not allow to create a product", async () => {
        const response = await request(server).post('/api/products').send({
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")


        expect(response.status).not.toBe(201)
        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("data")

    })

    it("should create a new product", async () => {

        const response = await request(server).post('/api/products').send({
            name: "Monitor curvo de testing",
            price: 300
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(401)
        expect(response.body).not.toHaveProperty('errors')
    })

    it('should not allow prices lower than 0', async () => {

        const response = await request(server).post('/api/products').send({
            name: "Monitor curvo de testing",
            price: -300
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)


        expect(response.status).not.toBe(201)
        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("data")
    })

    it('should not allow strings as price', async () => {

        const response = await request(server).post('/api/products').send({
            name: "Monitor curvo de testing",
            price: "string"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)


        expect(response.status).not.toBe(201)
        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("data")
    })

})

describe('GET/api/products', () => {
    it("should get a json response", async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty('errors')

    })
})

describe("GET/api/products/:id", () => {

    it("Should return 404 if the product doesn't exist", async () => {
        const productID = 230
        const response = await request(server).get(`/api/products/${productID}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("Producto no encontrado")
    })

    it('Should check a valid ID in the url', async () => {
        const response = await request(server).get(`/api/products/not-valid-id`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID debe ser un número entero")
    })

    it('Should get a JSON response for a product', async () => {
        const response = await request(server).get(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT/api/products/:id', () => {

    it('Should check a valid ID in the url', async () => {
        const response = await request(server)
            .put(`/api/products/not-valid-id`)
            .send({
                name: "Monitor curvo de testing",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID debe ser un número entero")
    })


    it('should display validation error msgs when updating a product', async () => {

        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should not update a product with price lower than 0', async () => {

        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: "Monitor curvo de testing",
                price: -300,
                availability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })


    it('should return 404 for a non-existing product', async () => {

        const response = await request(server)
            .put('/api/products/2000')
            .send({
                name: "Monitor curvo de testing",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('should update an existing product', async () => {

        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: "Monitor curvo",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE/api/products/:id', () => { 

    it('should check a valid ID', async () => {

        const response = await request(server).delete('/api/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID debe ser un número entero")
    })

    it('should return 404 for a non-existing product', async () => {

        const response = await request(server).delete('/api/products/2000')

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })


    it('should return the deleted product', async () => {

        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })


})
