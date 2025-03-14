/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const base_component_1 = __webpack_require__(/*! ../utils/base-component */ "./src/utils/base-component.ts");
const router_1 = __webpack_require__(/*! ./router/router */ "./src/app/router/router.ts");
class App extends base_component_1.BaseComponent {
    constructor() {
        super({ tag: 'div', classList: ['app'] });
        this.router = new router_1.Router(this);
        this.pageTitle = new base_component_1.BaseComponent({ tag: 'h1', classList: ['app__title'], textContent: 'Decision-Making Tool' });
        this.appendElements(this.pageTitle);
        document.body.replaceChildren(this.el);
    }
}
exports.App = App;


/***/ }),

/***/ "./src/app/components/button-component.ts":
/*!************************************************!*\
  !*** ./src/app/components/button-component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonComponent = void 0;
const base_component_1 = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");
class ButtonComponent extends base_component_1.BaseComponent {
    constructor(props) {
        super(Object.assign({ tag: 'button' }, props));
        if (props.clickListener) {
            this.addListener('click', props.clickListener);
        }
    }
}
exports.ButtonComponent = ButtonComponent;


/***/ }),

/***/ "./src/app/components/canvas-component.ts":
/*!************************************************!*\
  !*** ./src/app/components/canvas-component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CanvasComponent = void 0;
const base_component_1 = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");
class CanvasComponent extends base_component_1.BaseComponent {
    constructor(props) {
        super({ tag: 'canvas', classList: props.classList });
        this.el.width = 500;
        this.el.height = 500;
    }
}
exports.CanvasComponent = CanvasComponent;


/***/ }),

/***/ "./src/app/components/input.ts":
/*!*************************************!*\
  !*** ./src/app/components/input.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = void 0;
const base_component_1 = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");
class Input extends base_component_1.BaseComponent {
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
exports.Input = Input;


/***/ }),

/***/ "./src/app/components/option-component.ts":
/*!************************************************!*\
  !*** ./src/app/components/option-component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OptionComponent = void 0;
const base_component_1 = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");
const input_1 = __webpack_require__(/*! ./input */ "./src/app/components/input.ts");
const button_component_1 = __webpack_require__(/*! ./button-component */ "./src/app/components/button-component.ts");
const event_emitter_1 = __webpack_require__(/*! ../../utils/event-emitter */ "./src/utils/event-emitter.ts");
class OptionComponent extends base_component_1.BaseComponent {
    constructor(stateItem) {
        super({ tag: 'div', classList: ['option'] });
        this.deleteEmitter = new event_emitter_1.EventEmitter();
        this._label = new base_component_1.BaseComponent({ tag: 'label', textContent: `#${stateItem.id}` });
        this._inputTitle = new input_1.Input({
            classList: ['input', 'option__input', 'option__input_title'],
            name: 'test',
            id: `input-${stateItem.id}`,
            placeholder: 'Title',
            type: 'text',
            value: stateItem.title,
        });
        this._inputTitle.addListener('change', () => (stateItem.title = this._inputTitle.el.value));
        this._inputWeight = new input_1.Input({
            classList: ['input', 'option__input', 'option__input_weight'],
            name: 'test',
            placeholder: 'Weight',
            type: 'number',
            value: stateItem.weight ? stateItem.weight.toString() : '',
        });
        this._inputWeight.addListener('change', () => (stateItem.weight = +this._inputWeight.el.value));
        const buttonDelete = new button_component_1.ButtonComponent({
            classList: ['button', 'button_delete'],
            textContent: 'Delete',
            clickListener: () => this.deleteEmitter.emit(stateItem.id),
        });
        this.appendElements(this._label, this._inputTitle, this._inputWeight, buttonDelete);
    }
}
exports.OptionComponent = OptionComponent;


/***/ }),

/***/ "./src/app/router/router.ts":
/*!**********************************!*\
  !*** ./src/app/router/router.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Router = void 0;
class Router {
    constructor(container) {
        this.ROUTES = [
            {
                path: '/',
                view: () => Promise.resolve().then(() => __importStar(__webpack_require__(/*! ../views/index/index-view */ "./src/app/views/index/index-view.ts"))).then((view) => new view.IndexView()),
            },
            {
                path: '/picker',
                view: () => Promise.resolve().then(() => __importStar(__webpack_require__(/*! ../views/picker/picker-view */ "./src/app/views/picker/picker-view.ts"))).then((view) => new view.PickerView()),
            },
        ];
        this.container = container;
        const path = window.location.pathname;
        window.addEventListener('popstate', () => {
            this.renderView(window.location.pathname);
        });
        this.renderView(path);
    }
    navigate(path) {
        window.history.pushState(undefined, '', path);
        this.renderView(path);
    }
    renderView(path) {
        const route = this.ROUTES.find((r) => r.path === path);
        if (route) {
            this.container.deleteAllChildren();
            route
                .view()
                .then((view) => this.container.appendElements(view))
                .catch((error) => console.log(error.message));
        }
    }
}
exports.Router = Router;


/***/ }),

/***/ "./src/app/state/state.ts":
/*!********************************!*\
  !*** ./src/app/state/state.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.state = void 0;
const observable_1 = __webpack_require__(/*! ../../utils/observable */ "./src/utils/observable.ts");
const defaultId = 1;
class State {
    constructor() {
        this.items = new observable_1.Observable([]);
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
exports.state = new State();


/***/ }),

/***/ "./src/app/views/index/index-view.ts":
/*!*******************************************!*\
  !*** ./src/app/views/index/index-view.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndexView = void 0;
const base_component_1 = __webpack_require__(/*! ../../../utils/base-component */ "./src/utils/base-component.ts");
const button_component_1 = __webpack_require__(/*! ../../components/button-component */ "./src/app/components/button-component.ts");
const option_component_1 = __webpack_require__(/*! ../../components/option-component */ "./src/app/components/option-component.ts");
const state_1 = __webpack_require__(/*! ../../state/state */ "./src/app/state/state.ts");
const index_1 = __webpack_require__(/*! ../../../index */ "./src/index.ts");
class IndexView extends base_component_1.BaseComponent {
    constructor() {
        super({ tag: 'div', classList: ['view'] });
        this.state = state_1.state;
        // ----- Options -----
        this.optionsContainer = new base_component_1.BaseComponent({ tag: 'div', classList: ['container', 'options-container'] });
        const testOption = new option_component_1.OptionComponent({ id: 3 }); //ToDO remove
        this.optionsContainer.appendElements(testOption);
        this.renderOptions(this.state.items.value);
        this.state.items.subscribe((items) => this.renderOptions(items));
        // ----- Buttons -----
        const buttonsContainer = new base_component_1.BaseComponent({ tag: 'div', classList: ['container', 'buttons-container'] });
        const buttonAdd = new button_component_1.ButtonComponent({
            classList: ['button', 'button_100'],
            textContent: 'Add option',
            clickListener: () => this.createItem(),
        });
        const buttonPaste = new button_component_1.ButtonComponent({ classList: ['button', 'button_100'], textContent: 'Paste list' });
        const buttonClear = new button_component_1.ButtonComponent({
            classList: ['button', 'button_100'],
            textContent: 'Clear list',
            clickListener: () => this.clearOptions(),
        });
        const buttonSave = new button_component_1.ButtonComponent({
            classList: ['button', 'button_adaptive'],
            textContent: 'Save list to file',
        });
        const buttonLoad = new button_component_1.ButtonComponent({
            classList: ['button', 'button_adaptive'],
            textContent: 'Load list from file',
        });
        const buttonStart = new button_component_1.ButtonComponent({
            classList: ['button', 'button_100'],
            textContent: 'Start',
            clickListener: () => {
                if (this.validateOptions()) {
                    index_1.app.router.navigate('/picker');
                }
            },
        });
        buttonsContainer.appendElements(buttonAdd, buttonPaste, buttonClear, buttonSave, buttonLoad, buttonStart);
        this.appendElements(this.optionsContainer, buttonsContainer);
    }
    createItem() {
        this.state.create({ title: '', weight: 0 });
        console.log(this.state.items);
    }
    clearOptions() {
        this.state.clear();
    }
    validateOptions() {
        if (this.state.items.value.length === 0) {
            console.log('Empty list!');
            return false;
        }
        for (const option of this.state.items.value) {
            if (!option.title || !option.weight) {
                console.log('empty title or weight');
                return false;
            }
        }
        return true;
    }
    renderOptions(options) {
        this.optionsContainer.deleteAllChildren();
        for (const option of options) {
            const optionComponent = new option_component_1.OptionComponent(option);
            this.optionsContainer.appendElements(optionComponent);
            optionComponent.deleteEmitter.subscribe(() => this.state.delete(option.id));
        }
    }
}
exports.IndexView = IndexView;


/***/ }),

/***/ "./src/app/views/picker/picker-view.ts":
/*!*********************************************!*\
  !*** ./src/app/views/picker/picker-view.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickerView = void 0;
const base_component_1 = __webpack_require__(/*! ../../../utils/base-component */ "./src/utils/base-component.ts");
const canvas_component_1 = __webpack_require__(/*! ../../components/canvas-component */ "./src/app/components/canvas-component.ts");
const button_component_1 = __webpack_require__(/*! ../../components/button-component */ "./src/app/components/button-component.ts");
const state_1 = __webpack_require__(/*! ../../state/state */ "./src/app/state/state.ts");
const input_1 = __webpack_require__(/*! ../../components/input */ "./src/app/components/input.ts");
class PickerView extends base_component_1.BaseComponent {
    constructor() {
        super({ tag: 'div', classList: ['view'] });
        this.colors = [];
        this.el.innerHTML = '<h1>PICKER</h1>';
        this.isAnimationOn = false;
        this.interval = undefined;
        this.wheel = new canvas_component_1.CanvasComponent({ classList: ['wheel'] });
        this.optionAngles = this.getOptionAngles();
        this.angle = 0;
        this.getColors();
        this.drawWheel();
        this.inputTime = new input_1.Input({ type: 'text', classList: ['input'], name: 'time', placeholder: 'time' });
        this.inputCurrentOption = new input_1.Input({ type: 'text', classList: ['input'], name: 'time', disabled: true });
        const btnStart = new button_component_1.ButtonComponent({
            textContent: 'GO',
            classList: ['button'],
            clickListener: () => this.start(),
        });
        this.appendElements(this.inputTime, btnStart, this.inputCurrentOption);
        this.appendElements(this.wheel);
    }
    getSegmentAngle() {
        const options = state_1.state.items.value;
        const totalWeight = options.reduce((acc, option) => acc + option.weight, 0);
        return (2 * Math.PI) / totalWeight;
    }
    getOptionAngles() {
        const options = state_1.state.items.value;
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
        for (let i = 0; i < state_1.state.items.value.length; i++) {
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
        for (const option of state_1.state.items.value) {
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
exports.PickerView = PickerView;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app = void 0;
__webpack_require__(/*! ./sass/main.scss */ "./src/sass/main.scss");
const app_1 = __webpack_require__(/*! ./app/app */ "./src/app/app.ts");
exports.app = new app_1.App();


/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/utils/base-component.ts":
/*!*************************************!*\
  !*** ./src/utils/base-component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
class BaseComponent {
    constructor(props) {
        this._element = document.createElement(props.tag);
        if (props.classList) {
            this._element.classList.add(...props.classList);
        }
        if (props.textContent) {
            this._element.textContent = props.textContent;
        }
        this._children = [];
    }
    get el() {
        return this._element;
    }
    addListener(event, callback) {
        this._element.addEventListener(event, callback);
    }
    appendElements(...children) {
        for (const child of children) {
            this._element.append(child.el);
            this._children.push(child);
        }
    }
    delete() {
        for (const child of this._children) {
            child.delete();
        }
        this._element.remove();
    }
    deleteAllChildren() {
        for (const child of this._children) {
            child.delete();
        }
    }
}
exports.BaseComponent = BaseComponent;


/***/ }),

/***/ "./src/utils/event-emitter.ts":
/*!************************************!*\
  !*** ./src/utils/event-emitter.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitter = void 0;
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
exports.EventEmitter = EventEmitter;


/***/ }),

/***/ "./src/utils/observable.ts":
/*!*********************************!*\
  !*** ./src/utils/observable.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Observable = void 0;
const event_emitter_1 = __webpack_require__(/*! ./event-emitter */ "./src/utils/event-emitter.ts");
class Observable extends event_emitter_1.EventEmitter {
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
exports.Observable = Observable;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map