// import { menuMockup } from "../mockup/menu.js";
import { API_ENDPOINTS } from "../globals/consts/api.js";
function getPlugins() {
	return new Promise((resolve) => {
		fetch(API_ENDPOINTS.GET_PLUGINS)
			.then((response) => response.json())
			.then((data) => {
				if (data?.data) {
					props.data = data.data;
					resolve(data.data);
				}
			})
			.catch((error) => {
				ttbl_logger.error("[DataPlugins] Error fetching plugins data:", error);
				resolve(null);
			});
	});
}

const props = {
	data: [],
	isLoaded: false,
  isPluginsLoaded: false,
  reloadPlugins: function () {
    ttbl_logger.log("[DataPlugins] Reloading plugins data...");

    if (window.ManagePlugins == null) {
      ttbl_logger.warn("[DataPlugins] ManagePlugins is not initialized.");
      return;
    }
    
    props.data.forEach((plugin) => {
      window.ManagePlugins.load(plugin.scriptUrl).catch((err) => {
			ttbl_logger.error(`[Plugin Load Failed] ${plugin.pluginName}:`, err);
		});
    });
    props.isPluginsLoaded = true;
  }
}

const eventName = "pluginDataLoaded";

getPlugins()
	.then((apiData) => {
		if (apiData) {
			props.data = apiData;
			props.isLoaded = true;
			window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }));
			ttbl_logger.log("[DataPlugins] Plugins data loaded from API:", props.data);
		} else {
			window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }));
		}
	})
	.catch((err) => {
		ttbl_logger.error("[DataPlugins] Failed to load plugins data:", err);
		window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }));
	})
	.finally(() => {
		props.reloadPlugins();
	});

  

export function useDataPlugins() {
	return { data: props.data, isLoaded: props.isLoaded, isPluginsLoaded: props.isPluginsLoaded, reloadPlugins: props.reloadPlugins };
}
