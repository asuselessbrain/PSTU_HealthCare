export const filtering = <T extends Record<string, any>>(searchItems: any[], filterData: T) => {
    return searchItems.push({
        AND: Object.keys(filterData).map((item: string) => ({ [item]: { equals: filterData[item] } }))
    })
}