import type {
  BaseRoute,
  DynamicRouteWithQuery,
  QueryParams,
  RouteSections,
  RouteWithQuery,
  SectionRoute,
  StaticRoute,
} from "@/shared/types/routes";

export function buildQueryString(params: QueryParams): string {
  const entries = Object.entries(params).filter(
    ([_, value]) => value !== undefined && value !== null,
  );

  if (entries.length === 0) return "";

  const searchParams = new URLSearchParams();
  entries.forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return `?${searchParams.toString()}`;
}

export function createStaticRoute(
  config: BaseRoute,
): RouteWithQuery<StaticRoute> {
  return {
    ...config,
    dynamic: false,
    withQuery: (query: QueryParams) =>
      `${config.path}${buildQueryString(query)}`,
    withQueryFull: (query: QueryParams) =>
      `${config.fullPath}${buildQueryString(query)}`,
  };
}

export function createDynamicRoute<TParams extends string>(
  config: BaseRoute,
  params: readonly TParams[],
): DynamicRouteWithQuery<TParams> {
  const build = (paramValues: Record<TParams, string | number>): string => {
    let builtPath = config.path;
    params.forEach((param) => {
      builtPath = builtPath.replace(`[${param}]`, String(paramValues[param]));
    });
    return builtPath;
  };

  const buildFull = (paramValues: Record<TParams, string | number>): string => {
    let builtPath = config.fullPath;
    params.forEach((param) => {
      builtPath = builtPath.replace(`[${param}]`, String(paramValues[param]));
    });
    return builtPath;
  };

  return {
    ...config,
    dynamic: true,
    params,
    build,
    buildFull,
    buildWithQuery: (
      paramValues: Record<TParams, string | number>,
      query?: QueryParams,
    ) => {
      const path = build(paramValues);
      return query ? `${path}${buildQueryString(query)}` : path;
    },
    buildFullWithQuery: (
      paramValues: Record<TParams, string | number>,
      query?: QueryParams,
    ) => {
      const path = buildFull(paramValues);
      return query ? `${path}${buildQueryString(query)}` : path;
    },
  };
}

export function createSection(
  parentRoute: BaseRoute,
  hash: string,
  name: string,
): SectionRoute {
  return {
    name,
    hash,
    path: `${parentRoute.path}#${hash}`,
    fullPath: `${parentRoute.fullPath}#${hash}`,
  };
}

export function defineSections<T extends Record<string, SectionRoute>>(
  sections: T,
): RouteSections<T> {
  return {
    sections,
    order: Object.values(sections) as T[keyof T][],
  };
}
