import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import organization, {
  OrganizationState
} from 'app/entities/organization/organization.reducer';
// prettier-ignore
import center, {
  CenterState
} from 'app/entities/center/center.reducer';
// prettier-ignore
import room, {
  RoomState
} from 'app/entities/room/room.reducer';
// prettier-ignore
import schedule, {
  ScheduleState
} from 'app/entities/schedule/schedule.reducer';
// prettier-ignore
import event, {
  EventState
} from 'app/entities/event/event.reducer';
// prettier-ignore
import activity, {
  ActivityState
} from 'app/entities/activity/activity.reducer';
// prettier-ignore
import activityType, {
  ActivityTypeState
} from 'app/entities/activity-type/activity-type.reducer';
// prettier-ignore
import photo, {
  PhotoState
} from 'app/entities/photo/photo.reducer';
// prettier-ignore
import video, {
  VideoState
} from 'app/entities/video/video.reducer';
// prettier-ignore
import student, {
  StudentState
} from 'app/entities/student/student.reducer';
// prettier-ignore
import studentProfile, {
  StudentProfileState
} from 'app/entities/student-profile/student-profile.reducer';
// prettier-ignore
import teacher, {
  TeacherState
} from 'app/entities/teacher/teacher.reducer';
// prettier-ignore
import holiday, {
  HolidayState
} from 'app/entities/holiday/holiday.reducer';
// prettier-ignore
import kudos, {
  KudosState
} from 'app/entities/kudos/kudos.reducer';
// prettier-ignore
import kudosRecord, {
  KudosRecordState
} from 'app/entities/kudos-record/kudos-record.reducer';
// prettier-ignore
import milestone, {
  MilestoneState
} from 'app/entities/milestone/milestone.reducer';
// prettier-ignore
import milestoneRecord, {
  MilestoneRecordState
} from 'app/entities/milestone-record/milestone-record.reducer';
// prettier-ignore
import incident, {
  IncidentState
} from 'app/entities/incident/incident.reducer';
// prettier-ignore
import gallery, {
  GalleryState
} from 'app/entities/gallery/gallery.reducer';
// prettier-ignore
import payment, {
  PaymentState
} from 'app/entities/payment/payment.reducer';
// prettier-ignore
import immunizationRecord, {
  ImmunizationRecordState
} from 'app/entities/immunization-record/immunization-record.reducer';
// prettier-ignore
import illnessRecord, {
  IllnessRecordState
} from 'app/entities/illness-record/illness-record.reducer';
// prettier-ignore
import attendance, {
  AttendanceState
} from 'app/entities/attendance/attendance.reducer';
// prettier-ignore
import parent, {
  ParentState
} from 'app/entities/parent/parent.reducer';
// prettier-ignore
import permission, {
  PermissionState
} from 'app/entities/permission/permission.reducer';
// prettier-ignore
import feature, {
  FeatureState
} from 'app/entities/feature/feature.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
// prettier-ignore
import taskType, {
  TaskTypeState
} from 'app/entities/task-type/task-type.reducer';
// prettier-ignore
import conversation, {
  ConversationState
} from 'app/entities/conversation/conversation.reducer';
// prettier-ignore
import timeline, {
  TimelineState
} from 'app/entities/timeline/timeline.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly organization: OrganizationState;
  readonly center: CenterState;
  readonly room: RoomState;
  readonly schedule: ScheduleState;
  readonly event: EventState;
  readonly activity: ActivityState;
  readonly activityType: ActivityTypeState;
  readonly photo: PhotoState;
  readonly video: VideoState;
  readonly student: StudentState;
  readonly studentProfile: StudentProfileState;
  readonly teacher: TeacherState;
  readonly holiday: HolidayState;
  readonly kudos: KudosState;
  readonly kudosRecord: KudosRecordState;
  readonly milestone: MilestoneState;
  readonly milestoneRecord: MilestoneRecordState;
  readonly incident: IncidentState;
  readonly gallery: GalleryState;
  readonly payment: PaymentState;
  readonly immunizationRecord: ImmunizationRecordState;
  readonly illnessRecord: IllnessRecordState;
  readonly attendance: AttendanceState;
  readonly parent: ParentState;
  readonly permission: PermissionState;
  readonly feature: FeatureState;
  readonly notification: NotificationState;
  readonly task: TaskState;
  readonly taskType: TaskTypeState;
  readonly conversation: ConversationState;
  readonly timeline: TimelineState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  organization,
  center,
  room,
  schedule,
  event,
  activity,
  activityType,
  photo,
  video,
  student,
  studentProfile,
  teacher,
  holiday,
  kudos,
  kudosRecord,
  milestone,
  milestoneRecord,
  incident,
  gallery,
  payment,
  immunizationRecord,
  illnessRecord,
  attendance,
  parent,
  permission,
  feature,
  notification,
  task,
  taskType,
  conversation,
  timeline,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
