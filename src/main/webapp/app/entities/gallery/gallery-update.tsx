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
import { getEntity, updateEntity, createEntity, reset } from './gallery.reducer';
import { IGallery } from 'app/shared/model/gallery.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGalleryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IGalleryUpdateState {
  isNew: boolean;
  studentProfileId: number;
}

export class GalleryUpdate extends React.Component<IGalleryUpdateProps, IGalleryUpdateState> {
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
      const { galleryEntity } = this.props;
      const entity = {
        ...galleryEntity,
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
    this.props.history.push('/entity/gallery');
  };

  render() {
    const { galleryEntity, studentProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.gallery.home.createOrEditLabel">Create or edit a Gallery</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : galleryEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="gallery-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="mediaTypeLabel">Media Type</Label>
                  <AvInput
                    id="gallery-mediaType"
                    type="select"
                    className="form-control"
                    name="mediaType"
                    value={(!isNew && galleryEntity.mediaType) || 'PHOTO'}
                  >
                    <option value="PHOTO">PHOTO</option>
                    <option value="VIDEO">VIDEO</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    Created On
                  </Label>
                  <AvField id="gallery-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileUrlLabel" for="fileUrl">
                    File Url
                  </Label>
                  <AvField id="gallery-fileUrl" type="text" name="fileUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField id="gallery-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">Student Profile</Label>
                  <AvInput id="gallery-studentProfile" type="select" className="form-control" name="studentProfile.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/gallery" replace color="info">
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
  galleryEntity: storeState.gallery.entity,
  loading: storeState.gallery.loading,
  updating: storeState.gallery.updating
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
)(GalleryUpdate);
