import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './timeline.reducer';
import { ITimeline } from 'app/shared/model/timeline.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimelineProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Timeline extends React.Component<ITimelineProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { timelineList, match } = this.props;
    return (
      <div>
        <h2 id="timeline-heading">
          Timelines
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Timeline
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Is Visible</th>
                <th>Schedule</th>
                <th>Student Profile</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {timelineList.map((timeline, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${timeline.id}`} color="link" size="sm">
                      {timeline.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={timeline.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={timeline.isVisible} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{timeline.schedule ? <Link to={`schedule/${timeline.schedule.id}`}>{timeline.schedule.id}</Link> : ''}</td>
                  <td>
                    {timeline.studentProfile ? (
                      <Link to={`student-profile/${timeline.studentProfile.id}`}>{timeline.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${timeline.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeline.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeline.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ timeline }: IRootState) => ({
  timelineList: timeline.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
