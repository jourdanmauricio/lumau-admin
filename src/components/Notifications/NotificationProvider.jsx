import {createContext, useContext, useReducer} from 'react';
import Notification from './Notification';
import styles from './notifications.module.css';

export const NotificationContext = createContext();

const NotificationProvider = props => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'ADD_NOTIFICATION':
				return [...state, {...action.payload}];
			case 'REMOVE_NOTIFICATION':
				return state.filter(el => el.id !== action.id);
			default:
				return state;
		}
	}, []);

	return (
		<NotificationContext.Provider value={dispatch}>
			<div className={styles.notifications__wrapper}>
				{state.map(note => {
					return <Notification dispatch={dispatch} key={note.id} {...note} />;
				})}
			</div>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const dispatch = useContext(NotificationContext);

	return props => {
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: {
				id: Date.now(),
				...props,
			},
		});
	};
};

export default NotificationProvider;
