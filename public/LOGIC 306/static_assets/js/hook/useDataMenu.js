import { API_ENDPOINTS } from "../globals/consts/api.js";

const demoMenu = [
	{
		title: "Phong demo 360",
		type: "header",
		sub: [
			{ title: "Goc 1", type: "location", data: { id: "demo-room-01" } },
			{ title: "Goc 2", type: "location", data: { id: "demo-room-02" } },
			{ title: "Goc 3", type: "location", data: { id: "demo-room-03" } },
			{ title: "Goc 4", type: "location", data: { id: "demo-room-04" } },
			{ title: "Goc 5", type: "location", data: { id: "demo-room-05" } },
		],
	},
];

function getMenuAPI() {
	return new Promise((resolve) => {
		fetch(API_ENDPOINTS.GET_MAIN_MENU)
			.then((response) => response.json())
			.then((data) => {
				if (data?.data && data?.data?.metadata) {
					props.data = data.data.metadata;
					resolve(data.data.metadata);
				} else {
					resolve(null);
				}
			})
			.catch((error) => {
				ttbl_logger.error("[DataMenu] Error fetching menu data:", error);
				resolve(null);
			});
	});
}

const props = {
	data: demoMenu,
};

const eventName = "menuDataLoaded";

getMenuAPI()
	.then((apiData) => {
		if (apiData && Array.isArray(apiData) && apiData.length > 0) {
			props.data = apiData;
			props.isLoaded = true;
			window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }));
			ttbl_logger.log("[DataMenu] Menu data loaded from API:", props.data);
		} else {
			props.data = demoMenu;
			window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }));
			window.events[eventName] = props.data;
			ttbl_logger.log("[DataMenu] Menu data loaded from local demo data:", props.data);
		}
	})
	.catch((error) => {
		ttbl_logger.error("[DataMenu] Error loading menu data:", error);
		props.data = demoMenu;
		window.dispatchEvent(new CustomEvent(eventName, { detail: props.data }));
		window.events[eventName] = props.data;
	});

export function useDataMenu() {
	return { data: props.data };
}
