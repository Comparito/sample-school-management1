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
import { getEntity, updateEntity, createEntity, reset } from './permission.reducer';
import { IPermission } from 'app/shared/model/permission.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPermissionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IPermissionUpdateState {
  isNew: boolean;
  parentId: number;
}

export class PermissionUpdate extends React.Component<IPermissionUpdateProps, IPermissionUpdateState> {
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
      const { permissionEntity } = this.props;
      const entity = {
        ...permissionEntity,
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
    this.props.history.push('/entity/permission');
  };

  render() {
    const { permissionEntity, parents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="sampleschoolmanagement1App.permission.home.createOrEditLabel">Create or edit a Permission</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : permissionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="permission-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    Name
                  </Label>
                  <AvField id="permission-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label for="parent.id">Parent</Label>
                  <AvInput id="permission-parent" type="select" className="form-control" name="parent.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/permission" replace color="info">
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
  permissionEntity: storeState.permission.entity,
  loading: storeState.permission.loading,
  updating: storeState.permission.updating
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
)(PermissionUpdate);
