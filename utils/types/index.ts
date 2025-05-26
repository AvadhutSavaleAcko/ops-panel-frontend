import { FC, ReactNode } from "react";

/**
 * Interface for the props of the ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

/**
 * Interface for the options of the hydrateConfigProps function.
 */
interface HydrateConfigPropsOptions {
  injectedProps: Record<string, any>;
  actions?: Record<string, any>;
}

/**
 * Interface for a single page action.
 */
interface PageAction {
  type: string;
  args: Record<string, string>;
}

/**
 * Interface for the actions map used in the hydrateActionsMap function.
 */
interface ActionsMap {
  [key: string]: Function;
}

/**
 * Interface for a single widget in the configuration.
 */
interface Widget {
  type: string;
  data?: {
    props?: Record<string, any>;
  };
  id: string;
  children?: Widget[];
  actions?: Record<string, any>;
}

/**
 * Interface for the URL configuration in the page configuration.
 */
interface URLConfig {
  base_path: string;
  host_name: string;
  query_params: Record<string, string>;
}

/**
 * Interface for the metadata configuration in the page configuration.
 */
interface MetadataConfig {
  link: string;
  page_title: string;
  description: string;
}

/**
 * Interface for the configuration object passed to the Renderer function.
 */
interface PageConfigProps {
  current_node: string;
  children: Widget[];
  actions?: PageAction[];
  url?: URLConfig;
  metadata?: MetadataConfig;
}

/**
 * Interface for the rootWidget object passed to the createTree function.
 */
interface RootWidgetProps {
  id: string;
  type: string;
  children: Widget[];
}

/**
 * Interface for the widget mapping passed to the Renderer function.
 */
interface WidgetsMap {
  [key: string]: FC<any>;
}

/**
 * Interface for the sorted configuration returned by sortConfig.
 */
interface SortedConfig {
  current_node: string;
  children: Widget[];
  actions?: PageAction[];
  url?: URLConfig;
  metadata?: MetadataConfig;
}

export type {
  ErrorBoundaryProps,
  HydrateConfigPropsOptions,
  PageAction,
  ActionsMap,
  Widget,
  URLConfig,
  MetadataConfig,
  PageConfigProps,
  WidgetsMap,
  SortedConfig,
  RootWidgetProps,
};

export enum EWebViewActions {
  OPEN_WEB_VIEW = 'open_webview',
  ASK_LOCATION_PERMISSION = 'ask_location_permission',
  CAMERA_PERMISSION = 'web_permission',
  NATIVE_BACK_PRESS = 'native_back_press',
  CAN_USE_NATIVE_BACK_PRESS = 'can_use_native_back_press',
  CLOSE_WEB_VIEW = 'close_webview',
}

export interface IWebViewActionData {
  action: EWebViewActions;
  action_value: {
    url?: string;
  } | null;
}
