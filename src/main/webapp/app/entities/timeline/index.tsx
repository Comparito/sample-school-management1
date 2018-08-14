import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Timeline from './timeline';
import TimelineDetail from './timeline-detail';
import TimelineUpdate from './timeline-update';
import TimelineDeleteDialog from './timeline-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TimelineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TimelineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TimelineDetail} />
      <ErrorBoundaryRoute path={match.url} component={Timeline} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TimelineDeleteDialog} />
  </>
);

export default Routes;
