import type {
  Assignment,
  AssignmentAllocation,
  AssignmentRule,
  AssignmentVariant,
  Course,
  Enrollment,
  PlatformStore,
  StudentProject,
  User,
} from "../types";

export type PlatformRepository = {
  getStore(): PlatformStore;
  resetStore(): void;

  getUsers(): User[];
  getUserById(id: string): User | undefined;
  getUserByEmail(email: string): User | undefined;
  getStudents(): User[];

  getCourses(): Course[];
  getCourseById(id: string): Course | undefined;
  getCoursesByInstructor(instructorId: string): Course[];
  createCourse(
    data: Omit<Course, "id" | "createdAt">
  ): Course;
  updateCourse(id: string, data: Partial<Omit<Course, "id">>): Course | undefined;

  getEnrollments(): Enrollment[];
  getEnrollmentsByCourse(courseId: string): Enrollment[];
  getEnrollmentsByUser(userId: string): Enrollment[];
  enrollStudents(courseId: string, userIds: string[]): Enrollment[];
  unenrollStudent(courseId: string, userId: string): void;
  updateEnrollment(
    id: string,
    data: Partial<Omit<Enrollment, "id">>
  ): Enrollment | undefined;
  recordEnrollmentTime(enrollmentId: string, deltaMs: number): void;
  markEnrollmentStarted(enrollmentId: string): void;

  getAssignments(): Assignment[];
  getAssignmentsByCourse(courseId: string): Assignment[];
  getAssignmentById(id: string): Assignment | undefined;
  createAssignmentWithVariants(
    assignment: Omit<Assignment, "id" | "createdAt">,
    variants: Omit<AssignmentVariant, "id" | "assignmentId">[],
    rule: AssignmentRule
  ): {
    assignment: Assignment;
    variants: AssignmentVariant[];
    allocations: AssignmentAllocation[];
  };

  getVariantsByAssignment(assignmentId: string): AssignmentVariant[];
  getVariantById(id: string): AssignmentVariant | undefined;

  getAllocations(): AssignmentAllocation[];
  getAllocationsByAssignment(assignmentId: string): AssignmentAllocation[];
  getAllocationForUser(
    assignmentId: string,
    userId: string
  ): AssignmentAllocation | undefined;
  updateAllocation(
    id: string,
    data: Partial<Omit<AssignmentAllocation, "id">>
  ): AssignmentAllocation | undefined;
  recordAllocationTime(allocationId: string, deltaMs: number): void;

  getStudentProjects(): StudentProject[];
  getStudentProjectsByUser(userId: string, courseId?: string): StudentProject[];
  selectProject(
    data: Omit<StudentProject, "id" | "selectedAt" | "status" | "milestonesCompleted">
  ): StudentProject;
  updateStudentProject(
    id: string,
    data: Partial<Omit<StudentProject, "id">>
  ): StudentProject | undefined;
};
