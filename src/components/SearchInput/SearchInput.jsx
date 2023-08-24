import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import styles from './SearchInput.module.css';

const SearchInput = ({ ...rest }) => {
	return (
		<div className={styles.wrapper}>
			<SearchRoundedIcon color='inherit' />
			<input className={styles.input} {...rest} />
		</div>
	);
};

export default SearchInput;