import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './gallery.reducer';
import { IGallery } from 'app/shared/model/gallery.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGalleryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Gallery extends React.Component<IGalleryProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { galleryList, match } = this.props;
    return (
      <div>
        <h2 id="gallery-heading">
          Galleries
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Gallery
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Media Type</th>
                <th>Created On</th>
                <th>File Url</th>
                <th>Title</th>
                <th>Student Profile</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {galleryList.map((gallery, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${gallery.id}`} color="link" size="sm">
                      {gallery.id}
                    </Button>
                  </td>
                  <td>{gallery.mediaType}</td>
                  <td>
                    <TextFormat type="date" value={gallery.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{gallery.fileUrl}</td>
                  <td>{gallery.title}</td>
                  <td>
                    {gallery.studentProfile ? (
                      <Link to={`student-profile/${gallery.studentProfile.id}`}>{gallery.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${gallery.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gallery.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gallery.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ gallery }: IRootState) => ({
  galleryList: gallery.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
