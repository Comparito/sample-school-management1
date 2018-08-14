import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './video.reducer';
import { IVideo } from 'app/shared/model/video.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVideoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Video extends React.Component<IVideoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { videoList, match } = this.props;
    return (
      <div>
        <h2 id="video-heading">
          Videos
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Video
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Uploaded Date</th>
                <th>Url</th>
                <th>Event</th>
                <th>Activity</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {videoList.map((video, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${video.id}`} color="link" size="sm">
                      {video.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={video.uploadedDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{video.url}</td>
                  <td>{video.event ? <Link to={`event/${video.event.id}`}>{video.event.id}</Link> : ''}</td>
                  <td>{video.activity ? <Link to={`activity/${video.activity.id}`}>{video.activity.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${video.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${video.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${video.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ video }: IRootState) => ({
  videoList: video.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
