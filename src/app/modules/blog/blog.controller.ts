import catchAsync from "../../utils/catchAsynce";
import { blogServices } from "./blog.services";

const createBlog = catchAsync(async (req, res) => {
    const blogContent = req.body
    const result = await blogServices.createBlogIntoDB(blogContent)
    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        date: result
    })
})

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await blogServices.getAllBlogsFromDB()
    res.status(201).json({
        success: true,
        message: "Blogs fetched successfully",
        date: result
    })
})
const getASingleBlogs = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await blogServices.getASingleBlogFromDB(id)
    res.status(201).json({
        success: true,
        message: "Blog fetched successfully",
        date: result
    })
})

const updateABlog = catchAsync(async (req, res) => {
    const { id } = req.params
    const payload = req.body
    const result = await blogServices.updateABlogFromDB(id, payload)
    res.status(201).json({
        success: true,
        message: "Blog updated successfully",
        date: result
    })
})

const deleteASingleBlog = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await blogServices.deleteABlog(id)
    res.status(201).json({
        success: true,
        message: "Blog deleted successfully",
        statusCode: 200
    })
})

export const blogcontroller = {
    createBlog,
    getAllBlogs,
    getASingleBlogs,
    updateABlog,
    deleteASingleBlog
}