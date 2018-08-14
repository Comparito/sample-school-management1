import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRoom } from 'app/shared/model/room.model';
import { getEntities as getRooms } from 'app/entities/room/room.reducer';
import { IParent } from 'app/shared/model/parent.model';
import { getEntities as getParents } from 'app/entities/parent/parent.reducer';
import { ITaskType } from 'app/shared/model/task-type.model';
import { getEntities as getTaskTypes } from 'app/entities/task-type/task-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';
import { ITask } from 'app/shared/model/task.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITaskUpdateState {
  isNew: boolean;
  roomId: number;
  parentId: number;
  taskTypeId: number;
}

export class TaskUpdate extends React.Component<ITaskUpdateProps, ITaskUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0,
      parentId: 0,
      taskTypeId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRooms();
    this.props.getParents();
    this.props.getTaskTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { taskEntity } = this.props;
      const entity = {
        ...taskEntity,
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
    this.props.history.push('/entity/task');
  };

  render() {
    const { taskEntity, rooms, parents, taskTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.task.home.createOrEditLabel">Create or edit a Task</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : taskEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="task-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField id="task-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    Notes
                  </Label>
                  <AvField id="task-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    Start Date
                  </Label>
                  <AvField id="task-startDate" type="date" className="form-control" name="startDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="endDate">
                    End Date
                  </Label>
                  <AvField id="task-endDate" type="date" className="form-control" name="endDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="reminderTypeLabel">Reminder Type</Label>
                  <AvInput
                    id="task-reminderType"
                    type="select"
                    className="form-control"
                    name="reminderType"
                    value={(!isNew && taskEntity.reminderType) || 'HOURLY'}
                  >
                    <option value="HOURLY">HOURLY</option>
                    <option value="DAILY">DAILY</option>
                    <option value="WEEKLY">WEEKLY</option>
                    <option value="MONTHLY">MONTHLY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="room.id">Room</Label>
                  <AvInput id="task-room" type="select" className="form-control" name="room.id">
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
                  <Label for="parent.id">Parent</Label>
                  <AvInput id="task-parent" type="select" className="form-control" name="parent.id">
                    <option value="" key="0" />
                    {parents
                      ? parents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="taskType.id">Task Type</Label>
                  <AvInput id="task-taskType" type="select" className="form-control" name="taskType.id">
                    <option value="" key="0" />
                    {taskTypes
                      ? taskTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/task" replace color="info">
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
  rooms: storeState.room.entities,
  parents: storeState.parent.entities,
  taskTypes: storeState.taskType.entities,
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating
});

const mapDispatchToProps = {
  getRooms,
  getParents,
  getTaskTypes,
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
)(TaskUpdate);
