import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './immunization-record.reducer';
import { IImmunizationRecord } from 'app/shared/model/immunization-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImmunizationRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ImmunizationRecordDetail extends React.Component<IImmunizationRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { immunizationRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ImmunizationRecord [<b>{immunizationRecordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={immunizationRecordEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="vaccinationDoneOn">Vaccination Done On</span>
            </dt>
            <dd>
              <TextFormat value={immunizationRecordEntity.vaccinationDoneOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="vaccinationName">Vaccination Name</span>
            </dt>
            <dd>{immunizationRecordEntity.vaccinationName}</dd>
            <dt>
              <span id="isOnTime">Is On Time</span>
            </dt>
            <dd>{immunizationRecordEntity.isOnTime ? 'true' : 'false'}</dd>
            <dt>Student Profile</dt>
            <dd>{immunizationRecordEntity.studentProfile ? immunizationRecordEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/immunization-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/immunization-record/${immunizationRecordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ immunizationRecord }: IRootState) => ({
  immunizationRecordEntity: immunizationRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImmunizationRecordDetail);
