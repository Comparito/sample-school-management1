import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './parent.reducer';
import { IParent } from 'app/shared/model/parent.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Parent extends React.Component<IParentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { parentList, match } = this.props;
    return (
      <div>
        <h2 id="parent-heading">
          Parents
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Parent
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created On</th>
                <th>Phone Number</th>
                <th>Relation</th>
                <th>Student Name</th>
                <th>Is Account Active</th>
                <th>Email</th>
                <th>Student Profile</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {parentList.map((parent, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${parent.id}`} color="link" size="sm">
                      {parent.id}
                    </Button>
                  </td>
                  <td>{parent.name}</td>
                  <td>
                    <TextFormat type="date" value={parent.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{parent.phoneNumber}</td>
                  <td>{parent.relation}</td>
                  <td>{parent.studentName}</td>
                  <td>{parent.isAccountActive ? 'true' : 'false'}</td>
                  <td>{parent.email}</td>
                  <td>
                    {parent.studentProfile ? (
                      <Link to={`student-profile/${parent.studentProfile.id}`}>{parent.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${parent.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${parent.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${parent.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ parent }: IRootState) => ({
  parentList: parent.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Parent);
