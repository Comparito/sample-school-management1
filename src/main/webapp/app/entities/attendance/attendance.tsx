import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './attendance.reducer';
import { IAttendance } from 'app/shared/model/attendance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAttendanceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Attendance extends React.Component<IAttendanceProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { attendanceList, match } = this.props;
    return (
      <div>
        <h2 id="attendance-heading">
          Attendances
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Attendance
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Attendance Event</th>
                <th>Datetime</th>
                <th>Created On</th>
                <th>Student Profile</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attendance, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${attendance.id}`} color="link" size="sm">
                      {attendance.id}
                    </Button>
                  </td>
                  <td>{attendance.attendanceEvent}</td>
                  <td>
                    <TextFormat type="date" value={attendance.datetime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={attendance.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {attendance.studentProfile ? (
                      <Link to={`student-profile/${attendance.studentProfile.id}`}>{attendance.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${attendance.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attendance.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${attendance.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ attendance }: IRootState) => ({
  attendanceList: attendance.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Attendance);
