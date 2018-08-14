import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MilestoneRecord from './milestone-record';
import MilestoneRecordDetail from './milestone-record-detail';
import MilestoneRecordUpdate from './milestone-record-update';
import MilestoneRecordDeleteDialog from './milestone-record-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MilestoneRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MilestoneRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MilestoneRecordDetail} />
      <ErrorBoundaryRoute path={match.url} component={MilestoneRecord} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MilestoneRecordDeleteDialog} />
  </>
);

export default Routes;
