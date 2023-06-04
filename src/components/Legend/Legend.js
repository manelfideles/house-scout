
import styles from './Legend.module.scss';

export const Legend = () => {
	const markers = [
		[5, "#c6dbef"],
		[10, "#9ecae1"],
		[20, "#6baed6"],
		[30, "#2171b5"],
		[35, "#084594"]
	]

	const renderLegend = () => {
		return markers.map(
			([stop, color]) => <div className={styles.marker} key={color}>
				<div style={{ backgroundColor: `${color}` }}></div>
				<span>{stop}</span>
			</div>
		)
	}
	return (
		<div className={styles.legendContainer}>
			<h4>Legend</h4>
			<div className={styles.domainContainer}>
				<span># of Houses</span>
				{renderLegend()}
			</div>
		</div>
	)
}
