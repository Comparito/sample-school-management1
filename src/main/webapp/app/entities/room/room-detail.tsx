import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './room.reducer';
import { IRoom } from 'app/shared/model/room.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoomDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class RoomDetail extends React.Component<IRoomDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { roomEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Room [<b>{roomEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{roomEntity.name}</dd>
            <dt>
              <span id="capacity">Capacity</span>
            </dt>
            <dd>{roomEntity.capacity}</dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={roomEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">Last Modified On</span>
            </dt>
            <dd>
              <TextFormat value={roomEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Center</dt>
            <dd>{roomEntity.center ? roomEntity.center.id : ''}</dd>
            <dt>Schedule</dt>
            <dd>{roomEntity.schedule ? roomEntity.schedule.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/room" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/room/${roomEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ room }: IRootState) => ({
  roomEntity: room.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomDetail);
