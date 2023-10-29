process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let names = require('../fakeDB');

let userList = ["joelburton", "elie"];

beforeEach(function () {
  names.push(userList);
});

afterEach(function () {
  names.length = 0;
});

describe("GET /base", function() {
    test("Gets a list of names", async function() {
        const resp = await request(app).get('/base');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ names : [userList] });
    });
});
// end

describe("POST /base", function () {
  test("Creates a list with names and bios", async function () {
    const resp = await request(app)
      .post(`/base`)
      .send({ developers: ["joelburton"] });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      item: {
        name: "Joel Burton",
        bio: "Open source developer. Former dev at Apple, Planned Parenthood, Zana. Former VP of Ed at Hackbright. Python, JS, design, cats, tea, but not always in that order",
      },
    });
  });

  test("Responds with 400 if name or price is missing", async function () {
    const resp = await request(app).post(`/base`).send({ developers: [] }); 
    expect(resp.statusCode).toBe(400);
    expect(resp.body).toHaveProperty("error"); 
  });
});
