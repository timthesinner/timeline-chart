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

import '../scss/index.scss';

import React, { Component } from 'react';
import { render } from 'react-dom';

import Timeline from 'timeline';
const THEMES = Timeline.themes.reduce((a, theme, i) => {
  a[theme.name] = theme;
  theme.index = i;
  return a;
}, {});
console.log(THEMES);

const DAY = 1000*60*60*24;

class TimelineApp extends Component {
  constructor(props) {
    super(props);
    this.state = {width:window.innerWidth - 30};
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  days(first, second) {
    const f = first.date ? first.date : first;
    const s = second.date ? second.date : second;
    return (s - f) / DAY;
  }

  resize() {
    this.setState({width: window.innerWidth - 30});
  }

  render() {
    let earliest, last = null;

    let themes = Timeline.themes.map((theme) => {
      let first = null;
      return theme.events.map((event, i) => {
        if (!earliest || event.date < earliest) {
          earliest = event.date;
        }

        if (!last || event.date > last) {
          last = event.date;
        }

        if (i === 0) {
          first = event;
          return null;
        } else {
          const ret = {
            start: first.name,
            color: 'rgb(' + theme.color.join(',') + ')',
            end: event.name,
            begin: first.date,
            days: this.days(first, event)
          };
          first = event;
          return ret;
        }
      }).filter((n) => n);
    });

    let events = Timeline.events.map((event) => {
      const theme = THEMES[event.theme];
      if (theme) {
        if (!earliest || event.date < earliest) {
          earliest = event.date;
        }

        if (!last || event.date > last) {
          last = event.date;
        }

        event.color = 'rgb(' + theme.color.join(',') + ')';
        event.index = theme.index;
        return event;
      }
      return null;
    }).filter((n) => n);

    earliest = new Date(earliest);
    earliest.setDate(1);
    earliest.setMonth(0);
    last = new Date(last);
    last.setDate(31);
    last.setMonth(11);
    const adjustment = this.state.width / this.days(earliest, last);

    let iter = new Date(earliest);
    iter.setFullYear(iter.getFullYear() - 1);

    const HEIGHT = 90 + 18 + ((themes.length) * 17);//36,52,69,86
    const _years = Array.apply(null, Array(1 + last.getFullYear() - earliest.getFullYear())).map((_, i) => {
      const x = i * 365 * adjustment || 1;
      iter.setFullYear(iter.getFullYear() + 1);
      return [
        (<line key={"year-" + iter.getFullYear()} x1={x} y1={HEIGHT/2 - 5} x2={x} y2={HEIGHT/2 + 12} />),
        (<text key={"year-text-" + iter.getFullYear()} x={x+2} y={HEIGHT/2 + 10}>{iter.getFullYear()}</text>)
      ];
    });

    iter.setFullYear(iter.getFullYear() + 1);
    const lastYear = _years.length * 365 * adjustment;
    _years.push((<line key={"year-" + iter.getFullYear()} x1={lastYear} y1={HEIGHT/2 - 5} x2={lastYear} y2={HEIGHT/2 + 12} />));
    _years.push((<text key={"year-text-" + iter.getFullYear()} x={lastYear-2} y={HEIGHT/2 + 10} textAnchor="end">{iter.getFullYear()}</text>));
    _years.push((<line key={"years-line"} x1="0" y1={HEIGHT/2} x2={this.state.width} y2={HEIGHT/2} />));

    const _themes = themes.map((theme, i) => {
      let start = this.days(earliest, theme[0].begin) * adjustment;
      return theme.map((range, j) => {
        const offset = i % 2 === 0 ? 22 + (i/2 * 17) : (-8 + -i/2 * 17);
        const width = range.days * adjustment;
        const rect = (<rect key={"theme-" + i + "-range-" + j} x={start} y={HEIGHT/2 - offset} width={width} height="12" stroke-width="0"   style={{fill:range.color,stroke:range.color}}/>);
        start += width;
        return rect;
      });
    }).reduce((a, b) => {
      return a.concat(b);
    }, []);

    const _events = events.map((event, i) => {
      const x = this.days(earliest, event.date) * adjustment;
      const offset = HEIGHT/2 + 6 - (event.index % 2 === 0 ? 22 + (event.index/2 * 17) : (-8 + -event.index/2 * 17));
      return [
        (<line key={"event-line-" + i} x1={x} y1={offset} x2={x} y2={event.index % 2 ? offset+20 : offset-20} style={{stroke:'grey'}}/>),
        (<text key={"event-text-" + i} x={x} y={event.index % 2 ? offset+30 : offset-30} textAnchor="middle"style={{fill:event.color}}>{event.name}</text>),
        (<circle key={"event-circle-" + i} cx={x} cy={offset} r="3" stroke-width="0" fill='grey' />)
      ];
    }).reduce((a, b) => {
      return a.concat(b);
    }, []);

    return (
      <div>
        <svg width={this.state.width} height={HEIGHT}>
          <g width={this.state.width} height={HEIGHT}>
            {_years}
            {_themes}
            {_events}
          </g>
        </svg>
      </div>
    );
  }
}

render(<TimelineApp />, document.getElementById('content'));
