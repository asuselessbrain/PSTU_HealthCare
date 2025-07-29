const pagination = (options: {page?: number, limit?: number, sortBy: string, sortOrder: string}) => {
    const limit = Number(options.limit) || 10
    const page = Number(options.page) || 1
    const skip = (Number(page) - 1) * limit;
    const take = limit;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc"

    return {
        page,
        skip,
        take,
        sortBy,
        sortOrder
    }
}

export default pagination