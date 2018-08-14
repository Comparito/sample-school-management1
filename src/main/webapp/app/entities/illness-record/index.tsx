import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IllnessRecord from './illness-record';
import IllnessRecordDetail from './illness-record-detail';
import IllnessRecordUpdate from './illness-record-update';
import IllnessRecordDeleteDialog from './illness-record-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IllnessRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IllnessRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IllnessRecordDetail} />
      <ErrorBoundaryRoute path={match.url} component={IllnessRecord} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={IllnessRecordDeleteDialog} />
  </>
);

export default Routes;
