"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlComponent = void 0;
const core_1 = require("@angular/core");
exports.ControlComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'control',
            templateUrl: './control.component.html',
            styleUrls: ['./control.component.css'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ControlComponent = _classThis = class {
        constructor(queryService) {
            this.queryService = queryService;
            this.selectedSortCategory = 'datetime';
            this.sortDirection = 'asc';
            this.originalQuery = {
                type: '',
                location: '',
            };
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            this.dateStart = yesterday.toISOString().slice(0, 10);
            this.dateEnd = today.toISOString().slice(0, 10);
        }
        ngOnInit() {
            this.queryService.query$.subscribe((query) => {
                this.originalQuery = query;
                this.updateFilterButtonValues();
            });
        }
        updateFilterButtonValues() {
            const typeButton = document.getElementById('typeMainButton');
            const locationButton = document.getElementById('locationMainButton');
            if (this.originalQuery.type != ' ') {
                typeButton.innerText = this.originalQuery.type;
                typeButton.style.display = 'flex';
            }
            if (this.originalQuery.location != ' ') {
                locationButton.innerText = this.originalQuery.location;
                locationButton.style.display = 'flex';
            }
        }
        setDates() {
            console.log('Start Date:', this.dateStart);
            console.log('End Date:', this.dateEnd);
        }
        setSort() {
            console.log(this.selectedSortCategory);
        }
        toggleSortDirection() {
            this.sortDirection = this.sortDirection === 'asc' ? 'dsc' : 'asc';
        }
        getArrowIcon() {
            return this.sortDirection === 'asc' ? '↑' : '↓';
        }
    };
    __setFunctionName(_classThis, "ControlComponent");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        ControlComponent = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ControlComponent = _classThis;
})();
