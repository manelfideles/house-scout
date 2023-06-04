import { useMemo } from "react";
import { useConfig } from "../useConfig";
import { countHousesInCounty } from './utils';

export const useCounts = () => {
	const {
		datasets: [counties, houses]
	} = useConfig();

	const counts = useMemo(() => countHousesInCounty(counties, houses), [
		counties,
		houses
	]);

	useMemo(
		() =>
			counties.features.map(
				({ properties }) =>
					(properties["houseCount"] = counts[properties.Freguesia])
			),
		[counties, counts]
	);

	return counties;
};
