/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import Link from 'next/link';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import styles from './CountriesTable.module.css';

const orderBy = (countries, value, direction) => {
	if (value === 'population') {
		if (direction === 'asc') {
			return [...countries].sort((a, b) =>
				a.population > b.population ? 1 : -1
			);
		}

		if (direction === 'desc') {
			return [...countries].sort((a, b) =>
				a.population > b.population ? -1 : 1
			);
		}
	}

	if (value === 'name') {
		if (direction === 'asc') {
			return [...countries].sort((a, b) =>
				a.name.common > b.name.common ? 1 : -1
			);
		}

		if (direction === 'desc') {
			return [...countries].sort((a, b) =>
				a.name.common > b.name.common ? -1 : 1
			);
		}
	}

	return countries;
};

const SortArrow = ({ direction }) => {
	if (!direction) {
		return <></>;
	}

	if (direction === 'desc') {
		return (
			<div div className={styles.heading_arrow}>
				<KeyboardArrowDownRoundedIcon color='inherit' />
			</div>
		);
	} else {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowUpRoundedIcon color='inherit' />
			</div>
		);
	}
};

const CountriesTable = ({ countries }) => {
	const [direction, setDirection] = useState();
	const [value, setValue] = useState();

	const orderedCountries = orderBy(countries, value, direction);

	const switchDirection = () => {
		if (!direction) {
			setDirection('desc');
		} else if (direction === 'desc') {
			setDirection('asc');
		} else {
			setDirection(null);
		}
	};

	const setValueAndDirection = (value) => {
		switchDirection();
		setValue(value);
	};

	return (
		<div>
			<div className={styles.heading}>
				<div className={styles.heading_flag}></div>

				<button
					className={styles.heading_name}
					onClick={() => setValueAndDirection('name')}
				>
					<div>Name</div>
					{value === 'name' && <SortArrow direction={direction} />}
				</button>

				<button
					className={styles.heading_population}
					onClick={() => setValueAndDirection('population')}
				>
					<div>Population</div>
					{value === 'population' && <SortArrow direction={direction} />}
				</button>

				<div
					className={styles.heading_area}
					onClick={() => setValueAndDirection('area')}
				>
					<div>
						Area (km<sup style={{ fontSize: '0.5rem' }}>2</sup>)
					</div>
					{/* {value === 'area' && <SortArrow direction={direction} />} */}
				</div>

				<div
					className={styles.heading_gini}
					onClick={() => setValueAndDirection('gini')}
				>
					<div>Gini</div>
					{/* {value === 'gini' && <SortArrow direction={direction} />} */}
				</div>
			</div>

			{orderedCountries.map((country) => (
				<Link href={`/country/${country.cca3}`} key={country.name.common}>
					<div className={styles.row}>
						<div className={styles.flag}>
							<img src={country.flags.png} alt={country.name.common} />
						</div>
						<div className={styles.name}>{country.name.common}</div>
						<div className={styles.population}>{country.population}</div>
						<div className={styles.area}>{country.area}</div>
						<div className={styles.gini}>
							{country.gini &&
								Object.values(country.gini).flatMap((cur) => {
									return cur.toString() + '%';
								})}

							{!country.gini && <p>N/A</p>}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default CountriesTable;