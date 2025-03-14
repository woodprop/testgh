"use strict";
(self["webpackChunkdecision_making_tool"] = self["webpackChunkdecision_making_tool"] || []).push([["src_app_views_index_index-view_ts"],{

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

/***/ "./src/app/components/option-component.ts":
/*!************************************************!*\
  !*** ./src/app/components/option-component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptionComponent: () => (/* binding */ OptionComponent)
/* harmony export */ });
/* harmony import */ var _utils_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/base-component */ "./src/utils/base-component.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input */ "./src/app/components/input.ts");
/* harmony import */ var _button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button-component */ "./src/app/components/button-component.ts");
/* harmony import */ var _utils_event_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/event-emitter */ "./src/utils/event-emitter.ts");




class OptionComponent extends _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
    constructor(stateItem) {
        super({ tag: 'div', classList: ['option'] });
        this.deleteEmitter = new _utils_event_emitter__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this._label = new _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent({ tag: 'label', textContent: `#${stateItem.id}` });
        this._inputTitle = new _input__WEBPACK_IMPORTED_MODULE_1__.Input({
            classList: ['input', 'option__input', 'option__input_title'],
            name: 'test',
            id: `input-${stateItem.id}`,
            placeholder: 'Title',
            type: 'text',
            value: stateItem.title,
        });
        this._inputTitle.addListener('change', () => (stateItem.title = this._inputTitle.el.value));
        this._inputWeight = new _input__WEBPACK_IMPORTED_MODULE_1__.Input({
            classList: ['input', 'option__input', 'option__input_weight'],
            name: 'test',
            placeholder: 'Weight',
            type: 'number',
            value: stateItem.weight ? stateItem.weight.toString() : '',
        });
        this._inputWeight.addListener('change', () => (stateItem.weight = +this._inputWeight.el.value));
        const buttonDelete = new _button_component__WEBPACK_IMPORTED_MODULE_2__.ButtonComponent({
            classList: ['button', 'button_delete'],
            textContent: 'Delete',
            clickListener: () => this.deleteEmitter.emit(stateItem.id),
        });
        this.appendElements(this._label, this._inputTitle, this._inputWeight, buttonDelete);
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

/***/ "./src/app/views/index/index-view.ts":
/*!*******************************************!*\
  !*** ./src/app/views/index/index-view.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexView: () => (/* binding */ IndexView)
/* harmony export */ });
/* harmony import */ var _utils_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/base-component */ "./src/utils/base-component.ts");
/* harmony import */ var _components_button_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/button-component */ "./src/app/components/button-component.ts");
/* harmony import */ var _components_option_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/option-component */ "./src/app/components/option-component.ts");
/* harmony import */ var _state_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/state */ "./src/app/state/state.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../index */ "./src/index.ts");





class IndexView extends _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent {
    constructor() {
        super({ tag: 'div', classList: ['view'] });
        this.state = _state_state__WEBPACK_IMPORTED_MODULE_3__.state;
        // ----- Options -----
        this.optionsContainer = new _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent({ tag: 'div', classList: ['container', 'options-container'] });
        const testOption = new _components_option_component__WEBPACK_IMPORTED_MODULE_2__.OptionComponent({ id: 3 }); //ToDO remove
        this.optionsContainer.appendElements(testOption);
        this.renderOptions(this.state.items.value);
        this.state.items.subscribe((items) => this.renderOptions(items));
        // ----- Buttons -----
        const buttonsContainer = new _utils_base_component__WEBPACK_IMPORTED_MODULE_0__.BaseComponent({ tag: 'div', classList: ['container', 'buttons-container'] });
        const buttonAdd = new _components_button_component__WEBPACK_IMPORTED_MODULE_1__.ButtonComponent({
            classList: ['button', 'button_100'],
            textContent: 'Add option',
            clickListener: () => this.createItem(),
        });
        const buttonPaste = new _components_button_component__WEBPACK_IMPORTED_MODULE_1__.ButtonComponent({ classList: ['button', 'button_100'], textContent: 'Paste list' });
        const buttonClear = new _components_button_component__WEBPACK_IMPORTED_MODULE_1__.ButtonComponent({
            classList: ['button', 'button_100'],
            textContent: 'Clear list',
            clickListener: () => this.clearOptions(),
        });
        const buttonSave = new _components_button_component__WEBPACK_IMPORTED_MODULE_1__.ButtonComponent({
            classList: ['button', 'button_adaptive'],
            textContent: 'Save list to file',
        });
        const buttonLoad = new _components_button_component__WEBPACK_IMPORTED_MODULE_1__.ButtonComponent({
            classList: ['button', 'button_adaptive'],
            textContent: 'Load list from file',
        });
        const buttonStart = new _components_button_component__WEBPACK_IMPORTED_MODULE_1__.ButtonComponent({
            classList: ['button', 'button_100'],
            textContent: 'Start',
            clickListener: () => {
                if (this.validateOptions()) {
                    _index__WEBPACK_IMPORTED_MODULE_4__.app.router.navigate('/picker');
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
            const optionComponent = new _components_option_component__WEBPACK_IMPORTED_MODULE_2__.OptionComponent(option);
            this.optionsContainer.appendElements(optionComponent);
            optionComponent.deleteEmitter.subscribe(() => this.state.delete(option.id));
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
//# sourceMappingURL=src_app_views_index_index-view_ts.index.js.map