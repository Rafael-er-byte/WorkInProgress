import InvalidParameters from "../../../../shared/core/errors/InvalidParameters";
import MissingRequiredParameters from "../../../../shared/core/errors/MissingRequiredParameters";
import Category from "../model/Category";

describe('Tests for category model', () => {
    let category: Category;

    it('Should create an instance of category', () => {
        category = new Category(
            'category1',
            '123',
            '456',
            'http://example.com', // icon
            'ValidDate'           // createdAt
        );
        expect(category).toBeInstanceOf(Category);
    });

    it('Should throw if when update the category name dont send a valid name', () => {
        expect(() => category.setName('')).toThrow(MissingRequiredParameters);
        expect(() => category.setName(undefined)).toThrow(MissingRequiredParameters);
    });

    it('Should throw if when update the category icon dont send a valid icon', () => {
        expect(() => category.setIcon('')).toThrow(InvalidParameters);
        expect(() => category.setIcon(undefined)).toThrow(InvalidParameters);
    });

    it('Should throw if idCategory, idCreator or name are undefined', () => {

        expect(() =>
            new Category('category1', '123', '', 'http://example.com', 'ValidDate')
        ).toThrow(MissingRequiredParameters);

        expect(() =>
            new Category('category1', '', undefined, 'http://example.com', 'ValidDate')
        ).toThrow(MissingRequiredParameters);

        expect(() =>
            new Category('category1', '123', '', 'http://example.com', 'ValidDate')
        ).toThrow(MissingRequiredParameters);

        expect(() =>
            new Category('', '123', '245', 'http://example.com', 'ValidDate')
        ).toThrow(MissingRequiredParameters);

        expect(() =>
            new Category(undefined, '123', '', 'http://example.com', 'ValidDate')
        ).toThrow(MissingRequiredParameters);
    });
});
