import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import cuid from "cuid";

import { createEvent, updateEvent } from "../eventActions";
// import { formValueSelector } from "redux-form";
import TextInput from "../../../app/form/TextInput";
import TextArea from './../../../app/form/TextArea';

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

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='event details' />
            <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                component={TextInput}
                placeholder='What is your event about?'
              />
              <Field
                name='description'
                component={TextArea}
                placeholder='Tell us about your event'
                rows={3}
              />
              <Header sub color='teal' content='Event Location Details' />

              <Field
                name='city'
                component={TextInput}
                placeholder='Event city'
              />
              <Field
                name='venue'
                component={TextInput}
                placeholder='Event venue'
              />
              <Field
                name='date'
                component={TextInput}
                placeholder='Event date'
              />

              <Button positive type='submit'>
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type='button'>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm" })(EventForm));
