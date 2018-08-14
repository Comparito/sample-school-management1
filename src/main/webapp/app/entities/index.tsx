import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Organization from './organization';
import Center from './center';
import Room from './room';
import Schedule from './schedule';
import Event from './event';
import Activity from './activity';
import ActivityType from './activity-type';
import Photo from './photo';
import Video from './video';
import Student from './student';
import StudentProfile from './student-profile';
import Teacher from './teacher';
import Holiday from './holiday';
import Kudos from './kudos';
import KudosRecord from './kudos-record';
import Milestone from './milestone';
import MilestoneRecord from './milestone-record';
import Incident from './incident';
import Gallery from './gallery';
import Payment from './payment';
import ImmunizationRecord from './immunization-record';
import IllnessRecord from './illness-record';
import Attendance from './attendance';
import Parent from './parent';
import Permission from './permission';
import Feature from './feature';
import Notification from './notification';
import Task from './task';
import TaskType from './task-type';
import Conversation from './conversation';
import Timeline from './timeline';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/organization`} component={Organization} />
      <ErrorBoundaryRoute path={`${match.url}/center`} component={Center} />
      <ErrorBoundaryRoute path={`${match.url}/room`} component={Room} />
      <ErrorBoundaryRoute path={`${match.url}/schedule`} component={Schedule} />
      <ErrorBoundaryRoute path={`${match.url}/event`} component={Event} />
      <ErrorBoundaryRoute path={`${match.url}/activity`} component={Activity} />
      <ErrorBoundaryRoute path={`${match.url}/activity-type`} component={ActivityType} />
      <ErrorBoundaryRoute path={`${match.url}/photo`} component={Photo} />
      <ErrorBoundaryRoute path={`${match.url}/video`} component={Video} />
      <ErrorBoundaryRoute path={`${match.url}/student`} component={Student} />
      <ErrorBoundaryRoute path={`${match.url}/student-profile`} component={StudentProfile} />
      <ErrorBoundaryRoute path={`${match.url}/teacher`} component={Teacher} />
      <ErrorBoundaryRoute path={`${match.url}/holiday`} component={Holiday} />
      <ErrorBoundaryRoute path={`${match.url}/kudos`} component={Kudos} />
      <ErrorBoundaryRoute path={`${match.url}/kudos-record`} component={KudosRecord} />
      <ErrorBoundaryRoute path={`${match.url}/milestone`} component={Milestone} />
      <ErrorBoundaryRoute path={`${match.url}/milestone-record`} component={MilestoneRecord} />
      <ErrorBoundaryRoute path={`${match.url}/incident`} component={Incident} />
      <ErrorBoundaryRoute path={`${match.url}/gallery`} component={Gallery} />
      <ErrorBoundaryRoute path={`${match.url}/payment`} component={Payment} />
      <ErrorBoundaryRoute path={`${match.url}/immunization-record`} component={ImmunizationRecord} />
      <ErrorBoundaryRoute path={`${match.url}/illness-record`} component={IllnessRecord} />
      <ErrorBoundaryRoute path={`${match.url}/attendance`} component={Attendance} />
      <ErrorBoundaryRoute path={`${match.url}/parent`} component={Parent} />
      <ErrorBoundaryRoute path={`${match.url}/permission`} component={Permission} />
      <ErrorBoundaryRoute path={`${match.url}/feature`} component={Feature} />
      <ErrorBoundaryRoute path={`${match.url}/notification`} component={Notification} />
      <ErrorBoundaryRoute path={`${match.url}/task`} component={Task} />
      <ErrorBoundaryRoute path={`${match.url}/task-type`} component={TaskType} />
      <ErrorBoundaryRoute path={`${match.url}/conversation`} component={Conversation} />
      <ErrorBoundaryRoute path={`${match.url}/timeline`} component={Timeline} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
