import { ResourceLoader, ResourceLoaderStatus, ResourceLoaderUpdateCallback } from '.';
export default class SimpleResourceLoader implements ResourceLoader {
    private _xhr;
    private _url;
    private _listeners;
    private _responseStatus;
    private _responseTextStatus;
    private _responseData;
    protected _status: ResourceLoaderStatus;
    protected _progress: number;
    private isAppend;
    private autoAppend;
    get status(): ResourceLoaderStatus;
    get progress(): number;
    get responseStatus(): number | null;
    get responseTextStatus(): string;
    get responseData(): any;
    constructor(url: string, autoLoad?: boolean, autoAppend?: boolean);
    onUpdate(c: ResourceLoaderUpdateCallback): void;
    abort(): void;
    load(): void;
    callbackDone: (event: ProgressEvent) => void;
    callbackFail: (event: ProgressEvent) => void;
    callbackProgress: (event: ProgressEvent) => void;
    callbackAbort: (event: ProgressEvent) => void;
    dispatch(): void;
    append(): void;
    doAppend(): void;
}
