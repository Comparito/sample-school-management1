import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ImmunizationRecord from './immunization-record';
import ImmunizationRecordDetail from './immunization-record-detail';
import ImmunizationRecordUpdate from './immunization-record-update';
import ImmunizationRecordDeleteDialog from './immunization-record-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImmunizationRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImmunizationRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImmunizationRecordDetail} />
      <ErrorBoundaryRoute path={match.url} component={ImmunizationRecord} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ImmunizationRecordDeleteDialog} />
  </>
);

export default Routes;
