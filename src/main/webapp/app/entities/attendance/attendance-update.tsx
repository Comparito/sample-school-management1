import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { getEntities as getStudentProfiles } from 'app/entities/student-profile/student-profile.reducer';
import { getEntity, updateEntity, createEntity, reset } from './attendance.reducer';
import { IAttendance } from 'app/shared/model/attendance.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAttendanceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IAttendanceUpdateState {
  isNew: boolean;
  studentProfileId: number;
}

export class AttendanceUpdate extends React.Component<IAttendanceUpdateProps, IAttendanceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentProfileId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getStudentProfiles();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { attendanceEntity } = this.props;
      const entity = {
        ...attendanceEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/attendance');
  };

  render() {
    const { attendanceEntity, studentProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.attendance.home.createOrEditLabel">Create or edit a Attendance</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : attendanceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="attendance-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="attendanceEventLabel">Attendance Event</Label>
                  <AvInput
                    id="attendance-attendanceEvent"
                    type="select"
                    className="form-control"
                    name="attendanceEvent"
                    value={(!isNew && attendanceEntity.attendanceEvent) || 'CHECKIN'}
                  >
                    <option value="CHECKIN">CHECKIN</option>
                    <option value="CHECKOUT">CHECKOUT</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="datetimeLabel" for="datetime">
                    Datetime
                  </Label>
                  <AvField id="attendance-datetime" type="date" className="form-control" name="datetime" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="attendance-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">Student Profile</Label>
                  <AvInput id="attendance-studentProfile" type="select" className="form-control" name="studentProfile.id">
                    <option value="" key="0" />
                    {studentProfiles
                      ? studentProfiles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/attendance" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  studentProfiles: storeState.studentProfile.entities,
  attendanceEntity: storeState.attendance.entity,
  loading: storeState.attendance.loading,
  updating: storeState.attendance.updating
});

const mapDispatchToProps = {
  getStudentProfiles,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceUpdate);
