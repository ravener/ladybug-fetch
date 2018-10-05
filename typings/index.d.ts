import { url } from "inspector";

declare module "ladybug-fetch" {

    import { Agent } from "https";
    import { IncomingMessage } from "http";

    export function create(options: Options): Ladybug;
    export function mergeObjects(base: any, merge: any[]): any;
    export function isPromise(promise: any): boolean;
    export function bearer(key: string): { Authorization: string; };
    export function basic(username: string, password: string): { Authorization: any; };

    export class Ladybug extends Callable {
        public constructor(options: Options);

        public request(method: string, url: string, options: Options): LadybugRequest;
        public get(url: string, options: Options): this;
        public post(url: string, options: Options): this;
        public put(url: string, options: Options): this;
        public patch(url: string, options: Options): this;
        public delete(url: string, options: Options): this;
        public static create(options: Options): Ladybug;
    }

    export class Callable {
        public constructor(prop: String);
    }

    class RequestBase {
        public constructor(options: Options);

        public set(key: string | object, value?: string): this;
        public query(key: string | object, value?: string): this;
        public send(data: RequestData): this;
        public promise(lib: any): this;
        public use(plugin: Function): this;
        public json(): this;
        public status(callback: Function): this;
        public static applyTo(cls: object, ignore: string[0]): void;
    }
    
    class LadybugRequest {
        public constructor(options: Options);

        public agent?: Agent;
        public method: string;
        public url: string;

        public then(resolve: Function, reject: Function): LadybugResponse;
        public catch(callback: Function): Error;
    }

    class LadybugResponse {
        public constructor(response: IncomingMessage, data: any);
     
        public headers: any;
        public body: any;
        public ok: boolean;
        public res: IncomingMessage;
        public status: number;
        public statusText: string;
        public text: string;
        public response: IncomingMessage; // Shortcut to this.res
    }

    // Export Request and Response
    export {
        LadybugResponse as Response,
        LadybugRequest as Request
    };

    type Options = {
        method?: string,
        baseURL?: string,
        host?: string,
        port?: number,
        protocol?: string,
        path?: string,
        headers?: {},
        query?: {},
        data?: any,
        promise?: any,
        plugins?: Array<Function>,
        status?: Function // Status validation
    };

    type RequestData = Object | String | Buffer;

}
