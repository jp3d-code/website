export type BaseRoute = {
  name: string;
  path: string;
  fullPath: string;
};

export type StaticRoute = BaseRoute & {
  dynamic?: false;
};

export type DynamicRoute<TParams extends string = string> = BaseRoute & {
  dynamic: true;
  params: readonly TParams[];
  build: (params: Record<TParams, string | number>) => string;
  buildFull: (params: Record<TParams, string | number>) => string;
};

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export type RouteWithQuery<T extends BaseRoute = BaseRoute> = T & {
  withQuery: (query: QueryParams) => string;
  withQueryFull: (query: QueryParams) => string;
};

export type DynamicRouteWithQuery<TParams extends string = string> =
  DynamicRoute<TParams> & {
    buildWithQuery: (
      params: Record<TParams, string | number>,
      query?: QueryParams,
    ) => string;
    buildFullWithQuery: (
      params: Record<TParams, string | number>,
      query?: QueryParams,
    ) => string;
  };

export type Route = StaticRoute | DynamicRoute | DynamicRouteWithQuery;

export type SectionRoute = {
  name: string;
  hash: string;
  path: string;
  fullPath: string;
};

export type RouteSections<T extends Record<string, SectionRoute>> = {
  sections: T;
  order: T[keyof T][];
};
