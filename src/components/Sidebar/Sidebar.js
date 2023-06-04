import { HouseCard } from "../HouseCard";
import Spinner from "../Spinner";
import { useClickedCounty } from '../../hooks';

import styles from './Sidebar.module.scss';

export const Sidebar = () => {
	const {
		clickedCounty,
		reset,
		countyHouses,
		isLoading
	} = useClickedCounty();

	const houseList = countyHouses?.map(
		(house) => <HouseCard key={house.index} house={house} />
	);

	const sidebarOverflow = (
		clickedCounty === 'Lisboa'
			? ({ overflowY: 'hidden', width: 'fit-content' })
			: !countyHouses
				? ({ height: '75%' })
				: undefined
	)

	return (
		<div className={styles.sidebarContainer} style={sidebarOverflow}>
			<div className={styles.sidebarHeader}>
				{clickedCounty !== 'Lisboa'
					? <>
						<h3>{!isLoading ? countyHouses.length : ''} Results in <span>{clickedCounty}</span></h3>
						<span onClick={reset}> X </span>
					</>
					: <p>Click any county to view house suggestions!</p>
				}
			</div>
			<div style={isLoading ? { paddingTop: '50%' } : undefined}>
				{!isLoading ? houseList : <Spinner size='m' />}
			</div>
		</div>
	);
};
