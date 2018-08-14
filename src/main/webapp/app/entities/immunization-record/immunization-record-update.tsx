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
import { getEntity, updateEntity, createEntity, reset } from './immunization-record.reducer';
import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImmunizationRecordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IImmunizationRecordUpdateState {
  isNew: boolean;
  studentProfileId: number;
}

export class ImmunizationRecordUpdate extends React.Component<IImmunizationRecordUpdateProps, IImmunizationRecordUpdateState> {
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
      const { immunizationRecordEntity } = this.props;
      const entity = {
        ...immunizationRecordEntity,
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
    this.props.history.push('/entity/immunization-record');
  };

  render() {
    const { immunizationRecordEntity, studentProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.immunizationRecord.home.createOrEditLabel">Create or edit a ImmunizationRecord</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : immunizationRecordEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="immunization-record-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="immunization-record-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="vaccinationDoneOnLabel" for="vaccinationDoneOn">
                    Vaccination Done On
                  </Label>
                  <AvField id="immunization-record-vaccinationDoneOn" type="date" className="form-control" name="vaccinationDoneOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="vaccinationNameLabel" for="vaccinationName">
                    Vaccination Name
                  </Label>
                  <AvField id="immunization-record-vaccinationName" type="text" name="vaccinationName" />
                </AvGroup>
                <AvGroup>
                  <Label id="isOnTimeLabel" check>
                    <AvInput id="immunization-record-isOnTime" type="checkbox" className="form-control" name="isOnTime" />
                    Is On Time
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">Student Profile</Label>
                  <AvInput id="immunization-record-studentProfile" type="select" className="form-control" name="studentProfile.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/immunization-record" replace color="info">
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
  immunizationRecordEntity: storeState.immunizationRecord.entity,
  loading: storeState.immunizationRecord.loading,
  updating: storeState.immunizationRecord.updating
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
)(ImmunizationRecordUpdate);
