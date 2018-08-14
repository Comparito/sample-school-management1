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
import { getEntity, updateEntity, createEntity, reset } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIncidentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IIncidentUpdateState {
  isNew: boolean;
  studentProfileId: number;
}

export class IncidentUpdate extends React.Component<IIncidentUpdateProps, IIncidentUpdateState> {
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
      const { incidentEntity } = this.props;
      const entity = {
        ...incidentEntity,
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
    this.props.history.push('/entity/incident');
  };

  render() {
    const { incidentEntity, studentProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.incident.home.createOrEditLabel">Create or edit a Incident</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : incidentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="incident-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="natureOfIncidentLabel" for="natureOfIncident">
                    Nature Of Incident
                  </Label>
                  <AvField id="incident-natureOfIncident" type="text" name="natureOfIncident" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstAidProvidedLabel" check>
                    <AvInput id="incident-firstAidProvided" type="checkbox" className="form-control" name="firstAidProvided" />
                    First Aid Provided
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="firstAidNotesLabel" for="firstAidNotes">
                    First Aid Notes
                  </Label>
                  <AvField id="incident-firstAidNotes" type="text" name="firstAidNotes" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    Date
                  </Label>
                  <AvField id="incident-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="incident-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="isAdminOnlyLabel" check>
                    <AvInput id="incident-isAdminOnly" type="checkbox" className="form-control" name="isAdminOnly" />
                    Is Admin Only
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    Notes
                  </Label>
                  <AvField id="incident-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">Student Profile</Label>
                  <AvInput id="incident-studentProfile" type="select" className="form-control" name="studentProfile.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/incident" replace color="info">
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
  incidentEntity: storeState.incident.entity,
  loading: storeState.incident.loading,
  updating: storeState.incident.updating
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
)(IncidentUpdate);
