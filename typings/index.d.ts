import { url } from "inspector";
import { IncomingMessage } from "http";
import { Agent } from "https";

declare module "ladybug-fetch" {

  export class Utils {
    public static isPromise(p: any): boolean;
    public static mergeObjects(base: any, ...merge: any[]): any;
    public static clone<T>(obj: T): T;
    public static URLJoin(...args: string[]): string;
    public static isAbsoluteURL(url: string): boolean;
  }

  // Not actually a class but should work
  export class mime {
    public static lookup(ext: string): string;
  }

  export function create(options: Options): Ladybug;
  export function bearer(key: string): { Authorization: string; };
  export function basic(username: string, password: string): { Authorization: string; };
  export function get(url: string, options?: any): Request;
  export function post(url: string, options?: any): Request;
  export function put(url: string, options?: any): Request;
  export function patch(url: string, options?: any): Request;
  export default function get(url: string, options?: any): Request;
  export function del(url: string, options?: any): Request;
 
  export class Ladybug extends RequestBase {
    public readonly form: FormData;
    public data?: RequestData;
    public constructor(options: Options);
    public request(method: RequestMethod, url: string, options: Options): Request;
    public get(url: string, options: Options): Request;
    public post(url: string, options: Options): Request;
    public put(url: string, options: Options): Request;
    public patch(url: string, options: Options): Request;
    public delete(url: string, options: Options): Request;
    public static create(options?: Options): Ladybug;
  }

  export class FormData {
    public readonly boundary: string;
    public readonly contentType: string;
    public readonly buffers: Array<Buffer>;
    public append(key: string, value: Buffer | string | any, filename?: string): this;
    public build(): Buffer;
  }

  export class Callable {
    public constructor(prop: string);
  }
  
  class RequestBase {
    public url: string;
    public data?: RequestData;
    public validateStatus: (status: number) => boolean;
    public baseURL?: string;
    public readonly _query: object;
    public promiseLibrary: any;
    public plugins: Array<(request: Request) => void>;
    public headers: object;
    public form?: FormData;
    public constructor(options: Options);

    public set(key: string | object, value?: string): this;
    public query(key: string | object, value?: string): this;
    public send(data: RequestData): this;
    public promise(lib: any): this;
    public use(plugin: (request: Request) => void): this;
    public json(): this;
    public status(callback: (status: number) => boolean): this;
    public accept(ext: string): this;
    public attach(name: string, value: Buffer | string | any, filename?: string): this;
    public static applyTo(cls: any, ignore?: string[]): void;
  }
    
  export class Request extends RequestBase {
    public constructor(options: Options);
    public agent?: Agent;
    public method: RequestMethod;
    public then(resolve: Function, reject?: Function): Promise<Response>;
    public catch(callback: Function): Promise<any>;
  }
  
  export class Response {
    public constructor(response: IncomingMessage, data: Buffer);
    public readonly headers: any;
    public readonly body: any;
    public readonly ok: boolean;
    public readonly res: IncomingMessage;
    public readonly status: number;
    public readonly statusText: string;
    public readonly text: string;
    public readonly response: IncomingMessage; // Shortcut to this.res
  }

  type Options = {
    method?: RequestMethod,
    baseURL?: string,
    headers?: object,
    query?: object,
    data?: RequestData,
    promise?: any,
    plugins?: Array<(request: Request) => void>,
    status?: (status: number) => boolean // Status validation
  };

  export type RequestData = object | string | Buffer | Array<Buffer | string>;
  export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}
