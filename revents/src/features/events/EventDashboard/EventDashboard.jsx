import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

import EventList from "../../events/EventList/EventList";

const mapState = state => ({
  events: state.events
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

class EventDashboard extends Component {

  handleDeleteEvent = id => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events } = this.props;
    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList
              events={events}
              deleteEvent={this.handleDeleteEvent}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <h2>Activity Feed</h2>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
