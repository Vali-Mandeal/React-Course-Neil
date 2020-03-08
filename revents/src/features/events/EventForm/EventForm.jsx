import React, { Component } from "react";
import { connect } from "react-redux";
import {reduxForm, Field} from "redux-form";
import { Segment, Form, Button } from "semantic-ui-react";
import cuid from "cuid";

import { createEvent, updateEvent } from "../eventActions";
import { formValueSelector } from "redux-form";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };

  if (eventId && state.events.length > 0) {
    event = state.events.find(event => event.id === eventId);
  }

  return {
    event
  };
};

const actions = {
  createEvent,
  updateEvent
};

class EventForm extends Component {
  state = { ...this.props.event };

  componentDidMount() {
    if (this.props.selectedEvent != null) {
      this.setState({
        ...this.props.selectedEvent
      });
    }
  }

  handleFormSubmit = evt => {
    evt.preventDefault();

    // we are checking if the event has an ID, because that means it's populated
    // so the button does update the event when fired
    // else, it means the form is empty, so button should be used for create only
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "../../../../public/assets/user.png"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
  };

  // destructure event and then event.target, taking name and value out of it
  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      // sets state for all form props with this
      [name]: value
    });
  };

  render() {
    const { title, date, city, venue, hostedBy } = this.state; // destrucutring
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
         <Field name='title' component='input' placeholder='Event title'/>
          <Form.Field>
            <label>Event Date</label>
            <input
              name='date'
              onChange={this.handleInputChange}
              value={date}
              type='date'
              placeholder='Event Date'
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name='city'
              onChange={this.handleInputChange}
              value={city}
              placeholder='City event is taking place'
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name='venue'
              onChange={this.handleInputChange}
              value={venue}
              placeholder='Enter the Venue of the event'
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name='hostedBy'
              onChange={this.handleInputChange}
              value={hostedBy}
              placeholder='Enter the name of person hosting'
            />
          </Form.Field>
          <Button positive type='submit'>
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type='button'>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm'})(EventForm));
