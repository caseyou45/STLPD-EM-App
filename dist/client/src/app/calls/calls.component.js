"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallsComponent = void 0;
const core_1 = require("@angular/core");
const core_2 = require("@angular/core");
exports.CallsComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'calls',
            templateUrl: './calls.component.html',
            styleUrls: ['./calls.component.css'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _query_decorators;
    let _query_initializers = [];
    var CallsComponent = _classThis = class {
        constructor(http, queryService, callsService) {
            this.http = (__runInitializers(this, _instanceExtraInitializers), http);
            this.queryService = queryService;
            this.callsService = callsService;
            this.query = __runInitializers(this, _query_initializers, {
                location: '',
                type: '',
                sort: '',
                direction: '',
                dateStart: '',
                dateEnd: '',
            });
            this.title = 'List of Calls';
            this.calls = [];
        }
        ngOnInit() {
            this.queryService.query$.subscribe((query) => {
                this.query = query;
                this.fetchCalls();
            });
            this.fetchCalls();
        }
        ngOnChanges() {
            this.fetchCalls();
        }
        fetchCalls() {
            this.callsService.getCalls(this.query).subscribe((data) => {
                this.calls = data;
            });
        }
        updateQueryWithLocation(location) {
            this.query.location = location;
            this.queryService.updateQuery(this.query);
        }
        updateQueryWithType(type) {
            this.query.type = type;
            this.queryService.updateQuery(this.query);
        }
    };
    __setFunctionName(_classThis, "CallsComponent");
    (() => {
        _query_decorators = [(0, core_2.Input)()];
        __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: obj => "query" in obj, get: obj => obj.query, set: (obj, value) => { obj.query = value; } } }, _query_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        CallsComponent = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CallsComponent = _classThis;
})();
