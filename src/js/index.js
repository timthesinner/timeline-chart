/**
 * Copyright (c) 2015 TimTheSinner All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import 'index.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

import Timeline from 'timeline';
const HEIGHT = 200;
const DAY = 1000*60*60*24;

class TimelineApp extends Component {
  constructor(props) {
    super(props);
    this.state = {width:window.innerWidth};
    this.resize = this.resize.bind(this);
  }

  resize() {
    this.setState({width: window.innerWidth});
  }

  days(first, second) {
    return (second.date - first.date) / DAY;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    let earliest, last = null;
    let themes = Timeline.themes.map((theme) => {
      let first = null;
      return theme.events.map((event, i) => {
        if (! earliest || event < earliest) {
          earliest = event;
        }
        
        if (! last || event > last) {
          last = event;
        }

        if (i === 0) {
          first = event;
        } else {
          const ret = {
            start: first.name,
            end: event.name,
            days: this.days(first, event)
          }
          first = event;
          return ret;
        }
      }).filter((n) => n);
    });

    console.log(themes)

    return (
      <div>
      <svg width={this.state.width} height={HEIGHT}>
        <g width={this.state.width} height={HEIGHT}>
        <rect x="0" y="20" width={this.state.width-10} height="150" style={{fill:'blue',stroke:'pink'}}/>
        </g>
      </svg>
      {this.state.width}
      </div>
    );
  }
}

render(<TimelineApp />, document.getElementById('content'));
