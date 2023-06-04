import { useClickedCounty } from '../../hooks'
import Spinner from '../Spinner';
import {
	formatPOILabels,
	formatHousePrice,
	scoreToColor
} from './utils';

import styles from './HouseCard.module.scss';

export const HouseCard = ({ house }) => {
	const { isLoading } = useClickedCounty();
	const {
		url, thumbnail, price,
		county, type, publisher, scores
	} = house;

	const renderPOIScores = () => {
		return scores?.poiScores
			.map(
				({ poiName, values }) => <p>
					<span>{formatPOILabels(poiName)}</span>
					<div>
						<span>{values}</span>
						<span>/100</span>
					</div>
				</p>
			)
	}

	return (
		<div className={styles.houseCardContainer}>
			<img src={thumbnail} alt="house-img" />
			<div className={styles.cardInfo}>
				<div>
					<a href={url} target="_blank" rel="noreferrer">
						<h5>
							{type} in {county}
						</h5>
					</a>
					<p>{formatHousePrice(price)} Eur/month</p>
				</div>
				<div className={styles.poiScores}>
					{!isLoading && scores
						? renderPOIScores()
						: <div style={{ paddingTop: '2rem' }}>
							<Spinner />
						</div>
					}
				</div>
			</div>
			<div className={styles.scorePublisherWrapper}>
				<div className={styles.houseScore} style={{ backgroundColor: !isLoading ? scoreToColor(scores?.houseScore) : 'grey' }}>
					{!isLoading && scores ? scores?.houseScore : <Spinner />}
				</div>
				<div className={styles.publisherContainer}>
					Published by <img src={publisher} alt="publisher-img" />
				</div>
			</div>
		</div>
	);
};
