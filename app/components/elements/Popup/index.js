import React from 'react';
import { Modal } from 'react-responsive-modal';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Icon from '../Icon';
import styles from './Popup.module.scss';

const Popup = ({ open, onClose, title, children }) => {
  const { width } = useWindowDimensions();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon={<Icon name="close" />}
      center
      styles={{
        modalContainer: {
          padding: '0 20px'
        },
        modal: {
          borderRadius: 8,
          width: '100%',
          maxWidth: 600,
          margin: 0,
          padding: '24px 20px 48px 20px'
        },

        closeButton: {
          right: 20,
          top: width <= 992 ? 20 : 24
        }
      }}
    >
      <div className={styles.popup}>
        <h2>{title}</h2>
        <div className={styles.popupContent}>{children}</div>
      </div>
    </Modal>
  );
};

export default Popup;
