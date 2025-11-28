import MissingRequiredParameters from "../../../../shared/errors/MissingRequiredParameters";
import Category from "../model/Category";

describe('Tests for category model', ()=>{
    let category: Category;

    it('Should create an instance of category', () => {
        category = new Category('category1', '123', '456', 'ValidDate', 'http://example.com');
        expect(category).toBeInstanceOf(Category);
    });

    it('Should throw if when update the category name dont send a valid name', () => {
        expect(() => category.setName('').toThrow(MissingRequiredParameters));
        expect(() => category.setName(undefined).toThrow(MissingRequiredParameters));
    });

    it('Should throw if when update the category name dont send a valid name', () => {
        expect(() => category.setIcon('').toThrow(MissingRequiredParameters));
        expect(() => category.setIcon(undefined).toThrow(MissingRequiredParameters));
    });

    it('Should throw if idCategoy, idCreator or name are undefinded', () => {

        expect(() => new Category('category1', '123', '', 'ValidDate', 'http://example.com')).toThrow(MissingRequiredParameters);
        expect(() => new Category('category1', '', undefined , 'ValidDate', 'http://example.com')).toThrow(MissingRequiredParameters);
        expect(() => new Category('category1', '123', '', 'ValidDate', 'http://example.com')).toThrow(MissingRequiredParameters);
        expect(() => new Category('', '123', '245', 'ValidDate', 'http://example.com')).toThrow(MissingRequiredParameters);
        expect(() => new Category(undefined, '123', '', 'ValidDate', 'http://example.com')).toThrow(MissingRequiredParameters);
    });
    
});
