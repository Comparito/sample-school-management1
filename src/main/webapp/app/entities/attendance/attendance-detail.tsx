import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './attendance.reducer';
import { IAttendance } from 'app/shared/model/attendance.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAttendanceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class AttendanceDetail extends React.Component<IAttendanceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { attendanceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Attendance [<b>{attendanceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="attendanceEvent">Attendance Event</span>
            </dt>
            <dd>{attendanceEntity.attendanceEvent}</dd>
            <dt>
              <span id="datetime">Datetime</span>
            </dt>
            <dd>
              <TextFormat value={attendanceEntity.datetime} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={attendanceEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Student Profile</dt>
            <dd>{attendanceEntity.studentProfile ? attendanceEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/attendance" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/attendance/${attendanceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ attendance }: IRootState) => ({
  attendanceEntity: attendance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceDetail);
