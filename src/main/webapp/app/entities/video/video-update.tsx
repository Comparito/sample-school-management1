import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEvent } from 'app/shared/model/event.model';
import { getEntities as getEvents } from 'app/entities/event/event.reducer';
import { IActivity } from 'app/shared/model/activity.model';
import { getEntities as getActivities } from 'app/entities/activity/activity.reducer';
import { getEntity, updateEntity, createEntity, reset } from './video.reducer';
import { IVideo } from 'app/shared/model/video.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVideoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IVideoUpdateState {
  isNew: boolean;
  eventId: number;
  activityId: number;
}

export class VideoUpdate extends React.Component<IVideoUpdateProps, IVideoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      eventId: 0,
      activityId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getEvents();
    this.props.getActivities();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { videoEntity } = this.props;
      const entity = {
        ...videoEntity,
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
    this.props.history.push('/entity/video');
  };

  render() {
    const { videoEntity, events, activities, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.video.home.createOrEditLabel">Create or edit a Video</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : videoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="video-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="uploadedDateLabel" for="uploadedDate">
                    Uploaded Date
                  </Label>
                  <AvField id="video-uploadedDate" type="date" className="form-control" name="uploadedDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="url">
                    Url
                  </Label>
                  <AvField id="video-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label for="event.id">Event</Label>
                  <AvInput id="video-event" type="select" className="form-control" name="event.id">
                    <option value="" key="0" />
                    {events
                      ? events.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="activity.id">Activity</Label>
                  <AvInput id="video-activity" type="select" className="form-control" name="activity.id">
                    <option value="" key="0" />
                    {activities
                      ? activities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/video" replace color="info">
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
  events: storeState.event.entities,
  activities: storeState.activity.entities,
  videoEntity: storeState.video.entity,
  loading: storeState.video.loading,
  updating: storeState.video.updating
});

const mapDispatchToProps = {
  getEvents,
  getActivities,
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
)(VideoUpdate);
