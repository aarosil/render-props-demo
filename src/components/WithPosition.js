import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class WithPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {bottom: 0, left: 0, width: 0, scrollTop: 0};
    this.measurePosition = this.measurePosition.bind(this);
  }

  componentDidMount() {
    this.measurePosition()
    window.addEventListener('resize', this.measurePosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.measurePosition);
  }

  measurePosition() {
    const el = findDOMNode(this);
    if (!el) return;
    const dims = el.getBoundingClientRect();
    const { bottom, left, width } = dims;
    const scrollTop = window.pageYOffset;

    this.setState({
      scrollTop,
      bottom,
      left,
      width
    });
  }

  render() {
    return this.props.children(this.state)
  }
}