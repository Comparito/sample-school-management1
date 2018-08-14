import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TeacherDetail extends React.Component<ITeacherDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { teacherEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Teacher [<b>{teacherEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{teacherEntity.name}</dd>
            <dt>
              <span id="contactNumber">Contact Number</span>
            </dt>
            <dd>{teacherEntity.contactNumber}</dd>
            <dt>
              <span id="gender">Gender</span>
            </dt>
            <dd>{teacherEntity.gender}</dd>
            <dt>
              <span id="address">Address</span>
            </dt>
            <dd>{teacherEntity.address}</dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={teacherEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="joiningDate">Joining Date</span>
            </dt>
            <dd>
              <TextFormat value={teacherEntity.joiningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Center</dt>
            <dd>{teacherEntity.center ? teacherEntity.center.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/teacher" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/teacher/${teacherEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherEntity: teacher.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetail);
