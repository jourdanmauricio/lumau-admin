/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './tooltip.module.css';

const Tooltip = ({ content, children, position = 'top' }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={styles.tooltip__wrapper}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      {isHovered && (
        <div
          className={`${styles.tooltip} 
          ${position === 'top' ? styles.tooltip__top : ''} 
          ${position === 'left' ? styles.tooltip__left : ''}
          ${position === 'right' ? styles.tooltip__right : ''}
          ${position === 'bottom' ? styles.tooltip__bottom : ''}`}
        >
          <div className={styles.tooltip__content}>{content}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
// Example:
//   <Tooltip content="tooltip" customClassName={styles['tooltip']}>
//     <button>Top Tooltip</button>
//   </Tooltip>
