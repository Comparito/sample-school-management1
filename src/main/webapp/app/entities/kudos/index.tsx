import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Kudos from './kudos';
import KudosDetail from './kudos-detail';
import KudosUpdate from './kudos-update';
import KudosDeleteDialog from './kudos-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KudosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KudosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KudosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Kudos} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={KudosDeleteDialog} />
  </>
);

export default Routes;
