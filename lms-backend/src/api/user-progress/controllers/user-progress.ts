import {factories} from '@strapi/strapi'
import {
    updateProgress,
    getUserProgress
} from './utils/progress'

export default factories.createCoreController('api::user-progress.user-progress', ({strapi}) => ({
    async find(ctx) {
        const user = ctx.state.user
        if (!user) return ctx.unauthorized('Login required.')

        // Get user progress
        const progress = await getUserProgress(strapi, user.id)
        if (!progress) return ctx.notFound('Progress not found.')
        return {data: progress}
    },

    async addCourse(ctx) {
        const user = ctx.state.user
        if (!user) return ctx.unauthorized('Login required.')

        const {documentId} = ctx.request.body
        if (!documentId) return ctx.badRequest('Course ID is required.')

        // Load course by ID
        const course = await strapi.documents('api::course.course').findOne({documentId})
        if (!course) return ctx.notFound('Course not found.')

        // Load user progress
        const progress = await getUserProgress(strapi, user.id)
        if (!progress) return ctx.notFound('User progress not found.')

        const alreadyAdded = progress.courses.some(c => c.course?.id === course.id)
        if (alreadyAdded) return ctx.badRequest('Course already added.')

        // Add course to progress
        progress.courses.push({
            course: {documentId},
            enrolledAt: new Date(),
            progress_status: 'in_progress',
            lessonsProgress: [],
        })

        // Save updated progress
        const updated = await updateProgress(strapi, progress, progress.courses)

        return {message: 'Course added.', data: updated}
    },

    async removeCourse(ctx) {
        const user = ctx.state.user
        if (!user) return ctx.unauthorized('Login required.')

        const {documentId} = ctx.query
        if (!documentId) return ctx.badRequest('Course documentId is required.')

        // Load progress
        const progress = await getUserProgress(strapi, user.id)
        if (!progress) return ctx.notFound('User progress not found.')

        const originalLength = progress.courses.length

        // Remove course from progress
        const filtered = progress.courses.filter(c => c.course?.documentId !== documentId)
        if (filtered.length === originalLength)
            return ctx.badRequest('Course not found in progress.')

        // Save changes
        const updated = await updateProgress(strapi, progress, filtered)

        return {message: 'Course removed.', data: updated}
    },

    async beginLesson(ctx) {
        const user = ctx.state.user
        if (!user) return ctx.unauthorized('Login required.')

        const {documentId} = ctx.request.body
        if (!documentId) return ctx.badRequest('Lesson documentId is required.')

        // Load lesson with course
        const lesson = await strapi.documents('api::lesson.lesson').findOne({
            documentId,
            populate: ['course']
        })

        // Load user progress
        const progress = await getUserProgress(strapi, user.id)
        if (!progress) return ctx.notFound('User progress not found.')

        const course = progress.courses.find(c => c.course?.id === lesson.course.id)
        if (!course) return ctx.badRequest('Course not found in progress.')

        const alreadyAdded = course.lessonsProgress.some(lp => lp.lesson?.id === lesson.id)
        if (alreadyAdded) return ctx.badRequest('Lesson already added.')

        // Add lesson to progress
        course.lessonsProgress.push({
            lesson: {documentId: lesson.documentId},
            startedAt: new Date(),
            progress_status: 'in_progress',
        })

        // Save
        const updated = await updateProgress(strapi, progress, progress.courses)

        return {message: 'Lesson added', data: updated}
    },

    async completeLesson(ctx) {
        const user = ctx.state.user
        if (!user) return ctx.unauthorized('Login required.')

        const {documentId} = ctx.request.body
        if (!documentId) return ctx.badRequest('Lesson documentId is required.')

        // Load lesson with course
        const lesson = await strapi.documents('api::lesson.lesson').findOne({documentId, populate: ['course']})

        // Load progress
        const progress = await getUserProgress(strapi, user.id)
        if (!progress) return ctx.notFound('User progress not found.')

        const courseProgress = progress.courses.find(c => c.course?.id === lesson.course?.id)
        if (!courseProgress) return ctx.badRequest('Course not found in progress.')

        const lessonProgress = courseProgress.lessonsProgress.find(lp => lp.lesson?.id === lesson.id)
        if (!lessonProgress) return ctx.badRequest('Lesson not found in progress.')

        // Update lesson status
        lessonProgress.progress_status = 'completed'
        lessonProgress.completedAt = new Date()

        // Check if entire course is completed
        const course = await strapi.documents('api::course.course').findOne({
            documentId: lesson.course.documentId,
            populate: ['lessons']
        })
        let allCompleted = false
        if (course.lessons.length === courseProgress.lessonsProgress.length) {
            allCompleted = courseProgress.lessonsProgress.every(lp => lp.progress_status === 'completed')
            if (allCompleted) {
                courseProgress.progress_status = 'completed'
                courseProgress.completedAt = new Date()
            }
        }

        // Save updated progress
        const updated = await updateProgress(strapi, progress, progress.courses)

        return {
            message: 'Lesson completed',
            is_course_completed: allCompleted,
            data: updated,
        }
    },
}))
