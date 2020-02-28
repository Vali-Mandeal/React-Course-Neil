import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";

import cuid from "cuid";

import EventList from "../../event/EventList/EventList";
import EventForm from "../../event/EventForm/EventForm";

import seedData from "./seedData";

class EventDashboard extends Component {
  state = {
    events: seedData,
    isOpen: false,
    selectedEvent: null
  };

  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen
  //   }));
  // };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    });
  };

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoUrl = "../../../../public/assets/logo.png";

    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false
    }));
  };

  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    });
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;

    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList events={events} selectEvent={this.handleSelectEvent}/>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button
              onClick={this.handleCreateFormOpen}
              positive
              content='Create Event'
            />
            {isOpen && (
              <EventForm
                selectedEvent={selectedEvent}
                createEvent={this.handleCreateEvent}
                cancelFormOpen={this.handleFormCancel}
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default EventDashboard;
