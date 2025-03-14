"use strict";
(self["webpackChunkdecision_making_tool"] = self["webpackChunkdecision_making_tool"] || []).push([["src_app_views_picker_picker-view_ts"],{

/***/ "./src/app/components/button-component.ts":
/*!************************************************!*\
  !*** ./src/app/components/button-component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ButtonComponent: () => (/* binding */ ButtonComponent)
/* harmony export */ });
/* harmony import */ var _utils_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");

class ButtonComponent extends _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
    constructor(props) {
        super(Object.assign({ tag: 'button' }, props));
        if (props.clickListener) {
            this.addListener('click', props.clickListener);
        }
    }
}


/***/ }),

/***/ "./src/app/components/canvas-component.ts":
/*!************************************************!*\
  !*** ./src/app/components/canvas-component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CanvasComponent: () => (/* binding */ CanvasComponent)
/* harmony export */ });
/* harmony import */ var _utils_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");

class CanvasComponent extends _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
    constructor(props) {
        super({ tag: 'canvas', classList: props.classList });
        this.el.width = 500;
        this.el.height = 500;
    }
}


/***/ }),

/***/ "./src/app/components/input.ts":
/*!*************************************!*\
  !*** ./src/app/components/input.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _utils_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");

class Input extends _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
    constructor(props) {
        var _a, _b;
        super({ tag: 'input', classList: props.classList });
        this.el.name = props.name;
        this.el.type = props.type;
        if (props.id)
            this.el.id = props.id;
        this.el.placeholder = (_a = props.placeholder) !== null && _a !== void 0 ? _a : '';
        this.el.value = (_b = props.value) !== null && _b !== void 0 ? _b : '';
        if (props.disabled)
            this.el.disabled = true;
    }
}


/***/ }),

/***/ "./src/app/state/state.ts":
/*!********************************!*\
  !*** ./src/app/state/state.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _utils_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/observable */ "./src/utils/observable.ts");

const defaultId = 1;
class State {
    constructor() {
        this.items = new _utils_observable__WEBPACK_IMPORTED_MODULE_0__.Observable([]);
        this.id = defaultId;
        this.loadFromLocalStorage();
        window.addEventListener('beforeunload', this.saveStateToLocalStorage.bind(this));
    }
    saveStateToLocalStorage() {
        localStorage.setItem('options', JSON.stringify(this.items.value));
        localStorage.setItem('lastId', this.id.toString());
    }
    loadFromLocalStorage() {
        const storageOptions = localStorage.getItem('options');
        console.log(storageOptions);
        const storageLastId = localStorage.getItem('lastId');
        if (storageOptions) {
            this.items.set(JSON.parse(storageOptions));
        }
        if (storageLastId) {
            this.id = Number(storageLastId);
        }
        console.log('AFTER LOAD', this.items);
    }
    create(item) {
        this.items.update((items) => [...items, Object.assign(Object.assign({}, item), { id: this.id++ })]);
    }
    delete(id) {
        this.items.update((items) => items.filter((item) => item.id !== id));
        if (this.items.value.length === 0) {
            this.id = defaultId;
        }
    }
    clear() {
        this.items.set([]);
        this.id = defaultId;
    }
}
const state = new State();


/***/ }),

/***/ "./src/app/views/picker/picker-view.ts":
/*!*********************************************!*\
  !*** ./src/app/views/picker/picker-view.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PickerView: () => (/* binding */ PickerView)
/* harmony export */ });
/* harmony import */ var _utils_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/base-component */ "./src/utils/base-component.ts");
/* harmony import */ var _components_canvas_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/canvas-component */ "./src/app/components/canvas-component.ts");
/* harmony import */ var _components_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/button-component */ "./src/app/components/button-component.ts");
/* harmony import */ var _state_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/state */ "./src/app/state/state.ts");
/* harmony import */ var _components_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/input */ "./src/app/components/input.ts");





class PickerView extends _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
    constructor() {
        super({ tag: 'div', classList: ['view'] });
        this.colors = [];
        this.el.innerHTML = '<h1>PICKER</h1>';
        this.isAnimationOn = false;
        this.interval = undefined;
        this.wheel = new _components_canvas_component__WEBPACK_IMPORTED_MODULE_1__.CanvasComponent({ classList: ['wheel'] });
        this.optionAngles = this.getOptionAngles();
        this.angle = 0;
        this.getColors();
        this.drawWheel();
        this.inputTime = new _components_input__WEBPACK_IMPORTED_MODULE_4__.Input({ type: 'text', classList: ['input'], name: 'time', placeholder: 'time' });
        this.inputCurrentOption = new _components_input__WEBPACK_IMPORTED_MODULE_4__.Input({ type: 'text', classList: ['input'], name: 'time', disabled: true });
        const btnStart = new _components_button_component__WEBPACK_IMPORTED_MODULE_2__.ButtonComponent({
            textContent: 'GO',
            classList: ['button'],
            clickListener: () => this.start(),
        });
        this.appendElements(this.inputTime, btnStart, this.inputCurrentOption);
        this.appendElements(this.wheel);
    }
    getSegmentAngle() {
        const options = _state_state__WEBPACK_IMPORTED_MODULE_3__.state.items.value;
        const totalWeight = options.reduce((acc, option) => acc + option.weight, 0);
        return (2 * Math.PI) / totalWeight;
    }
    getOptionAngles() {
        const options = _state_state__WEBPACK_IMPORTED_MODULE_3__.state.items.value;
        const totalWeight = options.reduce((acc, option) => acc + option.weight, 0);
        const angles = [];
        let lastAngle = 0;
        for (const option of options) {
            const angle = (360 / totalWeight) * option.weight + lastAngle;
            angles.push({
                title: option.title,
                angleFrom: lastAngle,
                angleTo: angle,
            });
            lastAngle = angle;
        }
        return angles;
    }
    getColors() {
        this.colors = [];
        for (let i = 0; i < _state_state__WEBPACK_IMPORTED_MODULE_3__.state.items.value.length; i++) {
            this.colors.push('#' +
                Math.trunc(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, '0'));
        }
    }
    start() {
        if (this.isAnimationOn)
            return;
        if (!this.inputTime.el.value)
            return;
        const time = Number(this.inputTime.el.value) * 1000;
        let speed = 0;
        const maxSpeed = 7;
        const accelTime = 500;
        const acceleration = maxSpeed / accelTime;
        let DECELERATION = false;
        this.interval = setInterval(() => {
            if (DECELERATION) {
                speed = speed > 0 ? (speed -= acceleration) : 0;
            }
            else {
                speed = speed < maxSpeed ? (speed += acceleration) : maxSpeed;
            }
            this.angle = (this.angle += speed) % 360;
            const currentOption = this.optionAngles.find((option) => this.angle >= option.angleFrom && this.angle < option.angleTo);
            if (currentOption)
                this.inputCurrentOption.el.value = currentOption.title;
        }, 2);
        this.isAnimationOn = true;
        window.requestAnimationFrame(this.drawWheel.bind(this));
        setTimeout(() => {
            DECELERATION = true;
        }, time - accelTime * 4);
        setTimeout(this.stop.bind(this), time);
    }
    stop() {
        this.isAnimationOn = false;
        clearInterval(this.interval);
    }
    drawWheel() {
        const segmentAngle = this.getSegmentAngle();
        const context = this.wheel.el.getContext('2d');
        if (!context)
            return;
        context.save();
        context.clearRect(0, 0, 500, 500);
        context.translate(250, 250);
        context.rotate(-Math.PI / 2); // Set normal axis direction - Y up X right
        context.rotate(-this.angle * (Math.PI / 180));
        // context.rotate(10 * (Math.PI / 180));
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.save();
        context.beginPath();
        context.lineWidth = 10;
        context.strokeStyle = '#325FA2';
        context.shadowColor = 'black';
        context.shadowBlur = 10;
        context.arc(0, 0, 190, 0, Math.PI * 2, true);
        context.stroke();
        context.restore();
        // sectors
        context.save();
        let i = 0;
        for (const option of _state_state__WEBPACK_IMPORTED_MODULE_3__.state.items.value) {
            context.beginPath();
            context.lineWidth = 4;
            context.fillStyle = this.colors[i];
            context.moveTo(0, 0);
            context.arc(0, 0, 194, 0, option.weight * segmentAngle);
            context.lineTo(0, 0);
            context.closePath();
            context.stroke();
            context.fill();
            context.rotate((option.weight * segmentAngle) / 2);
            context.fillStyle = '#000';
            context.font = '20px Orbitron, sans-serif';
            context.textBaseline = 'middle';
            context.fillText(option.title, 50, 0, 120);
            context.rotate((option.weight * segmentAngle) / 2);
            i++;
        }
        context.restore();
        // inner circle
        context.beginPath();
        context.lineWidth = 4;
        context.strokeStyle = '#D40000';
        context.fillStyle = '#D47000';
        context.arc(0, 0, 20, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
        // pointer
        context.save();
        context.rotate((this.angle - 90) * (Math.PI / 180));
        context.beginPath();
        context.lineWidth = 4;
        context.strokeStyle = 'red';
        context.moveTo(0, 210);
        context.lineTo(0, 180);
        context.stroke();
        context.restore();
        // ==============
        context.restore();
        if (this.isAnimationOn) {
            window.requestAnimationFrame(this.drawWheel.bind(this));
        }
    }
}


/***/ }),

/***/ "./src/utils/event-emitter.ts":
/*!************************************!*\
  !*** ./src/utils/event-emitter.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this.listeners = new Set();
    }
    emit(value) {
        for (const listener of this.listeners) {
            listener(value);
        }
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return this.unsubscribe.bind(this, listener);
    }
    unsubscribe(callback) {
        this.listeners.delete(callback);
    }
}


/***/ }),

/***/ "./src/utils/observable.ts":
/*!*********************************!*\
  !*** ./src/utils/observable.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observable: () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-emitter */ "./src/utils/event-emitter.ts");

class Observable extends _event_emitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
    constructor(_value) {
        super();
        this._value = _value;
    }
    get value() {
        return this._value;
    }
    set(value) {
        this._value = value;
        this.emit(this._value);
    }
    update(callback) {
        this._value = callback(this._value);
        this.emit(this._value);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_app_views_picker_picker-view_ts.index.js.map