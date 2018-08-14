import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import KudosRecord from './kudos-record';
import KudosRecordDetail from './kudos-record-detail';
import KudosRecordUpdate from './kudos-record-update';
import KudosRecordDeleteDialog from './kudos-record-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KudosRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KudosRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KudosRecordDetail} />
      <ErrorBoundaryRoute path={match.url} component={KudosRecord} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={KudosRecordDeleteDialog} />
  </>
);

export default Routes;
