export const countHousesInCounty = (geoData, houseData) => {
	const counts = {};
	for (let i = 0; i < geoData.features.length; i++) {
		const county = geoData.features[i].properties.Freguesia;
		var count = houseData.reduce(
			(n, house) => n + (house.county === county),
			0
		);
		counts[county] = count;
	}
	return counts;
};