import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gallery.reducer';
import { IGallery } from 'app/shared/model/gallery.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGalleryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class GalleryDetail extends React.Component<IGalleryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { galleryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Gallery [<b>{galleryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mediaType">Media Type</span>
            </dt>
            <dd>{galleryEntity.mediaType}</dd>
            <dt>
              <span id="createdOn">Created On</span>
            </dt>
            <dd>
              <TextFormat value={galleryEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fileUrl">File Url</span>
            </dt>
            <dd>{galleryEntity.fileUrl}</dd>
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{galleryEntity.title}</dd>
            <dt>Student Profile</dt>
            <dd>{galleryEntity.studentProfile ? galleryEntity.studentProfile.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/gallery" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/gallery/${galleryEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ gallery }: IRootState) => ({
  galleryEntity: gallery.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryDetail);
