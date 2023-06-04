import { useClickedCounty } from '../../hooks/useClickedCounty';
import styles from './UserPrefs.module.scss';

export const UserPrefs = () => {

	const { setPreferences } = useClickedCounty();

	const handleSubmit = (e) => {
		e.preventDefault();
		let prefs = {
			travelMode: '',
			pois: [['', 0], ['', 0], ['', 0], ['', 0]]
		};
		for (let i = 0; i < 3; i++) {
			const elem = e.target[i]
			if (elem.type === 'radio' && elem.checked) {
				prefs.travelMode = elem.id
			}
		}
		let j = 0
		for (let i = 3; i < e.target.length - 1; i += 2) {
			const selectElem = e.target[i];
			const relevanceElem = e.target[i + 1];
			prefs.pois[j][0] = selectElem.value;
			prefs.pois[j][1] = parseInt(relevanceElem.value);
			j += 1
		}
		const userPrefs = { ...prefs, pois: Object.fromEntries(prefs.pois) };
		console.log({ userPrefs });
		setPreferences(userPrefs)
	}

	return (
		<div className={styles.prefsContainer}>
			<form onSubmit={handleSubmit}>
				<h5>Preferences</h5>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
					<h6>Travel Mode</h6>
					<span>
						<input
							type='radio'
							name='travelMode'
							id='driving'
						/>
						<label htmlFor="driving">Driving</label>
					</span>
					<span>
						<input
							type='radio'
							name='travelMode'
							id='walking'
						/>
						<label htmlFor="walking">Walking</label>
					</span>
					<span>
						<input
							type='radio'
							name='travelMode'
							id='bus'
						/>
						<label htmlFor="publictransports">Public Transports</label>
					</span>
				</div>
				<div style={{ marginTop: '1rem' }}>
					<h6>POIs</h6>
					<div>
						<select name="poi-1" id="poi-1" style={{ marginRight: '0.75rem' }}>
							<option value="ATMs">ATMs</option>
							<option value="public-transportation">Bus/Train Stops</option>
							<option value="leisure/tourism">Leisure & Tourism</option>
							<option value="shopping">Shopping</option>
							<option value="food/drinks">Food & Drinks</option>
							<option value="education">Education</option>
							<option value="gas-stations">Gas Stations</option>
							<option value="parking">Parking</option>
							<option value="healthcare">Healthcare</option>
						</select>
						<input type="number" name="poi-1-relevance" id="poi-1-relevance" min='1' max='10' />
					</div>
					<div>
						<select name="poi-2" id="poi-2" style={{ marginRight: '0.75rem' }}>
							<option value="ATMs">ATMs</option>
							<option value="public-transportation">Bus/Train Stops</option>
							<option value="leisure/tourism">Leisure & Tourism</option>
							<option value="shopping">Shopping</option>
							<option value="food/drinks">Food & Drinks</option>
							<option value="education">Education</option>
							<option value="gas-stations">Gas Stations</option>
							<option value="parking">Parking</option>
							<option value="healthcare">Healthcare</option>
						</select>
						<input type="number" name="poi-2-relevance" id="poi-2-relevance" min='1' max='10' />
					</div>
					<div>
						<select name="poi-3" id="poi-3" style={{ marginRight: '0.75rem' }}>
							<option value="ATMs">ATMs</option>
							<option value="public-transportation">Bus/Train Stops</option>
							<option value="leisure/tourism">Leisure & Tourism</option>
							<option value="shopping">Shopping</option>
							<option value="food/drinks">Food & Drinks</option>
							<option value="education">Education</option>
							<option value="gas-stations">Gas Stations</option>
							<option value="parking">Parking</option>
							<option value="healthcare">Healthcare</option>
						</select>
						<input type="number" name="poi-3-relevance" id="poi-3-relevance" min='1' max='10' />
					</div>
					<div>
						<select name="poi-4" id="poi-4" style={{ marginRight: '0.75rem' }}>
							<option value="ATMs">ATMs</option>
							<option value="public-transportation">Bus/Train Stops</option>
							<option value="leisure/tourism">Leisure & Tourism</option>
							<option value="shopping">Shopping</option>
							<option value="food/drinks">Food & Drinks</option>
							<option value="education">Education</option>
							<option value="gas-stations">Gas Stations</option>
							<option value="parking">Parking</option>
							<option value="healthcare">Healthcare</option>
						</select>
						<input type="number" name="poi-4-relevance" id="poi-4-relevance" min='1' max='10' />
					</div>
				</div>
				<input type="submit" value="Go!" className={styles.submitBtn}></input>
			</form>
		</div>
	)
}
