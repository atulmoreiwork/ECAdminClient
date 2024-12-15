export interface ICategory 
{
    categoryId: number;
    categoryName: string;
    urlSlug:string;
    description: string;
    parentCategoryId: string;    
    status:string;
    row: string;
    totalRowCount: string;
    flag: number;
}

export interface IParentCategory
{
    categoryId: number;
    categoryName: string;
}
