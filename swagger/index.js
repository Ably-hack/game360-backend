export const swaggerUIOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Game360 API",
            version: "1.0.0",
            description: "Game360 API Services",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },
    apis: ["./swagger/*.js"],
}