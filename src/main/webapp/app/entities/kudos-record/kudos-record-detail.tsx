import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './kudos-record.reducer';
import { IKudosRecord } from 'app/shared/model/kudos-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKudosRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class KudosRecordDetail extends React.Component<IKudosRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { kudosRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            KudosRecord [<b>{kudosRecordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={kudosRecordEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="notes">Notes</span>
            </dt>
            <dd>{kudosRecordEntity.notes}</dd>
            <dt>Student Profile</dt>
            <dd>{kudosRecordEntity.studentProfile ? kudosRecordEntity.studentProfile.id : ''}</dd>
            <dt>Kudos</dt>
            <dd>{kudosRecordEntity.kudos ? kudosRecordEntity.kudos.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/kudos-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/kudos-record/${kudosRecordEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ kudosRecord }: IRootState) => ({
  kudosRecordEntity: kudosRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KudosRecordDetail);
