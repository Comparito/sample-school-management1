import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './student-profile.reducer';
import { IStudentProfile } from 'app/shared/model/student-profile.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStudentProfileProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class StudentProfile extends React.Component<IStudentProfileProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { studentProfileList, match } = this.props;
    return (
      <div>
        <h2 id="student-profile-heading">
          Student Profiles
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Student Profile
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Dream</th>
                <th>Birth Date</th>
                <th>Blood Group</th>
                <th>Gender</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {studentProfileList.map((studentProfile, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${studentProfile.id}`} color="link" size="sm">
                      {studentProfile.id}
                    </Button>
                  </td>
                  <td>{studentProfile.dream}</td>
                  <td>
                    <TextFormat type="date" value={studentProfile.birthDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{studentProfile.bloodGroup}</td>
                  <td>{studentProfile.gender}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${studentProfile.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${studentProfile.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${studentProfile.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ studentProfile }: IRootState) => ({
  studentProfileList: studentProfile.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentProfile);
