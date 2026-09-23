"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleResourceLoader {
    _xhr = null;
    _url = '';
    _listeners = [];
    _responseStatus = null;
    _responseTextStatus = '';
    _responseData = null;
    _status = 'waiting';
    _progress = 0;
    isAppend = false;
    autoAppend = true;
    get status() {
        return this._status;
    }
    get progress() {
        return this._progress;
    }
    get responseStatus() {
        return this._responseStatus;
    }
    get responseTextStatus() {
        return this._responseTextStatus;
    }
    get responseData() {
        return this._responseData;
    }
    constructor(url, autoLoad = true, autoAppend = true) {
        this._url = url;
        this.autoAppend = autoAppend;
        if (autoLoad) {
            this.load();
        }
    }
    onUpdate(c) {
        this._listeners.push(c);
    }
    abort() {
        if (this._xhr) {
            this._xhr.abort();
        }
    }
    load() {
        this.abort();
        this._status = 'pending';
        this._xhr = new XMLHttpRequest();
        this._xhr.onprogress = this.callbackProgress;
        this._xhr.onerror = this.callbackFail;
        this._xhr.onload = this.callbackDone;
        this._xhr.onabort = this.callbackAbort;
        this._xhr.open('GET', this._url, true);
        this._xhr.send(null);
        this.dispatch();
    }
    callbackDone = (event) => {
        if (!this._xhr) {
            return;
        }
        this._responseStatus = this._xhr.status;
        this._responseTextStatus = this._xhr.statusText;
        this._responseData = this._xhr.responseText;
        this._progress = 100;
        this._status = this._xhr.status === 200 ? 'done' : 'error';
        this._xhr = null;
        this.dispatch();
    };
    callbackFail = (event) => {
        if (!this._xhr) {
            return;
        }
        this._responseStatus = this._xhr.status;
        this._responseTextStatus = this._xhr.statusText;
        this._responseData = this._xhr.responseText;
        this._progress = 100;
        this._status = 'error';
        this._xhr = null;
        this.dispatch();
    };
    callbackProgress = (event) => {
        if (event.lengthComputable) {
            this._progress = Math.ceil(100 * event.loaded / event.total);
        }
        this.dispatch();
    };
    callbackAbort = (event) => {
        if (!this._xhr) {
            return;
        }
        this._progress = 100;
        this._status = 'canceled';
        this._xhr = null;
        this.dispatch();
    };
    dispatch() {
        for (const c of this._listeners) {
            c(this);
        }
        if (this.autoAppend && this.status === 'done') {
            this.append();
        }
    }
    append() {
        if (this.status !== 'done' || this.isAppend) {
            return;
        }
        this.doAppend();
        this.isAppend = true;
    }
    doAppend() {
        // Do nothing
    }
}
exports.default = SimpleResourceLoader;
//# sourceMappingURL=simple-resource-loader.js.map