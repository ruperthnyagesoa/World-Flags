import { useState } from 'react';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';

export default function Home({ countries }) {
	const [keyword, setKeyword] = useState('');

	const filteredCounties = countries.filter(
		(country) =>
			(country.name.common &&
				country.name.common.toLowerCase().includes(keyword)) ||
			(country.region && country.region.toLowerCase().includes(keyword)) ||
			(country.subregion && country.subregion.toLowerCase().includes(keyword))
	);

	const onInputChange = (e) => {
		e.preventDefault();

		setKeyword(e.target.value.toLowerCase());
	};

	return (
		<Layout>
			<div className={styles.input_container}>
				<div className={styles.count}>Found {countries.length} countries</div>
				<div className={styles.input}>
					<SearchInput
						placeholder='Filter by Name, Region, or Subregion'
						onChange={onInputChange}
					/>
				</div>
			</div>

			<CountriesTable countries={filteredCounties} />
		</Layout>
	);
}

export const getStaticProps = async () => {
	const res = await fetch('https://restcountries.com/v3.1/all');
	// const res = await fetch(
	// 	'https://restcountries.com/v3.1/alpha?codes=GB,US,JP,CN,RU,FR'
	// );
	const countries = await res.json();

	return {
		props: {
			countries,
		},
		revalidate: 3600,
	};
};