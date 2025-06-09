import {
    type Course,
    type UserData,
    type CourseProgress,
    type pageMetadata,
    ActionMethod,
} from '@/interfaces'
import {StrapiClient} from './strapiClient.ts'
import {userProgressRequest} from './userProgress.ts'

// Fetching current user data
export async function getCurrentUser(token: string): Promise<UserData> {
    return await new StrapiClient({token}).request('users/me')
}

// Fetching the list of all courses
export async function getCourses(page = 1, pageSize = 12): Promise<{ data: Course[], meta: pageMetadata } | null> {
    return (await new StrapiClient({}).request<{ data: Course[], meta: pageMetadata } | null>(
        `courses?page=${page}&pageSize=${pageSize}`,
    ))
}

// Fetching a specific course by documentId
export async function getCourse(documentId: string): Promise<Course | null> {
    return (await new StrapiClient({}).request<Course | null>(`courses/${documentId}`))
}

// Fetching a specific course by slug
export async function getCourseBySlug(slug: string): Promise<Course | null> {
    return (await new StrapiClient({}).request<Course | null>(`courses/find/by-slug?slug=${slug}`))
}

// Fetching user progress
export async function getUserProgress(token: string): Promise<CourseProgress[]> {
    try {
        const {data} = await new StrapiClient({token}).request(
            'user-progress', {method: 'GET'}
        ) as { data: { courses: CourseProgress[] } }
        return data.courses
    } catch (error) {
        console.log(error)
        return []
    }
}

// Adding course to progress
export const addCourse = (documentId: string, token: string) =>
    userProgressRequest({endpoint: 'course', method: ActionMethod.POST, token, documentId})

// Removing course from progress
export const removeCourse = (documentId: string, token: string) =>
    userProgressRequest({endpoint: 'course', method: ActionMethod.DELETE, token, documentId})

// Starting the lesson
export const beginLesson = (documentId: string, token: string) =>
    userProgressRequest({endpoint: 'lesson', method: ActionMethod.POST, token, documentId})

// Completing the lesson
export const completeLesson = (documentId: string, token: string) =>
    userProgressRequest({endpoint: 'lesson', method: ActionMethod.PATCH, token, documentId})
