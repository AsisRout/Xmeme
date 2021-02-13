//Swagger

const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/memeRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles);