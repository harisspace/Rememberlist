# timepicker-ui

<a href="https://npmcharts.com/compare/timepicker-ui?minimal=true"><img src="https://img.shields.io/npm/dw/timepicker-ui" alt="downloads"></a>
[![npm version](https://badge.fury.io/js/timepicker-ui.svg)](https://badge.fury.io/js/timepicker-ui)
<a href="https://img.shields.io/npm/l/timepicker-ui"><img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License"></a>

timepicker-ui is an easy library with timepicker. Fully wrote with TypeScript. This library is based on Material Design from Google.

- Free
- Easy to use
- Easy to customize

[Click here to see a demo and examples](https://q448x.github.io/timepicker-ui-docs/)

---

### Desktop version

  <img src="https://i.ibb.co/VgR1Kn0/image.png" alt="desktop-version">

---

### Landspace version

<img src="https://i.ibb.co/vYfmrc0/image.png" alt="desktop-version">

---

### Mobile version

  <img src="https://i.ibb.co/BZ0Vnyb/image.png" alt="mobile-version">

### Themes

There is two available version of theme ( radius and straight). Examples show radius version.

#### Desktop

  <img src="https://i.ibb.co/xh2rYN7/image.png" alt="desktop-crane-radius-version">

#### Landspace

  <img src="https://i.ibb.co/KVWRKkk/image.png" alt="desktop-crane-radius-version-mobile">

#### Mobile

  <img src="https://i.ibb.co/TYSML75/image.png" alt="desktop-crane-radius-version-mobile">

---

### Installation

Install timepicker-ui in your project.

#### Yarn

```bash
$ yarn add timepicker-ui
```

#### NPM

```bash
$ npm install timepicker-ui
```

This library is using [font Roboto](https://fonts.google.com/specimen/Roboto) and [material-design icons](https://google.github.io/material-design-icons/). Basic options for all icons have been taken from material-icons. If you want to use material-icons you have to add dependencies to your project.

You can alawys change icons to another package if you change options <code>iconClass</code> and <code>iconClassMobile</code> which contains templates for icons. <code>iconClass</code> and <code>iconClassMobile</code> requiare default class <code>timepicker-ui-keyboard-icon</code>.

---

### Usage

#### ES Modules

In your project you have to import timepicker from package to your JavaScript file.

```javascript
import { TimepickerUI } from "timepicker-ui";
```

#### UMD

In your html file you have put script tag with path to `timepicker-ui.js` file. After installing by npm/yarn you can copy the file from node_modules or add a path to this file.

```html
<script src="timepicker-ui.js"></script>
<script src="node_modules/path/timepicker-ui.js"></script>
<script src="/path/timepicker-ui.js"></script>
```

###### Information

timepicker-ui has to have a wrapper that has an input inside this wrapper. If you will not add class `timepicker-ui` to your wrapper, it will be automatically added during initialization.

#### HTML

```html
<div class="timepicker-ui">
  <input type="text" class="timepicker-ui-input" value="12:00 AM" />
</div>
```

---

timepicker-ui has to be created with a new instance with key `new`. This instance accepts two parameters which first is the wrapper element for timepicker and the second is options that allow customization.

#### JavaScript

```javascript
const DOMElement = document.querySelector(".timepicker-ui");
const options = {};
const newTimepicker = new TimepickerUI(DOMElement, options);
```

By default initialization of timepicker is started when you click on input. If you want to change it you have to add `data-open` attribute with selector inside and this element has to be inside wrapper.

#### HTML

```html
<div class="default-class">
  <input type="text" class="timepicker-ui-input" value="12:00 AM" />
  <button class="timepicker-ui-button" data-open="default-class">Open</button>
</div>
```

#### JavaScript

```javascript
const timepicker = document.querySelector(".default-class");
const initTimepicker = new TimepickerUI(timepicker);

timepicker.create();
```

---

### Options

You can set options by JavaScript or by data-attribute which `attribute` is a key option. Data-attributes will be overridden by JavaScript options.

#### HTML

```html
<div
  class="default-class"
  data-am-label="test"
  data-backdrop="false"
  data-ok-label="fine"
>
  <input type="text" class="timepicker-ui-input" value="12:00 AM" />
  <button class="timepicker-ui-button" data-open="default-class">Open</button>
</div>
```

#### JavaScript

```javascript
const timepicker = document.querySelector(".default-class");
const options = { okLabel: "test", amLabel: "test1", backdrop: false };
const initTimepicker = new TimepickerUI(timepicker, options);

timepicker.create();
```

---

## React integration

It is possible to use this library on the React application. It's necessary to use the useRef hook to attach a dom element and add a custom event handler to this ref.

Link to an example with [React Hooks](https://codesandbox.io/s/modest-swanson-xqzme). <br/>
Link to an example with [React Class Component](https://codesandbox.io/s/vigilant-knuth-cx0yv).

```javascript
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TimepickerUI } from 'timepicker-ui';

function App(): JSX.Element {
  const tmRef = useRef(null);
  const [inputValue, setInputValue] = useState('12:00 PM');

  const testHandler = useCallback((e: CustomEvent) => {
    setInputValue(`${e.detail.hour}:${e.detail.minutes} ${e.detail.type}`);
  }, []);

  useEffect(() => {
    if (inputValue === "10:00 PM") {
      alert("You selected 10:00 PM");
    }
  }, [inputValue]);

  useEffect(() => {
    const tm = (tmRef.current as unknown) as HTMLDivElement;

    const newPicker = new TimepickerUI(tm, {});
    newPicker.create();

    //@ts-ignore
    tm.addEventListener('accept', testHandler);

    return () => {
      //@ts-ignore
      tm.removeEventListener('accept', testHandler);
    };
  }, [testHandler]);

  return (
    <div className='timepicker-ui' ref={tmRef}>
      <input
        type='test'
        className='timepicker-ui-input'
        defaultValue={inputValue}
      />
    </div>
  );
}

export default App;
```

---

### Vue integration

This library can be used on Vue too. You have to use this.$refs to attach elements on DOM and add a custom event listener to this element.

Link to an example with [Vue 2](https://codesandbox.io/s/ancient-http-59o3w)<br/>
Link to an example with [Vue 3](https://codesandbox.io/s/falling-resonance-s96g6)

```javascript
<template>
  <div class="hello">
    <div class="timepicker-ui" ref="tm">
      <input v-model="inputValue" type="text" class="timepicker-ui-input" />
    </div>
    {{ inputValue }}
  </div>
</template>

<script>
import { TimepickerUI } from "timepicker-ui";

export default {
  name: "HelloWorld",
  data() {
    return {
      inputValue: "10:10 PM",
    };
  },
  mounted() {
    const test = new TimepickerUI(this.$refs.tm, { enableSwitchIcon: true });
    test.create();

    this.$refs.tm.addEventListener("accept", ({ detail }) => {
      this.inputValue = `${detail.hour}:${detail.minutes} ${detail.type}`;
    });
  },
};
</script>
```

---

#### Table with options

<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Default</th>
      <th scope="col">Type</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">animated</td>
      <td>true</td>
      <td>boolean</td>
      <td>Turn on/off animations on picker on start/close</td>
    </tr>
    <tr>
      <td scope="row">amLabel</td>
      <td>AM</td>
      <td>string</td>
      <td>Set custom text to am label</td>
    </tr>
    <tr>
      <td scope="row">appendModalSelector</td>
      <td>''</td>
      <td>string</td>
      <td>Set default selector to append timepicker inside it. Timepicker default append to body</td>
    </tr>
    <tr>
      <td scope="row">backdrop</td>
      <td>true</td>
      <td>boolean</td>
      <td>Turn on/off backdrop</td>
    </tr>
    <tr>
      <td scope="row">cancelLabel</td>
      <td>CANCEL</td>
      <td>string</td>
      <td>Set custom text to cancel button</td>
    </tr> 
    <tr>
      <td scope="row">editable</td>
      <td>false</td>
      <td>boolean</td>
      <td>Edit hour/minutes on the web mode. You have set option <code>preventDefault</code> to false.</td>
    </tr> 
      <tr>
      <td scope="row">enableScrollbar</td>
      <td>false</td>
      <td>boolean</td>
      <td>Turn on/off scroll if timepicker is open</td>
    </tr> 
   <tr>
      <td scope="row">enableSwitchIcon</td>
      <td>false</td>
      <td>boolean</td>
      <td>Turn on/off icon to switch desktop/mobile</td>
    </tr> 
    <tr>
      <td scope="row">focusInputAfterCloseModal</td>
      <td>false</td>
      <td>boolean</td>
      <td>Turn on/off focus to input after close modal</td>
    </tr> 
      <tr>
      <td scope="row">hourMobileLabel</td>
      <td>Hour</td>
      <td>string</td>
      <td>Set custom text to hour label on mobile version</td>
    </tr> 
    <tr>
      <td scope="row">incrementHours</td>
      <td>1</td>
      <td>nubmer</td>
      <td>Increment hour by 1, 2, 3 hour</td>
    </tr>  
     <tr>
      <td scope="row">incrementMinutes</td>
      <td>1</td>
      <td>nubmer</td>
      <td>Increment minutes by 1, 5, 10, 15 minutes</td>
    </tr>   
     <tr>
      <td scope="row">minuteMobileLabel</td>
      <td>Minute</td>
      <td>string</td>
      <td>Set custom text to minute label on mobile version</td>
    </tr>  
     <tr>
      <td scope="row">mobile</td>
      <td>false</td>
      <td>boolean</td>
      <td>Turn on mobile version</td>
    </tr>  
     <tr>
      <td scope="row">okLabel</td>
      <td>OK</td>
      <td>string</td>
      <td>Set custom text to ok label</td>
    </tr> 
      <tr>
      <td scope="row">pmLabel</td>
      <td>PM</td>
      <td>string</td>
      <td>Set custom text to pm label</td>
    </tr>  
    <tr>
      <td scope="row">preventDefault</td>
      <td>true</td>
      <td>boolean</td>
      <td>Turn on/off defaults events to clock face events</td>
    </tr> 
     <tr>
      <td scope="row">selectTimeLabel</td>
      <td>Select Time</td>
      <td>string</td>
      <td>Set custom text to select time label on desktop version</td>
    </tr>   
    <tr>
      <td scope="row">switchToMinutesAfterSelectHour</td>
      <td>true</td>
      <td>boolean</td>
      <td>Turn on/off switch to minutes by select hour</td>
    </tr>   
    <tr>
      <td scope="row">iconClass</td>
       <td>
       &lt;i class="material-icons timepicker-ui-keyboard-icon"> keyboard &lt;/i&gt;
      </td>
       <td>string</td>
      <td>Set default template to switch desktop.This options is using by default material design icon</td>
    </tr>  
     <tr>
      <td scope="row">iconClassMobile</td>
      <td>&lt;i class="material-icons timepicker-ui-keyboard-icon"> schedule  &lt;/i&gt;</td>
      <td>string</td>
      <td>Set default template to switch mobile. This options is using by default material design icon</td>
    </tr> 
   <tr>
      <td 
      scope="row">theme</td>
      <td>basic</td>
      <td>string</td>
      <td>Set theme to timpicker. Available options: basic, crane-straight, crane-radius</td>
    </tr>  
  </tbody>
</table>

---

### Methods

Methods are custom function what can be used to manually change the behavior of timepicker.

#### HTML

```HTML
<div class="timepicker-ui-test">
  <input type="text" class="timepicker-ui-input" value="12:00 AM">
</div>
```

#### JavaScript

```javascript
const timepicker = document.querySelector("timepicker-ui-test");
const init = new TimepickerUI(timepicker);

timepicker.create();
```

#### Table with methods

<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
   <tr>
      <td scope="row">create</td>
      <td>The create method init timepicker</td>
    </tr>
    <tr>
      <td scope="row">open</td>
      <td>The open method opens immediately timepicker after init</td>
    </tr>
    <tr>
      <td scope="row">close</td>
        <td>Closure method closes the timepicker</td>
    </tr>
  </tbody>
</table>

---

### Events

Events are custom events triggered when you add some event listeners to your timepicker element. If you want to have a property timepicker/input values you have to use <code>detail</code> to the event object.

#### HTML

```HTML
<div class="timepicker-ui-test">
  <input type="text" class="timepicker-ui-input" value="12:00 AM">
</div>
```

#### JavaScript

```javascript
const timepicker = document.querySelector("timepicker-ui-test");
const init = new TimepickerUI(timepicker);

timepicker.create();

timepicker.addEventListener("show", (event) => console.log(event.detail));
```

#### Table with events

<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">show</td>
      <td>The event starts if timepicker is showing up</td>
    </tr>
    <tr>
      <td scope="row">cancel</td>
      <td>The event starts if timepicker is closing</td>
    </tr>
    <tr>
      <td scope="row">accept</td>
      <td>The event starts if timepicker button OK is accepted</td>
    </tr>
       <tr>
      <td scope="row">update</td>
      <td>The event starts if mouse/touch events are triggered on a clock face (multiple events)</td>
    </tr> 
      <tr>
      <td scope="row">selectminutemode</td>
      <td>The event starts if timepicker minute box is clicked</td>
    </tr> 
   <tr>
      <td scope="row">selecthourmode</td>
      <td>The event starts if timepicker hour box is clicked</td>
    </tr> 
      <tr>
      <td scope="row">selectamtypemode</td>
      <td>The event starts if timepicker am box is clicked</td>
    </tr> 
      <tr>
      <td scope="row">selectpmtypemode</td>
      <td>The event starts if timepicker pm box is clicked</td>
    </tr>  
  </tbody>
</table>
    
___

### Future Plans

- validation
- keyboard accesibilty
- max/min time options
- 24h time mode clock face

If you have more good ideas please let me know in [issue](https://github.com/q448x/timepicker-ui/issues). I will try to add more useful features. This project is still develop, if you find some bugs please report on the [issue](https://github.com/q448x/timepicker-ui/issues) page.

---

### License

MIT
