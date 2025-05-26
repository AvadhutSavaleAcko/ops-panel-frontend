import {
  fetchConfigSuccess,
  updateNormalisedConfig
} from "@store/slices/config";
import { store } from "@store/store";

interface visibilityProps {
  config: any;
  ids: Array<string>;
  reverseIds: Array<string>;
}
function setVisibleTrue(
  config: any,
  ids: any,
  reverseIds: any
): visibilityProps {
  if (!config || !ids || !Array.isArray(ids)) return config;

  const updatedConfig = JSON.parse(JSON.stringify(config));
  if (
    reverseIds === updatedConfig.id &&
    updatedConfig.data &&
    updatedConfig.data.props
  ) {
    updatedConfig.data.props.is_visible = false;
  }

  if (
    ids === updatedConfig.id &&
    updatedConfig.data &&
    updatedConfig.data.props
  ) {
    updatedConfig.data.props.is_visible = true;
  }

  if (Array.isArray(updatedConfig.children)) {
    updatedConfig.children = updatedConfig.children.map((child: any) =>
      setVisibleTrue(child, ids, reverseIds)
    );
  } else if (typeof updatedConfig.children === "object") {
    updatedConfig.children = setVisibleTrue(
      updatedConfig.children,
      ids,
      reverseIds
    );
  }

  return updatedConfig;
}

function updateIsVisible(normalisedConfig, ids, reverseIds) {
  if (!normalisedConfig) return normalisedConfig;

  const updatedConfig = JSON.parse(JSON.stringify(normalisedConfig));

  if (reverseIds) {
    if (Array.isArray(reverseIds)) {
      reverseIds.forEach((id) => {
        const { props } = updatedConfig[id];
        props.is_visible = false;
      });
    } else {
      const { props } = updatedConfig[reverseIds];
      props.is_visible = false;
    }
  }

  if (ids) {
    if (Array.isArray(ids)) {
      ids.forEach((id) => {
        const { props } = updatedConfig[id];
        props.is_visible = true;
      });
    } else {
      const { props } = updatedConfig[ids];
      props.is_visible = true;
    }
  }

  return updatedConfig;
}

export function updateVisibility(args: { ids: string; reverseIds: string }) {
  const state = store?.getState();
  const { ids, reverseIds } = args;
  const normalisedConfig = state.configuration?.normalisedConfig;

  if (normalisedConfig) {
    const updatedConfig = updateIsVisible(normalisedConfig, ids, reverseIds);
    store?.dispatch(
      updateNormalisedConfig({
        normalisedConfig: updatedConfig
      })
    );
  }
}
