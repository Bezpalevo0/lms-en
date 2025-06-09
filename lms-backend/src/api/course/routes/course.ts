export default {
    routes: [
        // Handler to get all courses
        {
            method: 'GET',
            path: '/courses',
            handler: 'course.find',
            config: {
                policies: [],
            },
        },
        // Handler to get a single course
        {
            method: 'GET',
            path: '/courses/:documentId',
            handler: 'course.findOne',
            config: {
                policies: [],
            },
        },
        // Handler to get a course by its slug
        {
            method: 'GET',
            path: '/courses/find/by-slug',
            handler: 'course.findBySlug',
            config: {
                policies: [],
            },
        },
    ],
}
