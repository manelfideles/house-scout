import { houses } from "../data/houses";
import { counties } from "../data/counties";

export const useConfig = () => {
	const domain = [5, 10, 20, 30, 35];
	const margin = {};
	const dimensions = [750, 750];
	const datasets = [counties, houses];
	const centerPoint = [38.7267, -9.13333];
	const defaultZoom = 14;
	const defaultBbox = [[-9.293829, 38.690318], [-9.004525, 38.791660]];

	return {
		domain,
		dimensions,
		margin,
		datasets,
		centerPoint,
		defaultZoom,
		defaultBbox,
	};
};
