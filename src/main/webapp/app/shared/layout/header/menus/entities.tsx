import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/organization">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Organization
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/center">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Center
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/room">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Room
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/schedule">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Schedule
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/event">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Event
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/activity">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Activity
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/activity-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Activity Type
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Photo
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/video">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Video
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Student
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-profile">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Student Profile
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Teacher
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/holiday">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Holiday
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/kudos">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Kudos
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/kudos-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Kudos Record
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/milestone">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Milestone
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/milestone-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Milestone Record
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/incident">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Incident
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/gallery">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Gallery
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/payment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Payment
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/immunization-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Immunization Record
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/illness-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Illness Record
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/attendance">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Attendance
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/parent">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Parent
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/permission">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Permission
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/feature">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Feature
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/notification">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Notification
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/task">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Task
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/task-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Task Type
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/conversation">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Conversation
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/timeline">
      <FontAwesomeIcon icon="asterisk" />&nbsp;Timeline
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
