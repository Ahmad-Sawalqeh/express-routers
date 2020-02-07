/* eslint-disable new-cap */
/* eslint-disable strict */
/* eslint-disable camelcase */
'use strict';

const { server, } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Test API for Categoris', () => {

  it('testing get category route for all categories', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
        expect(typeof data.body).toMatch('object');
      });
  });

  it('testing get category route to get one category', () => {
    let obj = { name: 'cellphone', category:'phones', display_name: 'M20',description: 'has 2 cameras', };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            let record = data.body[0];
            Object.keys(obj).forEach(key => {
              expect(record[key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('testing post category route for new category', () => {
    let obj = { name: 'cellphone', category:'phones', display_name: 'M20',description: 'has 2 cameras', };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        let record = data.body;
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('testing update category route', () => {
    let obj = { name: 'cellphone', category:'phones', display_name: 'M20',description: 'has 2 cameras', };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send({ description: 'has 2 cameras and full touch screen', })
          .then(results => {
            expect(results.status).toBe(201);
            expect(results.body.description).toEqual('has 2 cameras and full touch screen');
          });
      });
  });

  it('testing delete category route', () => {
    let obj = { name: 'cellphone', category:'phones', display_name: 'M20',description: 'has 2 cameras', };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then(data => {
        return mockRequest
          .delete(`/api/v1/categories/${data.body._id}`)
          .send(obj)
          .then(() => {
            return mockRequest.get(`/api/v1/categories/${data.body._id}`)
              .then(results => {
                expect(results.status).toBe(200);
                expect(results.body[0]).toBe();
              });
          });
      });
  });

});
