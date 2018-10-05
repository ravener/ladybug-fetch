import { url } from "inspector";

declare module "ladybug-fetch" {

  import { Agent } from "https";
  import { IncomingMessage } from "http";

  export function create(options: Options): Ladybug;
  export function mergeObjects(base: any, merge: any[]): any;
  export function isPromise(promise: any): boolean;
  export function bearer(key: string): { Authorization: string; };
  export function basic(username: string, password: string): { Authorization: any; };
  export function get(url: string, options?: any): LadybugRequest;
  export function post(url: string, options?: any): LadybugRequest;
  export function put(url: string, options?: any): LadybugRequest;
  export function patch(url: string, options?: any): LadybugRequest;
  export default get;
  function del(url: string, options?: any): LadybugRequest;
  export { del as delete }
 
  export class Ladybug extends Callable {
    public constructor(options: Options);
    public request(method: string, url: string, options: Options): LadybugRequest;
    public get(url: string, options: Options): this;
    public post(url: string, options: Options): this;
    public put(url: string, options: Options): this;
    public patch(url: string, options: Options): this;
    public delete(url: string, options: Options): this;
    public static create(options?: Options): Ladybug;
  }

  export class Callable {
    public constructor(prop: string);
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
    public static applyTo(cls: object, ignore?: string[]): void;
  }
    
  class LadybugRequest extends RequestBase {
    public constructor(options: Options);
    public agent?: Agent;
    public method: string;
    public url: string;
    public then(resolve: Function, reject?: Function): Promise<any>
    public catch(callback: Function): Promise<any>
  }
  
  class LadybugResponse {
    public constructor(response: IncomingMessage, data: Buffer);
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
    headers?: any,
    query?: any,
    data?: any,
    promise?: any,
    plugins?: Array<Function>,
    status?: Function // Status validation
  };

  type RequestData = Object | String | Buffer;
}
