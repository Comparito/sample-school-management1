import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './student-profile.reducer';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class StudentProfileDetail extends React.Component<IStudentProfileDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { studentProfileEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            StudentProfile [<b>{studentProfileEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="dream">Dream</span>
            </dt>
            <dd>{studentProfileEntity.dream}</dd>
            <dt>
              <span id="birthDate">Birth Date</span>
            </dt>
            <dd>
              <TextFormat value={studentProfileEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="bloodGroup">Blood Group</span>
            </dt>
            <dd>{studentProfileEntity.bloodGroup}</dd>
            <dt>
              <span id="gender">Gender</span>
            </dt>
            <dd>{studentProfileEntity.gender}</dd>
          </dl>
          <Button tag={Link} to="/entity/student-profile" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/student-profile/${studentProfileEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ studentProfile }: IRootState) => ({
  studentProfileEntity: studentProfile.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentProfileDetail);
