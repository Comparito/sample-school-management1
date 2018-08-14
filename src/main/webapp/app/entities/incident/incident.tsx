import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Incident extends React.Component<IIncidentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { incidentList, match } = this.props;
    return (
      <div>
        <h2 id="incident-heading">
          Incidents
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Incident
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nature Of Incident</th>
                <th>First Aid Provided</th>
                <th>First Aid Notes</th>
                <th>Date</th>
                <th>Created On</th>
                <th>Is Admin Only</th>
                <th>Notes</th>
                <th>Student Profile</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {incidentList.map((incident, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${incident.id}`} color="link" size="sm">
                      {incident.id}
                    </Button>
                  </td>
                  <td>{incident.natureOfIncident}</td>
                  <td>{incident.firstAidProvided ? 'true' : 'false'}</td>
                  <td>{incident.firstAidNotes}</td>
                  <td>
                    <TextFormat type="date" value={incident.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={incident.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{incident.isAdminOnly ? 'true' : 'false'}</td>
                  <td>{incident.notes}</td>
                  <td>
                    {incident.studentProfile ? (
                      <Link to={`student-profile/${incident.studentProfile.id}`}>{incident.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${incident.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${incident.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${incident.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ incident }: IRootState) => ({
  incidentList: incident.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Incident);
