import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Milestone from './milestone';
import MilestoneDetail from './milestone-detail';
import MilestoneUpdate from './milestone-update';
import MilestoneDeleteDialog from './milestone-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MilestoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MilestoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MilestoneDetail} />
      <ErrorBoundaryRoute path={match.url} component={Milestone} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MilestoneDeleteDialog} />
  </>
);

export default Routes;
