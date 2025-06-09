// Linking lesson object with progress
export function toLessonProgress(lessonProgress) {
    return {
        lesson: {connect: [lessonProgress.lesson.documentId]},
        progress_status: lessonProgress.progress_status,
        startedAt: lessonProgress.startedAt,
        completedAt: lessonProgress.completedAt
    }
}

// Linking course object with progress
export function toCourseComponent(courseProgress) {
    return {
        course: {connect: [courseProgress.course.documentId]},
        enrolledAt: courseProgress.enrolledAt,
        completedAt: courseProgress.completedAt,
        progress_status: courseProgress.progress_status,
        lessonsProgress: courseProgress.lessonsProgress.map(toLessonProgress)
    }
}

// Fetching user progress
export async function getUserProgress(strapi, userId) {
    const [progress] = await strapi.documents('api::user-progress.user-progress').findMany({
        filters: {user: userId},
        populate: ['courses.course.lessons', 'courses.lessonsProgress.lesson.media'],
        limit: 1,
    })
    return progress
}

// Updating user progress
export async function updateProgress(strapi, progress, courses) {
    return strapi.documents('api::user-progress.user-progress').update({
        documentId: progress.documentId,
        data: {
            courses: courses.map(toCourseComponent),
        },
    })
}
