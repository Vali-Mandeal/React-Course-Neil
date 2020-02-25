import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";

import EventList from "../../event/EventList/EventList";
import EventForm from "../../event/EventForm/EventForm";

import seedData from "./seedData";

class EventDashboard extends Component {
  state = {
    events: seedData,
    isOpen: false
  };

  handleIsOpenToggle = () => {
    this.setState(({isOpen}) => ({
      isOpen: !isOpen
    }));
  };

  render() {
    const { events, isOpen } = this.state;

    return (
      <div>
        <Grid>
          <Grid.Column width={10}>
            <EventList events={events} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Button onClick={this.handleIsOpenToggle} positive content='Create Event' />
            {isOpen && <EventForm cancelFormOpen={this.handleIsOpenToggle}/>}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default EventDashboard;
