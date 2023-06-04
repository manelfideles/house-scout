import { poisByCounty } from '../data/pois'

const overpassQueryTags = {
	'public-transportation': ['bus_stop', 'tram_stop', 'station'],
	'leisure/tourism': ['fitness_centre', 'park', 'museum'],
	'shopping': ['mall', 'supermarket'],
	'food/drinks': ['bar', 'restaurant'],
	'education': ['school', 'kindergarten'],
	'ATMs': ['atm'],
	'gas-stations': ['fuel'],
	'parking': ['parking'],
	'healthcare': ['pharmacy', 'hospital']
}

const intersectArrays = (arr1, arr2) => {
	return arr1.filter(val => arr2.includes(val))
}

export const categorizePOIs = (clickedCounty) => {
	let poiCategories = {
		'public-transportation': [],
		'leisure/tourism': [],
		'shopping': [],
		'food/drinks': [],
		'education': [],
		'ATMs': [],
		'gas-stations': [],
		'parking': [],
		'healthcare': []
	}
	const pois = poisByCounty[clickedCounty].features;
	for (let i = 0; i < pois.length; i++) {
		const poiProperties = pois[i].properties;
		const poiGeo = pois[i].geometry.coordinates;
		for (let j = 0; j < Object.entries(overpassQueryTags).length; j++) {
			const [tagKey, tagValueArray] = Object.entries(overpassQueryTags)[j];
			const arrIntersection = intersectArrays(
				Object.values(poiProperties),
				tagValueArray
			)
			if (arrIntersection.length > 0)
				poiCategories[tagKey].push(poiGeo)
		}
	}
	return poiCategories
}

export const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

export const calculateScore = (arr, relevance, C) => {
	const scaledRelevance = relevance / 10;
	if (scaledRelevance < 0.4) return 50;
	const arr2 = arr.map(tt => tt < 100 ? 100 : tt)
	const score = arr2.map(tt => (C * scaledRelevance) / tt)
	const score2 = score.map(s => s > 100 ? 100 : s)
	return Math.round(average(score2));
}

export const groupBy = (arr, groupKey) => {
	return arr.reduce(
		(r, a) => {
			r[a[groupKey]] = r[a[groupKey]] || [];
			r[a[groupKey]].push(a);
			return r;
		}, Object.create(null));
}