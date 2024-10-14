const request = require('supertest');
const app = require('./index'); 

describe("Pruebas para la API de cafés", () => {
  it("Debe devolver un status code 200 y un arreglo con al menos un objeto", async () => {
    const res = await request(app).get('/cafes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("Debe devolver un código 404 al intentar eliminar un café con un id inexistente", async () => {
    const res = await request(app).delete('/cafes/999').set('Authorization', 'token');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("No se encontró ningún cafe con ese id");
  });

  it("Debe agregar un nuevo café y devolver un código 201", async () => {
    const nuevoCafe = { id: 5, nombre: "Café nuevo" };
    const res = await request(app).post('/cafes').send(nuevoCafe);
    expect(res.statusCode).toBe(201);
    expect(res.body).toContainEqual(nuevoCafe);
  });

  it("Debe devolver un status code 400 si el id del parámetro no coincide con el id del cuerpo", async () => {
    const cafeActualizado = { id: 5, nombre: "Café actualizado" };
    const res = await request(app).put('/cafes/3').send(cafeActualizado);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
  });
});