import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class IncidentDetail extends React.Component<IIncidentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { incidentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Incident [<b>{incidentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="natureOfIncident">Nature Of Incident</span>
            </dt>
            <dd>{incidentEntity.natureOfIncident}</dd>
            <dt>
              <span id="firstAidProvided">First Aid Provided</span>
            </dt>
            <dd>{incidentEntity.firstAidProvided ? 'true' : 'false'}</dd>
            <dt>
              <span id="firstAidNotes">First Aid Notes</span>
            </dt>
            <dd>{incidentEntity.firstAidNotes}</dd>
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={incidentEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={incidentEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="isAdminOnly">Is Admin Only</span>
            </dt>
            <dd>{incidentEntity.isAdminOnly ? 'true' : 'false'}</dd>
            <dt>
              <span id="notes">Notes</span>
            </dt>
            <dd>{incidentEntity.notes}</dd>
            <dt>Student Profile</dt>
            <dd>{incidentEntity.studentProfile ? incidentEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/incident" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/incident/${incidentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ incident }: IRootState) => ({
  incidentEntity: incident.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncidentDetail);
