import { SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "MyFlight",
      version: '1.0.0',
      description: "Página de venta de paquetes de vuelos",
    },
    servers: [ 
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/routes/*.ts']
};
