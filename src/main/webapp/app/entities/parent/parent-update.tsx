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
import { getEntity, updateEntity, createEntity, reset } from './parent.reducer';
import { IParent } from 'app/shared/model/parent.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IParentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IParentUpdateState {
  isNew: boolean;
  studentProfileId: number;
}

export class ParentUpdate extends React.Component<IParentUpdateProps, IParentUpdateState> {
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
      const { parentEntity } = this.props;
      const entity = {
        ...parentEntity,
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
    this.props.history.push('/entity/parent');
  };

  render() {
    const { parentEntity, studentProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.parent.home.createOrEditLabel">Create or edit a Parent</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : parentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="parent-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField id="parent-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="parent-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="phoneNumber">
                    Phone Number
                  </Label>
                  <AvField id="parent-phoneNumber" type="text" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="relationLabel">Relation</Label>
                  <AvInput
                    id="parent-relation"
                    type="select"
                    className="form-control"
                    name="relation"
                    value={(!isNew && parentEntity.relation) || 'FATHER'}
                  >
                    <option value="FATHER">FATHER</option>
                    <option value="MOTHER">MOTHER</option>
                    <option value="GUARDIAN">GUARDIAN</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="studentNameLabel" for="studentName">
                    Student Name
                  </Label>
                  <AvField id="parent-studentName" type="text" name="studentName" />
                </AvGroup>
                <AvGroup>
                  <Label id="isAccountActiveLabel" check>
                    <AvInput id="parent-isAccountActive" type="checkbox" className="form-control" name="isAccountActive" />
                    Is Account Active
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    Email
                  </Label>
                  <AvField id="parent-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">Student Profile</Label>
                  <AvInput id="parent-studentProfile" type="select" className="form-control" name="studentProfile.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/parent" replace color="info">
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
  parentEntity: storeState.parent.entity,
  loading: storeState.parent.loading,
  updating: storeState.parent.updating
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
)(ParentUpdate);
