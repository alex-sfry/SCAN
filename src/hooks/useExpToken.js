import { shallowEqual, useSelector } from 'react-redux';
import { persistor } from '../store/store.js';

const useExpToken = () => {
    const selectedData = useSelector((state) => state, shallowEqual);
    const date = new Date();

    if (Object.hasOwn(selectedData.login, 'token')) {
        Date.parse(selectedData.login.token.expire) - Date.parse(date) < 0 && persistor.purge();
    }
}

export default useExpToken;