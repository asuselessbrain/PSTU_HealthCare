const pagination = (options: {page?: number, limit?: number}) => {
    const limit = Number(options.limit) | 1
    const page = Number(options.page) | 1
    const skip = (Number(page) - 1) * limit;
    const take = limit

    return {
        skip,
        take
    }
}

export default pagination