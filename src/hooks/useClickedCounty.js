import {
	useContext,
	useState,
	useMemo,
	createContext,
	useEffect,
	useCallback
} from 'react';
import { supabase } from '../lib/supabase';
import {
	categorizePOIs,
	groupBy,
	calculateScore,
	average
} from './utils';
import { useConfig } from './useConfig';
import { useMap } from 'react-map-gl';
import { userPreferences } from '../data/userPreferences';


const ClickedCountyContext = createContext({
	clickedCounty: null,
	countyHouses: null,
	countyPOIs: null,
	isLoading: null,
	setClickedCounty: () => null,
	setPreferences: () => null,
	setBoundingBox: () => null,
	reset: () => null,
})

export const useClickedCounty = () => {
	const context = useContext(ClickedCountyContext);
	if (!context)
		throw new Error(
			'Clients of ClickedCountyContext must be wrapped inside a <ClickedCountyContextProvider />'
		);
	return context;
}

export const ClickedCountyContextProvider = ({ children }) => {
	const { map } = useMap();
	const { defaultBbox, datasets: [, houses] } = useConfig();
	const [boundingBox, setBoundingBox] = useState(defaultBbox);
	const [clickedCounty, setClickedCounty] = useState('Lisboa');
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [preferences, setPreferences] = useState(localStorage.getItem('preferences') || null)

	useEffect(
		() => {
			if (!map) return undefined;
			map.fitBounds(boundingBox, { padding: 100, duration: 2000 });
		},
		[map, boundingBox]
	)

	console.log(preferences);

	useEffect(
		() => {
			if (!preferences) setPreferences(JSON.parse(preferences))
			else setPreferences(preferences);
			localStorage.setItem('preferences', JSON.stringify(preferences));
		},
		[preferences]
	)

	const fetchTravelTimes = useCallback(async () => {
		setIsLoading(true);
		const { data } = await supabase
			.from('traveltimes')
			.select('house_id, poi_type, travel_mode, travel_time')
			.eq('county', clickedCounty)
			.eq('travel_mode', preferences.travelMode)
			.in('poi_type', Object.keys(preferences.pois))
		const groupedData = Object
			.entries(groupBy(data, 'house_id'))
			.map(([key, infoArray]) => {
				const strippedArr = Object
					.entries(groupBy(infoArray, 'poi_type'))
					.map(([key, arr]) => {
						const newArr = arr.map(obj => obj.travel_time)
						return {
							'poiName': key,
							'values': calculateScore(
								newArr,
								preferences.pois[key],
								32500
							)
						}
					})
				return {
					'houseScore': Math.round(average(
						Object
							.values(strippedArr)
							.map(({ values }) => values)
					)),
					'poiScores': strippedArr
				}
			})
		setData(groupedData);
		setIsLoading(false);
	}, [preferences, clickedCounty])

	useEffect(() => {
		if (clickedCounty === 'Lisboa') return;
		fetchTravelTimes();
	}, [clickedCounty, fetchTravelTimes])


	const countyPOIs = useMemo(
		() => {
			if (clickedCounty === 'Lisboa') return;
			return categorizePOIs(clickedCounty)
		},
		[clickedCounty]
	);

	const countyHouses = useMemo(
		() => {
			if (clickedCounty === 'Lisboa') return;
			if (!isLoading && data) {
				return houses
					.filter(
						({ county }) => county === clickedCounty
					).map(
						(house, i) => ({ ...house, 'scores': data?.[i] })
					)
			}
		},
		[isLoading, data, clickedCounty, houses]
	)

	const reset = () => {
		setClickedCounty('Lisboa');
		setData([]);
		setBoundingBox(defaultBbox);
	};

	const value = {
		clickedCounty,
		countyHouses,
		countyPOIs,
		isLoading,
		boundingBox,
		setClickedCounty,
		setBoundingBox,
		setPreferences,
		reset,
	}

	return <ClickedCountyContext.Provider value={value}>
		{children}
	</ClickedCountyContext.Provider>
}