import type {Request, Response, NextFunction} from 'express'
import type DeleteCategoryById from "../../application/services/DeleteCategory";
import type GetAllCategories from "../../application/services/GetAllCategories";
import type GetCategoryById from "../../application/services/GetCategoryById";
import type SaveCategory from "../../application/services/SaveCategory";
import CategoryDto from '../../application/dtos/CategryDto';
import CategoryFilterDto from '../../application/dtos/CategoryFilterDto';
import Category from '../../model/types/Category';
import ResponseCategoryDto from '../../application/dtos/ResponseCategoryDto';

export default class CategoryController{
    constructor(
        private readonly saveCategory:SaveCategory, 
        private readonly deleteCategory:DeleteCategoryById, 
        private readonly getCategoryById:GetCategoryById, 
        private readonly getAllCategories:GetAllCategories){}

    async save(req:Request, res:Response, next: NextFunction): Promise<Response | undefined>{
        try{
            const body = req.body;
            const dto:CategoryDto = new CategoryDto();
            dto.idCategory = body.idCategory;
            dto.idCreator = body.idCreator;
            dto.name = body.name;

            await this.saveCategory.execute(dto);
            return res.status(201).json({message:'Category created successfuly'});
        }catch(error){
            next(error);
        }
    }

    async delete(req:Request, res:Response, next:NextFunction): Promise<Response | undefined>{
        try{
            const id = req.params.idCategory as string;
            const idCreator = req.params.idCreator as string;
            await this.deleteCategory.execute(id, idCreator);
            return res.status(204);
        }catch(error){
            next(error);
        }
    }

    async getByID(req:Request, res:Response, next:NextFunction): Promise<Response | undefined>{
        try{
            const id = req.params.idCategory as string;
            const idCreator = req.params.idCreator as string;
            const category:Category | undefined = await this.getCategoryById.execute(id, idCreator);

            if(!category)return res.status(404).json({messsage:"Not found"});
            const response:ResponseCategoryDto = new ResponseCategoryDto(category.getName(), category.getIdCreator(), category.getIdCategory());
            return res.status(200).json({category: response});
        }catch(error){
            next(error);
        }
    }

    async getAll(req:Request, res:Response, next:NextFunction): Promise<Response | undefined>{
        try {
            const body = req.body;
            const dto:CategoryDto = new CategoryDto();
            dto.idCategory = body.idCategory;
            dto.idCreator = body.idCreator;
            dto.name = body.name;

            const filterDto:CategoryFilterDto = new CategoryFilterDto();
            filterDto.limit = body.limit;
            filterDto.page = body.page;
            filterDto.titleLike = body.titleLike;
            if(body.sortingType)filterDto.setSortingType(body.sortingType);

            const categories:Category[] = await this.getAllCategories.execute(dto, filterDto);
            const response:ResponseCategoryDto[] = [];

            categories.forEach((category) => {
                response.push(new ResponseCategoryDto(category.getName(), category.getIdCreator(), category.getIdCategory()));
            });

            return res.status(200).json({categories:response});
        } catch (error) {
            next(error);
        }
    }
};