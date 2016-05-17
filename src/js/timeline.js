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

//Tetrad #4 255,79,0
export default {
  themes: [{
    name: "School",
    color: [255,149,0],//Tetrad #3
    events: [{
      name: "Start CSU",
      date: new Date('2005-01-28')
    }, {
      name: "B.S. EE",
      date: new Date('2010-12-08')
    }, {
      name: "B.S. CS",
      date: new Date('2012-12-08')
    }]
  }, {
    name: "Army",
    color: [0,172,107],//Tetrad #1
    events: [{
      name: "Enlist",
      date: new Date('2003-08-17')
    }, {
      name: "Basic",
      date: new Date('2004-06-23')
    }, {
      name: 'Deploy Iraq',
      date: new Date('2004-10-23')
    }, {
      name: 'Deploy Afgn',
      date: new Date('2011-02-04')
    }, {
      name: 'Honorable Discharge',
      date: new Date('2012-08-17')
    }]
  }, {
    name: "HPE",
    color: [12,93,165],//Tetrad #2
    events: [{
      name: "Intern",
      date: new Date('2008-05-23')
    }, {
      name: "Intermediate",
      date: new Date('2012-07-23')
    }, {
      name: 'Current',
      date: new Date()
    }]
  }],
  events: [{
    name: "Cert SA",
    theme: "HPE",
    date: new Date('2016-05-24')
  }, {
    name: "Honor Grad",
    theme: "Army",
    date: new Date('2012-02-28')
  }]
};
