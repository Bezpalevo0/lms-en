import {sequence} from 'astro:middleware'
import type {CourseProgress} from '@/interfaces.ts'
import {addForwardSlash} from '@/lib/utils'
import {getValidatedToken} from '@/lib/auth'
import {getUserProgress, getCurrentUser, getCourses, getCourseBySlug} from '@/lib/api'


// Basic handler: token retrieval and validation, other data
async function baseMiddleware(context, next) {

    const page = context.url.searchParams.get('p')
    const courses = await getCourses(page || 1)
    context.locals.courses = courses?.data
    context.locals.coursesMeta = courses?.meta


    const token = getValidatedToken(context.cookies)
    context.locals.token = token
    if (token) {
        // TODO: redirect to auth is UserData null
        context.locals.userData = await getCurrentUser(token)
        context.locals.userProgress = await getUserProgress(token)
        context.locals.userCourses = context.locals.userProgress.map((p: CourseProgress) => p.course)
    }

    return next()
}

// Redirect from the authentication page if the user is logged in
async function authPageMiddleware(context, next) {
    if (context.url.pathname === '/auth' && context.locals.token) {
        return context.redirect('/u')
    }
    return next()
}

// Protection of /u/* dashboard pages
async function userProtectionMiddleware(context, next) {
    const path = addForwardSlash(context.url.pathname)

    if (path.startsWith('/u/') && !context.locals.token) {
        return context.rewrite(
            new Request(new URL('/auth', context.url), {
                headers: {'x-redirect-to': context.url.pathname}
            })
        )
    }

    return next()
}

// Load course by slug from the path of pages /u/courses/<slug> and /courses/<slug>
async function courseDetailMiddleware(context, next) {
    const match = context.url.pathname.match(/^\/(u\/)?courses\/([^/]+)$/)
    if (match && context.locals.courses) {
        const courseSlug = match[2]
        const course = await getCourseBySlug(courseSlug)

        if (!course) {
            return context.rewrite("/404?message=course+not+found")

        }

        context.locals.course = course
    }

    return next()
}

// Connecting all handlers to Astro
export const onRequest = sequence(
    baseMiddleware,
    authPageMiddleware,
    userProtectionMiddleware,
    courseDetailMiddleware
)
