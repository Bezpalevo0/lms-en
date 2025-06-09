const {createCoreController} = require('@strapi/strapi').factories

// Fields we take from lessons
const lessonFields = ['documentId', 'slug', 'title', 'description', 'order']

// Transform lesson objects to return only necessary fields
const mapLessons = (entity) =>
    entity.lessons?.map(({documentId, slug, title, description, order}) => ({
        documentId, slug, title, description, order,
    })) || []

// Ensure page and pageSize are valid; calculate offset
const sanitizePage = (page, pageSize, total) => {
    page = isNaN(page) || page < 1 ? 1 : page
    pageSize = isNaN(pageSize) || pageSize < 1 ? 10 : pageSize
    const maxPage = Math.max(1, Math.ceil(total / pageSize))
    page = Math.min(page, maxPage)
    return {page, pageSize, offset: (page - 1) * pageSize}
}

export default createCoreController('api::course.course', ({strapi}) => ({
    // Get the list of courses with pagination
    async find(ctx) {
        let {page = 1, pageSize = 10} = ctx.query
        page = parseInt(page)
        pageSize = parseInt(pageSize)

        const total = await strapi.documents('api::course.course').count({
            status: 'published',
            locale: null,
        })

        if (total === 0) {
            return {data: [], meta: {page: 1, pageSize, total: 0, pageCount: 0}}
        }

        const {offset} = sanitizePage(page, pageSize, total)

        const entities = await strapi.documents('api::course.course').findMany({
            populate: {lessons: {fields: lessonFields}},
            status: 'published',
            offset,
            limit: pageSize,
            sort: {publishedAt: 'desc'},
        })

        const sanitizedData = entities.map((entity) => ({
            ...entity,
            lessons: mapLessons(entity),
        }))

        return {
            data: sanitizedData,
            meta: {
                page,
                pageSize,
                total,
                pageCount: Math.ceil(total / pageSize),
            },
        }
    },

    // Get a single course by documentId
    async findOne(ctx) {
        const {documentId} = ctx.params

        const entity = await strapi.documents('api::course.course').findOne({
            documentId,
            populate: {lessons: {fields: lessonFields}},
        })

        if (!entity) return ctx.notFound('Course not found')

        return {...entity, lessons: mapLessons(entity)}
    },

    // Get a single course by slug
    async findBySlug(ctx) {
        const {slug} = ctx.query

        const entity = await strapi.documents('api::course.course').findFirst({
            populate: {lessons: {fields: lessonFields}},
            filters: {slug: {$eq: slug}},
        })

        if (!entity) return ctx.notFound('Course not found')

        return {...entity, lessons: mapLessons(entity)}
    },
}))
