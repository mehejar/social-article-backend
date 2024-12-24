import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query
    }

    search(searchableFields: string[]) {
        const search = this?.query?.search
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                }) as FilterQuery<T>),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFields = ['search', 'sort', 'sortOrder', 'author'];
        excludeFields.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj);

        return this;
    }

    sort() {
        const sort = this?.query?.sort || '-createdAt'
        this.modelQuery = this.modelQuery.sort(sort as string)
        return this
    }

    paginate() {
        const page = Number(this.query) || 1
        const limit = Number(this.query) || 10
        const skip = (page - 1) * limit

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)

        return this

    }


}

export default QueryBuilder