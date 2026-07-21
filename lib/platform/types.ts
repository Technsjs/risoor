export type UserRole = "student" | "instructor";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string;
};

export type EnrollmentStatus = "enrolled" | "in_progress" | "completed";

export type Course = {
  id: string;
  title: string;
  description: string;
  topicIds: string[];
  estimatedMonths: number;
  instructorId: string;
  createdAt: string;
};

export type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  startedAt: string | null;
  completedAt: string | null;
  timeSpentMs: number;
};

export type AssignmentType = "ui-design" | "coding";

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  instructions: string;
  type: AssignmentType;
  createdAt: string;
};

export type AssignmentScreen = {
  id: string;
  title: string;
  description: string;
};

export type AssignmentVariant = {
  id: string;
  assignmentId: string;
  label: string;
  screens: AssignmentScreen[];
};

export type AssignmentRuleMode = "all" | "specific" | "split";

export type AssignmentSplit = {
  variantId: string;
  percent: number;
};

export type AssignmentRule = {
  mode: AssignmentRuleMode;
  studentIds?: string[];
  splits?: AssignmentSplit[];
  defaultVariantId?: string;
};

export type AssignmentAllocationStatus =
  | "assigned"
  | "in_progress"
  | "submitted";

export type AssignmentAllocation = {
  id: string;
  assignmentId: string;
  userId: string;
  variantId: string;
  status: AssignmentAllocationStatus;
  assignedAt: string;
  startedAt: string | null;
  submittedAt: string | null;
  timeSpentMs: number;
  completedScreenIds: string[];
  notes: string;
};

export type ProjectPlatform = "web" | "mobile" | "security";

export type ProjectTemplate = {
  id: string;
  name: string;
  platform: ProjectPlatform;
  category: string;
  description: string;
  milestones: string[];
};

export type StudentProjectKind = "learning" | "capstone";

export type StudentProjectStatus = "active" | "completed";

export type StudentProject = {
  id: string;
  userId: string;
  courseId: string;
  templateId: string;
  kind: StudentProjectKind;
  status: StudentProjectStatus;
  milestonesCompleted: string[];
  selectedAt: string;
};

export type PlatformStore = {
  users: User[];
  courses: Course[];
  enrollments: Enrollment[];
  assignments: Assignment[];
  assignmentVariants: AssignmentVariant[];
  assignmentAllocations: AssignmentAllocation[];
  studentProjects: StudentProject[];
};
