import { config } from '../../../config/config';
import { useUserStore } from '../../../store/user';

const AuthApps = () => {
  let user = useUserStore((state) => state.user);

  const handleAuthInstagram = () => {
    const clientId = config.clientFaceDev;
    const redirectUri = config.redirectUriFaceDev;

    window.open(
      `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code&state=${user.id}`,
      '_blank',
      'noreferrer'
    );
  };

  return (
    <div className="py-4">
      {user.id}
      Autorización de aplicaciones. En esta sección puedes autorizar a Lumau
      para acceder a la información de las distintas aplicaciones y mostrarla en
      tu web.
      <div className="py-4">
        <button
          onClick={handleAuthInstagram}
          className="btn-confirm"
        >
          Instagram
        </button>
      </div>
    </div>
  );
};
export default AuthApps;
