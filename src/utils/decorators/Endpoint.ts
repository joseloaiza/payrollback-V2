import { ExceptionResponse } from '../ExceptionResponse';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBodyOptions,
  ApiQueryOptions,
  ApiQuery,
} from '@nestjs/swagger';
import {
  Delete,
  Get,
  Head,
  HttpCode,
  Options,
  Patch,
  Post,
  Put,
  Type,
} from '@nestjs/common';

/**
 * Represents the proproperties of each OpenAPI (Swagger) response
 */
export interface ResponseDefinition {
  status: number;
  description: string;
  type: any;
  isArray?: boolean;
}

/**
 * Represents the list of available HTTP methods
 */
export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PATCH'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD';

/**
 * Mapper between custom HttpMethod type and Nest decorators
 */
const METHOD_MAP: Record<HttpMethod, any> = {
  ['GET']: Get,
  ['POST']: Post,
  ['PATCH']: Patch,
  ['PUT']: Put,
  ['DELETE']: Delete,
  ['OPTIONS']: Options,
  ['HEAD']: Head,
};

/**
 * Represents the parameters for the @Endpoint decorator.
 */
export type EndpointParams = {
  method: HttpMethod;
  summary: string;
  route: string;
  responses: ResponseDefinition[];
  bodyType?: any; // 👈 new optional param
  body?: Type<any> | ApiBodyOptions; // <-- NEW
  queryParams?: ApiQueryOptions[]; // 👈 NEW
  queryParamsIsDto?: boolean;
};

/**
 * Represents the metadata required to decorate a class method.
 */
interface MethodMetadata {
  target: any;
  key: string;
  descriptor: PropertyDescriptor;
}

/**
 * Retrieves the corresponding NestJS HTTP method decorator (e.g., Get, Post).
 *
 * @param method - The HTTP method (e.g., GET, POST, DELETE).
 * @returns The appropriate NestJS method decorator.
 * @throws If the HTTP method is unsupported.
 */
function getMethodDecorator(method: HttpMethod): any {
  const decorator = METHOD_MAP[method];
  if (!decorator) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }
  return decorator;
}

/**
 * Retrieves the successful response definition from a list of responses.
 *
 * @param responses - An array of response definitions.
 * @returns The successful response definition, or undefined if none exists.
 */
function getSuccessfulResponse(
  responses: ResponseDefinition[],
): ResponseDefinition | undefined {
  const successResponses = responses.filter(
    (response) => response.status >= 200 && response.status < 300,
  );

  if (successResponses.length !== 1) {
    throw new Error(
      '[EndpointDecorator] Each endpoint requires one successful response (status 2XX).',
    );
  }

  return successResponses[0];
}

/**
 * Applies the HTTP method decorator (e.g., Get, Post) to a method.
 *
 * @param methodDecorator - The NestJS HTTP method decorator.
 * @param route - The route path for the endpoint.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
function applyMethodDecorator(
  methodDecorator: any,
  route: string,
  metadata: MethodMetadata,
): void {
  methodDecorator(route)(metadata.target, metadata.key, metadata.descriptor);
}

/**
 * Applies the API operation metadata to the method.
 *
 * @param summary - A brief summary of the API operation.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
function applyApiOperation(summary: string, metadata: MethodMetadata): void {
  ApiOperation({ summary })(metadata.target, metadata.key, metadata.descriptor);
}

/**
 * Applies the API response metadata for each defined response.
 *
 * @param responses - An array of response definitions.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
function applyApiResponses(
  responses: ResponseDefinition[],
  metadata: MethodMetadata,
): void {
  responses.forEach((response) =>
    ApiResponse({
      status: response.status,
      description: response.description,
      type: response.type,
      isArray: response.isArray,
    })(metadata.target, metadata.key, metadata.descriptor),
  );
}

/**
 * Applies global API responses for client-side and server-side exceptions.
 *
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
function applyGlobalApiResponses(metadata: MethodMetadata): void {
  ApiResponse({
    status: '4XX',
    description: 'Client-side exception',
    type: ExceptionResponse,
  })(metadata.target, metadata.key, metadata.descriptor);

  ApiResponse({
    status: '5XX',
    description: 'Server-side exception',
    type: ExceptionResponse,
  })(metadata.target, metadata.key, metadata.descriptor);
}

/**
 * Applies the HTTP status code decorator to the method.
 *
 * @param status - The HTTP status code for the successful response.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
function applyHttpCode(status: number, metadata: MethodMetadata): void {
  HttpCode(status)(metadata.target, metadata.key, metadata.descriptor);
}

function applyApiBody(type: any, metadata: MethodMetadata) {
  ApiBody({ type })(metadata.target, metadata.key, metadata.descriptor);
}

function applyApiQueries(
  queries: ApiQueryOptions[] | undefined,
  metadata: MethodMetadata,
): void {
  if (!queries) return;
  for (const query of queries) {
    const decorator = ApiQuery(query);
    decorator(metadata.target, metadata.key, metadata.descriptor); // ✅ correct application
  }
}

// function applyApiQueries(
//   queries: ApiQueryOptions[] | undefined,
//   metadata: MethodMetadata,
// ): void {
//   if (!queries) return;
//   queries.forEach((query) => {
//     ApiQuery(query)(metadata.target, metadata.key, metadata.descriptor);
//   });
// }

/**
 * A decorator factory to define an HTTP endpoint with API documentation and validation.
 *
 * @param params - Configuration for the endpoint, including HTTP method, route, summary, and responses.
 * @returns A method decorator for the specified endpoint.
 */
export function Endpoint(params: EndpointParams): MethodDecorator {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const metadata: MethodMetadata = { target, key, descriptor };
    const methodDecorator = getMethodDecorator(params.method);

    const successResponse = getSuccessfulResponse(params.responses);
    applyHttpCode(successResponse.status, metadata);
    applyHttpCode(successResponse.status, metadata);

    applyMethodDecorator(methodDecorator, params.route, metadata);
    applyApiOperation(params.summary, metadata);
    applyApiResponses(params.responses, metadata);
    applyGlobalApiResponses(metadata);
    applyApiQueries(params.queryParams, metadata);
    // ✅ Apply ApiBody if specified
    if (params.bodyType) {
      applyApiBody(params.bodyType, metadata);
    }

    // // 🔥 Apply @ApiBody if provided
    // if (params.body) {
    //   const bodyOptions =
    //     typeof params.body === 'function' ? { type: params.body } : params.body;

    //   ApiBody(bodyOptions)(target, key, descriptor);
    // }

    return descriptor;
  };
}
