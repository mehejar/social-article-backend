import QueryBuilder from "../../builder/QueryBuilder";
import { TBlog, TUpdateBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

const createBlogIntoDB = async (payload: TBlog) => {
    const result = await BlogModel.create(payload)
    return result
}

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {

    const BlogSearchableFields = [
        'email',
        'id',
        'contactNo',
        'emergencyContactNo',
        'name.firstName',
        'name.lastName',
        'name.middleName',
    ];
    const blogsQuery = new QueryBuilder(
        BlogModel.find().populate('academicDepartment'),
        query,
    )
        .search(BlogSearchableFields)
        .filter()
        .sort()
        .paginate()

    const result = await blogsQuery.modelQuery;
    return result;
}

const getASingleBlogFromDB = async (id: string) => {
    const result = await BlogModel.findById(id)
    return result
}

const updateABlogFromDB = async (id: string, payload: Partial<TUpdateBlog>) => {
    // check the id which is gonna update 
    const isBlogExist = await BlogModel.findById(id)
    if (!isBlogExist) {
        throw new Error('The Blog is Not Exist')
    }
    const result = await BlogModel.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    })
    return result
}

const deleteABlog = async (id: string) => {
    const result = await BlogModel.findByIdAndDelete(id
    )
    return result
}


export const blogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getASingleBlogFromDB,
    updateABlogFromDB,
    deleteABlog
}