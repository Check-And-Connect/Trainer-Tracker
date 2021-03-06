'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    font-size: 1em;\n    font-weight: 300;\n    line-height: 1.5;\n    letter-spacing: 0.05em;\n    * {\n      box-sizing: border-box;\n  \n      margin: 0;\n      padding: 0;\n      border: 0;\n      font-size: 100%;\n      font: inherit;\n      vertical-align: baseline;\n    }\n    p {\n      font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    }\n  '], ['\n    font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    font-size: 1em;\n    font-weight: 300;\n    line-height: 1.5;\n    letter-spacing: 0.05em;\n    * {\n      box-sizing: border-box;\n  \n      margin: 0;\n      padding: 0;\n      border: 0;\n      font-size: 100%;\n      font: inherit;\n      vertical-align: baseline;\n    }\n    p {\n      font-family: \'Open Sans\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n    }\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    position: relative;\n    max-width: 46em;\n    list-style: none;\n    &:before {\n      background-color: #2D70C6;\n      content: \'\';\n      margin-left: -1px;\n      position: absolute;\n      top: 0;\n      left: 2em;\n      width: 2px;\n      height: 100%;\n    }\n  '], ['\n    position: relative;\n    max-width: 46em;\n    list-style: none;\n    &:before {\n      background-color: #2D70C6;\n      content: \'\';\n      margin-left: -1px;\n      position: absolute;\n      top: 0;\n      left: 2em;\n      width: 2px;\n      height: 100%;\n    }\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    position: relative;\n  '], ['\n    position: relative;\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    transform: rotate(45deg);\n    background-color: #F4C256;\n    outline: 10px solid white;\n    display: block;\n    margin: 0.5em 0.5em 0.5em -0.5em;\n    position: absolute;\n    top: 0;\n    left: 2em;\n    width: 1em;\n    height: 1em;\n  '], ['\n    transform: rotate(45deg);\n    background-color: #2D70C6;\n    outline: 10px solid white;\n    display: block;\n    margin: 0.5em 0.5em 0.5em -0.5em;\n    position: absolute;\n    top: 0;\n    left: 2em;\n    width: 1em;\n    height: 1em;\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    padding: 2em 2em 0 2em;\n    position: relative;\n    top: -1.875em;\n    left: 4em;\n    width: 80%;\n    h3 {\n      font-size: 1.75em;\n    }\n    h4 {\n      font-size: 1.2em;\n      margin-bottom: 1.2em;\n    }\n  '], ['\n    padding: 2em 2em 0 2em;\n    position: relative;\n    top: -1.875em;\n    left: 4em;\n    width: 80%;\n    h3 {\n      font-size: 1.75em;\n    }\n    h4 {\n      font-size: 1.2em;\n      margin-bottom: 1.2em;\n    }\n  ']),
    _templateObject6 = _taggedTemplateLiteral(['\n    color: white;\n    background-color: #2D70C6;\n    box-shadow: inset 0 0 0 0em #ef795a;\n    display: inline-block;\n    margin-bottom: 1.2em;\n    padding: 0.25em 1em 0.2em 1em;\n  '], ['\n    color: white;\n    background-color: #2D70C6;\n    box-shadow: inset 0 0 0 0em #ef795a;\n    display: inline-block;\n    margin-bottom: 1.2em;\n    padding: 0.25em 1em 0.2em 1em;\n  ']),
    _templateObject7 = _taggedTemplateLiteral(['\n    strong {\n      font-weight: 700;\n    }\n    p {\n      padding-bottom: 1.2em;\n    }\n  '], ['\n    strong {\n      font-weight: 700;\n    }\n    p {\n      padding-bottom: 1.2em;\n    }\n  ']);

var _emotion = require('emotion');

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = {
  container: (0, _emotion.css)(_templateObject),
  timeline: (0, _emotion.css)(_templateObject2),
  event: (0, _emotion.css)(_templateObject3),
  icon: (0, _emotion.css)(_templateObject4),
  body: (0, _emotion.css)(_templateObject5),
  date: (0, _emotion.css)(_templateObject6),
  description: (0, _emotion.css)(_templateObject7)
};