import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IParent } from 'app/shared/model/parent.model';
import { getEntities as getParents } from 'app/entities/parent/parent.reducer';
import { getEntity, updateEntity, createEntity, reset } from './feature.reducer';
import { IFeature } from 'app/shared/model/feature.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFeatureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IFeatureUpdateState {
  isNew: boolean;
  parentId: number;
}

export class FeatureUpdate extends React.Component<IFeatureUpdateProps, IFeatureUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      parentId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getParents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { featureEntity } = this.props;
      const entity = {
        ...featureEntity,
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
    this.props.history.push('/entity/feature');
  };

  render() {
    const { featureEntity, parents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.feature.home.createOrEditLabel">Create or edit a Feature</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : featureEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="feature-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField id="feature-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="featureTypeLabel">Feature Type</Label>
                  <AvInput
                    id="feature-featureType"
                    type="select"
                    className="form-control"
                    name="featureType"
                    value={(!isNew && featureEntity.featureType) || 'STANDARD'}
                  >
                    <option value="STANDARD">STANDARD</option>
                    <option value="PREMIUM">PREMIUM</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="parent.id">Parent</Label>
                  <AvInput id="feature-parent" type="select" className="form-control" name="parent.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/feature" replace color="info">
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
  parents: storeState.parent.entities,
  featureEntity: storeState.feature.entity,
  loading: storeState.feature.loading,
  updating: storeState.feature.updating
});

const mapDispatchToProps = {
  getParents,
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
)(FeatureUpdate);
