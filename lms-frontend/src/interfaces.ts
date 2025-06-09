export enum ProgressStatus {
    InProgress = 'in_progress',
    Completed = 'completed',
}

export enum ActionType {
    AddCourse = 'addCourse',
    RemoveCourse = 'removeCourse',
    BeginLesson = 'beginLesson',
    CompleteLesson = 'completeLesson',
}

export enum ActionMethod {
    POST = 'POST',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}


export interface RequestOptions {
    endpoint: 'course' | 'lesson',
    method: ActionMethod,
    token: string,
    documentId: string,
}


export interface LessonProgress {
    id: number,
    progress_status: ProgressStatus,
    startedAt: string,
    completedAt: string,
    lesson: Lesson,
}

export interface CourseProgress {
    id: number,
    enrolledAt: string,
    completedAt: string,
    progress_status: ProgressStatus,
    course: Course,
    lessonsProgress: LessonProgress[]
}

export interface UserData {
    id: number
    email: string
    username: string
}


export interface Media {
    name: string,
    alternativeText: string,
    caption: string,
    ext: string,
    mime: string,
    url: string,
}


export interface PublicLesson {
    documentId: string;
    title: string;
    description: string;
    order: number;
}

export interface Lesson extends PublicLesson {
    id: number;
    publishedAt: string;
    content: string;
    slug: string;
    media: Media[];
    course: Course;
}

export interface Category {
    id: number;
    title: string;
    description: string;
}

export interface Course {
    id: number;
    documentId: string;
    title: string;
    description: string;
    publishedAt: string;
    slug: string;
    image: string | null;
    categories: Category[];
    lessons: Lesson[]
}

export interface pageMetadata {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
}
