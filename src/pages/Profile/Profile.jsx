import { Modal } from '@/components/Modal/Modal';
import useProfile from './useProfile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword/ChangePassword';
import SocialNetworks from './SocialNetworks/SocialNetworks';
import { FaTelegramPlane, FaUserCog } from 'react-icons/fa';

const Profile = () => {
  const {
    user,
    handleSubmit,
    isOpenModalPass,
    openModalPass,
    closeModalPass,
    handleCancel,
    toggleState,
    toggleTab,
  } = useProfile();
  return (
    <>
      <div className="w-full bg-text-color min-w-[300px] p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="tracking-wide leading-relaxed">
            <p>
              Web:{' '}
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
              >
                {user.url}
              </a>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Role: <span>{user.role}</span>
            </p>
          </div>
          <button
            onClick={() => openModalPass()}
            className="btn-confirm"
          >
            Cambiar password
          </button>
        </div>
      </div>

      <div className="tabs__container mt-10">
        <div className="tabs__bloc">
          <div
            onClick={() => toggleTab(1)}
            className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaUserCog
              color="teal"
              size={20}
            />
            <span>Perfil</span>
          </div>
          <div
            onClick={() => toggleTab(2)}
            className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
          >
            <FaTelegramPlane
              color="green"
              size={20}
            />
            <span>Redes sociales</span>
          </div>
        </div>
        <div className="tabs__content">
          <div
            className={
              toggleState === 1
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <EditProfile
              user={user}
              handleSubmit={handleSubmit}
            ></EditProfile>
          </div>
          <div
            className={
              toggleState === 2
                ? 'tab__content active__content'
                : 'tab__content'
            }
          >
            <SocialNetworks />
          </div>
        </div>
      </div>

      <Modal
        width="md"
        isOpenModal={isOpenModalPass}
        closeModal={closeModalPass}
      >
        <ChangePassword
          handleCancel={handleCancel}
          userId={user.id}
        />
      </Modal>
    </>
  );
};
export default Profile;
