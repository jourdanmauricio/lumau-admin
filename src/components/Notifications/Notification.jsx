import { useEffect, useState } from 'react';
import styles from './notifications.module.css';

const Notification = (props) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  console.log('message', props.type, props.message);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 20);
    setIntervalId(id);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: 'REMOVE_NOTIFICATION',
        id: props.id,
      });
    }, 400);
  };

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  const handlePauseTimer = () => {
    clearInterval(intervalId);
  };

  return (
    <div
      onClick={() => setExit(true)}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`${styles.notification__item} ${
        props.type === 'SUCCESS' ? styles.success : styles.error
      } ${exit ? styles.exit : ''}`}
    >
      <p>{props.message}</p>
      {/* <button onClick={() => setExit(true)}>
        X
      </button> */}
      <div
        className={styles.bar}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default Notification;
