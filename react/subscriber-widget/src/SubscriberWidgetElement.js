import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const EVENTS = {
  greeting: 'greeting',
};

class SubscriberWidgetElement extends HTMLElement {

  constructor() {
    super();
    this.name = null;
    this.subscribeToWidgetEvent(EVENTS.greeting, (evt) => this.onGreeting(evt.detail.name));
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.render();
  }

  subscribeToWidgetEvent(eventType, eventHandler) {
    window.addEventListener(eventType, eventHandler);
  }

  onGreeting(name) {
    this.name = name;
    this.render();
  }

  render() {
    ReactDOM.render(<App name={this.name} />, this.mountPoint);
  }
}

customElements.define('subscriber-widget', SubscriberWidgetElement);

export default SubscriberWidgetElement;
