import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActivityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Activity extends React.Component<IActivityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { activityList, match } = this.props;
    return (
      <div>
        <h2 id="activity-heading">
          Activities
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Activity
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Activity Image Url</th>
                <th>Activity Date</th>
                <th>Created On</th>
                <th>Last Modified On</th>
                <th>Schedule</th>
                <th>Activity Type</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {activityList.map((activity, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${activity.id}`} color="link" size="sm">
                      {activity.id}
                    </Button>
                  </td>
                  <td>{activity.title}</td>
                  <td>{activity.description}</td>
                  <td>{activity.activityImageUrl}</td>
                  <td>
                    <TextFormat type="date" value={activity.activityDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={activity.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={activity.lastModifiedOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{activity.schedule ? <Link to={`schedule/${activity.schedule.id}`}>{activity.schedule.id}</Link> : ''}</td>
                  <td>
                    {activity.activityType ? <Link to={`activity-type/${activity.activityType.id}`}>{activity.activityType.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${activity.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${activity.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${activity.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ activity }: IRootState) => ({
  activityList: activity.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
