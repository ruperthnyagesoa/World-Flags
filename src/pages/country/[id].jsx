/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './Country.module.css';

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${id}`);

	const country = await res.json();

	return country;
};

const Country = ({ country }) => {
	const [borders, setBorders] = useState([]);

	const getBorders = async () => {
		if (country.borders) {
			const border = await Promise.all(
				country.borders.map((border) => getCountry(border))
			);

			setBorders(border);
		}
	};

	useEffect(() => {
		getBorders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout title={country.name.common}>
			<div className={styles.container}>
				<div className={styles.container_left}>
					<div className={styles.overview_panel}>
						<img src={country.flags.png} alt={country.name.common} />
						<h1 className={styles.overview_name}>{country.name.common}</h1>
						<div className={styles.overview_region}>{country.region}</div>

						<div className={styles.overview_numbers}>
							<div className={styles.overview_population}>
								<div className={styles.overview_value}>
									{country.population}
								</div>
								<div className={styles.overview_label}>Population</div>
							</div>

							<div className={styles.overview_area}>
								<div className={styles.overview_value}>{country.area}</div>
								<div className={styles.overview_label}>Area</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.container_right}>
					<div className={styles.details_panel}>
						<h4 className={styles.details_panel_heading}>Details</h4>

						<div className={styles.details_panel_row}>
							<div className={styles.details_panel_label}>Capital</div>
							<div className={styles.details_panel_value}>
								{country.capital}
							</div>
						</div>

						<div className={styles.details_panel_row}>
							<div className={styles.details_panel_label}>Subregion</div>
							<div className={styles.details_panel_value}>
								{country.subregion}
							</div>
						</div>

						{country.languages && (
							<div className={styles.details_panel_row}>
								<div className={styles.details_panel_label}>Languages</div>
								<div className={styles.details_panel_value}>
									{Object.values(country.languages).join(', ')}
								</div>
							</div>
						)}

						{country.currencies && (
							<div className={styles.details_panel_row}>
								<div className={styles.details_panel_label}>Currencies</div>
								<div className={styles.details_panel_value}>
									{Object.values(country.currencies)
										.flatMap((cur) => cur['name'])
										.toString()
										.replace(',', ', ')}
								</div>
							</div>
						)}

						{country.name.nativeName && (
							<div className={styles.details_panel_row}>
								<div className={styles.details_panel_label}>Native names</div>
								<div className={styles.details_panel_value}>
									{Object.values(country.name.nativeName)
										.flatMap((cur) => cur['official'])
										.toString()
										.replace(',', ', ')}
								</div>
							</div>
						)}

						{country.gini && (
							<div className={styles.details_panel_row}>
								<div className={styles.details_panel_label}>Gini</div>
								<div className={styles.details_panel_value}>
									{country.gini &&
										Object.values(country.gini).flatMap((cur) => {
											return cur.toString() + '%';
										})}
								</div>
							</div>
						)}

						{borders.length > 0 && (
							<div className={styles.details_panel_borders}>
								<div className={styles.details_panel_borders_label}>
									Neighbouring Countries
								</div>
								<div className={styles.details_panel_borders_container}>
									{borders.map((border, index) => (
										<div
											className={styles.details_panel_borders_country}
											key={index}
										>
											<img
												src={border[0].flags.png}
												alt={border[0].name.common}
											/>
											<div className={styles.details_panel_borders_name}>
												{border[0].name.common}
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Country;

export const getServerSideProps = async ({ params }) => {
	const country = await getCountry(params.id);

	return {
		props: {
			country: country[0],
		},
	};
};

// export const getStaticPaths = async () => {
// 	const res = await fetch('https://restcountries.com/v3.1/all');

// 	const countries = await res.json();

// 	const paths = countries.map((country) => ({
// 		params: { id: country.cca3 },
// 	}));

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };

// export const getStaticProps = async ({ params }) => {
// 	const country = await getCountry(params.id);

// 	return {
// 		props: {
// 			country: country[0],
// 		},
// 	};
// };