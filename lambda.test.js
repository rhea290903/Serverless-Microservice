const { handler } = require('./lambda');


jest.mock('pg', () => ({
    Client: jest.fn(() => ({
        connect: jest.fn(),
        query: jest.fn(() => ({
            rows: [{ id: 1, name: 'Rhea Sheth', salary: 100000, designation: 'CEO' }],
        })),
        end: jest.fn(),
    })),
}));

describe('Lambda Function Tests', () => {
    test('Fetch employee with highest salary', async () => {
        const event = {};
        const response = await handler(event);

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('string');

        const data = JSON.parse(response.body);
        expect(data.id).toBe(1);
        expect(data.name).toBe('Rhea Sheth');
        expect(data.salary).toBe(100000);
        expect(data.designation).toBe('CEO');
    },1000);

    test('Internal server error', async () => {
        const event = {};
        jest.spyOn(console, 'error').mockImplementation(() => {});
        const response = await handler(event);

        expect(response.statusCode).toBe(500);
        expect(typeof response.body).toBe('string');

        const data = JSON.parse(response.body);
        expect(data.message).toBe('Internal server error');
    },1000);
});
