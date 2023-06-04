export const formatHousePrice = (price) => {
	return price > 1000 ? `${price / 1000}k` : `${price}`;
}

export const generateRandomScore = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomArrayElement = (array) => {
	return array[Math.floor(Math.random() * array.length)];
}

export const capitalizePOIName = (poi) => {
	return poi.split(' ').map((word) => {
		return word[0].toUpperCase() + word.substring(1);
	}).join(' ');
}

export const pois = [
	'supermarkets',
	'atms',
	'gyms',
	'parking',
	'subway',
	'bus',
	'pharmacies',
	'restaurants',
	'gas',
	'hospitals',
	'parks'
]

export const generateMockData = (min, max) => {
	let poiScores = [];
	for (let i = 0; i < 4; i++) {
		poiScores[i] = {
			name: getRandomArrayElement(pois),
			score: generateRandomScore(min, max)
		}
	}
	const houseScore = generateRandomScore(min, max);
	return ({ poiScores, houseScore })
}

export const getHouseScore = (index) => {
	return 100;
}

export const formatPOILabels = (label) => {
	const result = label.replace('-', ' ');
	return capitalizePOIName(result);
}

const isBetween = (val, min, max) => {
	return val >= min && val <= max;
}

export const scoreToColor = (score) => {
	if (isBetween(score, 0, 40)) return 'red';
	else if (isBetween(score, 40, 60)) return 'orange';
	else if (isBetween(score, 60, 75)) return '#F5E10A';
	else return 'green';
}