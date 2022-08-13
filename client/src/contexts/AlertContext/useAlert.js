import { useContext } from 'react';
import AlertContext from './AlertContext';

const useAlert = () => useContext(AlertContext);

export default useAlert;
