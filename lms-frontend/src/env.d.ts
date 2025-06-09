import type {CourseProgress, UserData, Course, pageMetadata} from '@/interfaces'


interface ImportMetaEnv {
    readonly PROD: boolean
    readonly HOST_URL: string
    readonly API_URL: string
    readonly JWT_SECRET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare global {
    namespace App {
        interface Locals {
            API_URL: string,
            token: string,
            courses?: Course[];
            coursesMeta: pageMetadata;
            course?: Course;
            userData: UserData
            userProgress: CourseProgress[]
            userCourses?: Course[];
        }
    }
}
