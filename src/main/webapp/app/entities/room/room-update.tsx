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
import { ISchedule } from 'app/shared/model/schedule.model';
import { getEntities as getSchedules } from 'app/entities/schedule/schedule.reducer';
import { getEntity, updateEntity, createEntity, reset } from './room.reducer';
import { IRoom } from 'app/shared/model/room.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRoomUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IRoomUpdateState {
  isNew: boolean;
  centerId: number;
  scheduleId: number;
}

export class RoomUpdate extends React.Component<IRoomUpdateProps, IRoomUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      centerId: 0,
      scheduleId: 0,
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
    this.props.getSchedules();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { roomEntity } = this.props;
      const entity = {
        ...roomEntity,
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
    this.props.history.push('/entity/room');
  };

  render() {
    const { roomEntity, centers, schedules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.room.home.createOrEditLabel">Create or edit a Room</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : roomEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="room-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField id="room-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="capacityLabel" for="capacity">
                    Capacity
                  </Label>
                  <AvField id="room-capacity" type="number" className="form-control" name="capacity" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="room-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModifiedOnLabel" for="lastModifiedOn">
                    Last Modified On
                  </Label>
                  <AvField id="room-lastModifiedOn" type="date" className="form-control" name="lastModifiedOn" />
                </AvGroup>
                <AvGroup>
                  <Label for="center.id">Center</Label>
                  <AvInput id="room-center" type="select" className="form-control" name="center.id">
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
                  <Label for="schedule.id">Schedule</Label>
                  <AvInput id="room-schedule" type="select" className="form-control" name="schedule.id">
                    <option value="" key="0" />
                    {schedules
                      ? schedules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/room" replace color="info">
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
  schedules: storeState.schedule.entities,
  roomEntity: storeState.room.entity,
  loading: storeState.room.loading,
  updating: storeState.room.updating
});

const mapDispatchToProps = {
  getCenters,
  getSchedules,
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
)(RoomUpdate);
