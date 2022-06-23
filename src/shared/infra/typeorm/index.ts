import { createConnection } from 'typeorm';

try {
    createConnection();

    console.log("Conectado");
} catch (error) {
    console.log(error);
}