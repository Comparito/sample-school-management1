import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './kudos-record.reducer';
import { IKudosRecord } from 'app/shared/model/kudos-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKudosRecordProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class KudosRecord extends React.Component<IKudosRecordProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { kudosRecordList, match } = this.props;
    return (
      <div>
        <h2 id="kudos-record-heading">
          Kudos Records
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Kudos Record
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Created On</th>
                <th>Notes</th>
                <th>Student Profile</th>
                <th>Kudos</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {kudosRecordList.map((kudosRecord, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${kudosRecord.id}`} color="link" size="sm">
                      {kudosRecord.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={kudosRecord.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{kudosRecord.notes}</td>
                  <td>
                    {kudosRecord.studentProfile ? (
                      <Link to={`student-profile/${kudosRecord.studentProfile.id}`}>{kudosRecord.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{kudosRecord.kudos ? <Link to={`kudos/${kudosRecord.kudos.id}`}>{kudosRecord.kudos.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${kudosRecord.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${kudosRecord.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${kudosRecord.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ kudosRecord }: IRootState) => ({
  kudosRecordList: kudosRecord.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KudosRecord);
