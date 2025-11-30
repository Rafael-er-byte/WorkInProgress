import type iHasher from "../../contracts/utils/iHasher";

export let hasherMock: jest.Mocked<iHasher>;
beforeEach(() => {
    hasherMock = {
        hash: jest.fn((pwd) => {return `hashed${pwd}`}),
        compare: jest.fn()   
    } 
});
