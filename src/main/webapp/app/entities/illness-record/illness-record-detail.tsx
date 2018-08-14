import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './illness-record.reducer';
import { IIllnessRecord } from 'app/shared/model/illness-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIllnessRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class IllnessRecordDetail extends React.Component<IIllnessRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { illnessRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            IllnessRecord [<b>{illnessRecordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={illnessRecordEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{illnessRecordEntity.name}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{illnessRecordEntity.description}</dd>
            <dt>
              <span id="isCured">Is Cured</span>
            </dt>
            <dd>{illnessRecordEntity.isCured ? 'true' : 'false'}</dd>
            <dt>Student Profile</dt>
            <dd>{illnessRecordEntity.studentProfile ? illnessRecordEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/illness-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/illness-record/${illnessRecordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ illnessRecord }: IRootState) => ({
  illnessRecordEntity: illnessRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IllnessRecordDetail);
