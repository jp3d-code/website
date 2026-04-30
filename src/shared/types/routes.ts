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

export type Route = StaticRoute | DynamicRoute;
