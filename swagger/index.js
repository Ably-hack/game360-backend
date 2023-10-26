export const swaggerUIOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Game360 API",
            version: "1.0.0",
            description: "Game360 API Services",
        },
    },
    apis: ["./Routes/*.js"],
}