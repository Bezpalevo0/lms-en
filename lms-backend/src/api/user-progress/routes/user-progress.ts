export default {
    routes: [
        // Get user progress
        {
            method: 'GET',
            path: '/user-progress',
            handler: 'user-progress.find',
            config: {
                auth: {},
            },
        },
        // Add course to progress
        {
            method: 'POST',
            path: '/user-progress/course',
            handler: 'user-progress.addCourse',
            config: {
                auth: {},
            },
        },
        // Remove course from progress
        {
            method: 'DELETE',
            path: '/user-progress/course',
            handler: 'user-progress.removeCourse',
            config: {
                auth: {},
            },
        },
        // Add lesson to progress
        {
            method: 'POST',
            path: '/user-progress/lesson',
            handler: 'user-progress.beginLesson',
            config: {
                auth: {},
            },
        },
        // Update lesson progress (complete lesson)
        {
            method: 'PATCH',
            path: '/user-progress/lesson',
            handler: 'user-progress.completeLesson',
            config: {
                auth: {},
            },
        },
    ],
}
