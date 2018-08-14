import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICenter } from 'app/shared/model/center.model';
import { getEntities as getCenters } from 'app/entities/center/center.reducer';
import { IRoom } from 'app/shared/model/room.model';
import { getEntities as getRooms } from 'app/entities/room/room.reducer';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { getEntities as getStudentProfiles } from 'app/entities/student-profile/student-profile.reducer';
import { IIncident } from 'app/shared/model/incident.model';
import { getEntities as getIncidents } from 'app/entities/incident/incident.reducer';
import { getEntity, updateEntity, createEntity, reset } from './student.reducer';
import { IStudent } from 'app/shared/model/student.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStudentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IStudentUpdateState {
  isNew: boolean;
  centerId: number;
  roomId: number;
  idId: number;
  incidentId: number;
}

export class StudentUpdate extends React.Component<IStudentUpdateProps, IStudentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      centerId: 0,
      roomId: 0,
      idId: 0,
      incidentId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCenters();
    this.props.getRooms();
    this.props.getStudentProfiles();
    this.props.getIncidents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { studentEntity } = this.props;
      const entity = {
        ...studentEntity,
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
    this.props.history.push('/entity/student');
  };

  render() {
    const { studentEntity, centers, rooms, studentProfiles, incidents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.student.home.createOrEditLabel">Create or edit a Student</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : studentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="student-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField id="student-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="student-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModifiedOnLabel" for="lastModifiedOn">
                    Last Modified On
                  </Label>
                  <AvField id="student-lastModifiedOn" type="date" className="form-control" name="lastModifiedOn" />
                </AvGroup>
                <AvGroup>
                  <Label for="center.id">Center</Label>
                  <AvInput id="student-center" type="select" className="form-control" name="center.id">
                    <option value="" key="0" />
                    {centers
                      ? centers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="room.id">Room</Label>
                  <AvInput id="student-room" type="select" className="form-control" name="room.id">
                    <option value="" key="0" />
                    {rooms
                      ? rooms.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="id.id">Id</Label>
                  <AvInput id="student-id" type="select" className="form-control" name="id.id">
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
                <AvGroup>
                  <Label for="incident.id">Incident</Label>
                  <AvInput id="student-incident" type="select" className="form-control" name="incident.id">
                    <option value="" key="0" />
                    {incidents
                      ? incidents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/student" replace color="info">
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
  centers: storeState.center.entities,
  rooms: storeState.room.entities,
  studentProfiles: storeState.studentProfile.entities,
  incidents: storeState.incident.entities,
  studentEntity: storeState.student.entity,
  loading: storeState.student.loading,
  updating: storeState.student.updating
});

const mapDispatchToProps = {
  getCenters,
  getRooms,
  getStudentProfiles,
  getIncidents,
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
)(StudentUpdate);
