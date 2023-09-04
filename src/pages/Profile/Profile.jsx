import Layout from '@/components/Layout/layout';
import { Modal } from '@/components/Modal/Modal';
import useProfile from './useProfile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword/ChangePassword';

const Profile = () => {
  const {
    user,
    handleSubmit,
    isOpenModalPass,
    openModalPass,
    closeModalPass,
    handleCancel,
  } = useProfile();
  return (
    <Layout>
      <div className="w-full bg-text-color min-w-[300px] p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="tracking-wide leading-relaxed">
            <p>
              Web: <span>{user.url}</span>
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

      <EditProfile
        user={user}
        handleSubmit={handleSubmit}
      ></EditProfile>

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
    </Layout>
  );
};
export default Profile;
