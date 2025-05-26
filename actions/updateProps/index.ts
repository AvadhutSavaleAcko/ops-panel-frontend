import { updateNormalisedConfig } from "@store/slices/config";
import { store } from "@store/store";

function updater(normalisedConfig, id, updatedProps) {
  if (!normalisedConfig) return normalisedConfig;

  const updatedConfig = JSON.parse(JSON.stringify(normalisedConfig));

  const { props } = updatedConfig?.[id];
  updatedConfig[id]["props"] = { ...props, ...updatedProps };

  return updatedConfig;
}

export function updateProps(id, updatedProps) {
  const state = store?.getState();
  const normalisedConfig = state.configuration?.normalisedConfig;
  if (normalisedConfig) {
    const updatedConfig = updater(normalisedConfig, id, updatedProps);
    store?.dispatch(
      updateNormalisedConfig({
        normalisedConfig: updatedConfig
      })
    );
  }
}

export function updateMultipleWidgetProps(data) {
  const { ids, updatedProps } = data || {};
  const state = store?.getState();
  const normalisedConfig = state.configuration?.normalisedConfig;
  if (normalisedConfig) {
    let updatedConfig = normalisedConfig;
    ids?.forEach((id, index) => {
      updatedConfig = updater(updatedConfig, id, updatedProps?.[index]);
      store?.dispatch(
        updateNormalisedConfig({
          normalisedConfig: updatedConfig || normalisedConfig
        })
      );
    });
  }
}


export function updatePropsAction(props) {
  const { component_id, update_props } = props;
  for (const property in update_props) {
    if (update_props[property] == "true") {
      update_props[property] = true;
    } else if (update_props[property] == "false") {
      update_props[property] = false;
    }
  }

  updateProps(component_id, update_props);
}
