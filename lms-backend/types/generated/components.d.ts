import type { Schema, Struct } from '@strapi/strapi';

export interface CourseEnrolledCourses extends Struct.ComponentSchema {
  collectionName: 'components_course_enrolled_courses';
  info: {
    description: '';
    displayName: 'enrolledCourse';
    icon: 'book';
  };
  attributes: {
    completedAt: Schema.Attribute.DateTime;
    course: Schema.Attribute.Relation<'oneToOne', 'api::course.course'>;
    enrolledAt: Schema.Attribute.DateTime & Schema.Attribute.Required;
    lessonsProgress: Schema.Attribute.Component<'course.lesson-progress', true>;
    progress_status: Schema.Attribute.Enumeration<
      ['in_progress', 'completed']
    > &
      Schema.Attribute.DefaultTo<'in_progress'>;
  };
}

export interface CourseLessonProgress extends Struct.ComponentSchema {
  collectionName: 'components_course_lesson_progresses';
  info: {
    description: '';
    displayName: 'lessonProgress';
    icon: 'file';
  };
  attributes: {
    completedAt: Schema.Attribute.DateTime;
    lesson: Schema.Attribute.Relation<'oneToOne', 'api::lesson.lesson'>;
    progress_status: Schema.Attribute.Enumeration<
      ['in_progress', 'completed']
    > &
      Schema.Attribute.DefaultTo<'in_progress'>;
    startedAt: Schema.Attribute.DateTime & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'course.enrolled-courses': CourseEnrolledCourses;
      'course.lesson-progress': CourseLessonProgress;
    }
  }
}
