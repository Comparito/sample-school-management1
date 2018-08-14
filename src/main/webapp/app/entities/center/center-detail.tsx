import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './center.reducer';
import { ICenter } from 'app/shared/model/center.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICenterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CenterDetail extends React.Component<ICenterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { centerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Center [<b>{centerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{centerEntity.name}</dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={centerEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">Last Modified On</span>
            </dt>
            <dd>
              <TextFormat value={centerEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>Organization</dt>
            <dd>{centerEntity.organization ? centerEntity.organization.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/center" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/center/${centerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ center }: IRootState) => ({
  centerEntity: center.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterDetail);
