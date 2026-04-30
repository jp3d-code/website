import type {
  BaseRoute,
  DynamicRoute,
  StaticRoute,
} from "@/shared/types/routes";

export function createStaticRoute(config: BaseRoute): StaticRoute {
  return {
    ...config,
    dynamic: false,
  };
}

export function createDynamicRoute<TParams extends string>(
  config: BaseRoute,
  params: readonly TParams[],
): DynamicRoute<TParams> {
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
  };
}
