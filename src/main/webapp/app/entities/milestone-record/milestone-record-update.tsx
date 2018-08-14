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
import { IMilestone } from 'app/shared/model/milestone.model';
import { getEntities as getMilestones } from 'app/entities/milestone/milestone.reducer';
import { getEntity, updateEntity, createEntity, reset } from './milestone-record.reducer';
import { IMilestoneRecord } from 'app/shared/model/milestone-record.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMilestoneRecordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IMilestoneRecordUpdateState {
  isNew: boolean;
  studentProfileId: number;
  milestoneId: number;
}

export class MilestoneRecordUpdate extends React.Component<IMilestoneRecordUpdateProps, IMilestoneRecordUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentProfileId: 0,
      milestoneId: 0,
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
    this.props.getMilestones();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { milestoneRecordEntity } = this.props;
      const entity = {
        ...milestoneRecordEntity,
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
    this.props.history.push('/entity/milestone-record');
  };

  render() {
    const { milestoneRecordEntity, studentProfiles, milestones, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.milestoneRecord.home.createOrEditLabel">Create or edit a MilestoneRecord</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : milestoneRecordEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="milestone-record-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="milestone-record-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    Notes
                  </Label>
                  <AvField id="milestone-record-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">Student Profile</Label>
                  <AvInput id="milestone-record-studentProfile" type="select" className="form-control" name="studentProfile.id">
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
                  <Label for="milestone.id">Milestone</Label>
                  <AvInput id="milestone-record-milestone" type="select" className="form-control" name="milestone.id">
                    <option value="" key="0" />
                    {milestones
                      ? milestones.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/milestone-record" replace color="info">
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
  milestones: storeState.milestone.entities,
  milestoneRecordEntity: storeState.milestoneRecord.entity,
  loading: storeState.milestoneRecord.loading,
  updating: storeState.milestoneRecord.updating
});

const mapDispatchToProps = {
  getStudentProfiles,
  getMilestones,
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
)(MilestoneRecordUpdate);
