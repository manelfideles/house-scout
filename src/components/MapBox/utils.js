const houseCountsLayer = {
	id: 'houseCountsLayer',
	type: 'fill',
	paint: {
		'fill-color': {
			property: 'houseCount',
			stops: [
				[5, '#c6dbef'],
				[10, '#9ecae1'],
				[20, '#6baed6'],
				[30, '#2171b5'],
				[35, '#084594']
			]
		},
		'fill-opacity': 0.8,
		'fill-outline-color': '#000000'
	}
};

const highlightedCounty = {
	id: 'highlightedCounty',
	type: 'line',
	paint: {
		'line-color': '#ffff00',
		'line-width': 5
	}
};

export const sources = {
	houseCountsLayer,
	highlightedCounty,
}
