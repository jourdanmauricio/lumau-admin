import useSocialNetworks from './useSocialNetworks';

const SocialNetworks = () => {
  const { handleSubmit, networks } = useSocialNetworks();
  return (
    <>
      <div className="relative py-4">
        <lumau-message
          id="networks-form-error"
          errorForm=""
        ></lumau-message>
      </div>
      <form
        id="edit-netwroks-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Facebook / Instagram */}
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="facebook"
              label="Facebook"
              name="facebook"
              placeholder="https://www.facebook.com/mauricio.jourdan.33"
              pattern="^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?$"
              patternerror="Ingrese un perfil válido para Facebook"
              value={networks.facebook}
              selectOnFocus
            ></lumau-input>
          </div>
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="instagram"
              label="Instagram"
              name="instagram"
              placeholder="https://www.instagram.com/mauricio.jourdan.33"
              pattern="^(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am|twitter\.com)\/([A-Za-z0-9-_\.]+)$"
              patternerror="Ingrese un perfil válido para Instagram"
              value={networks.instagram}
              selectOnFocus
            ></lumau-input>
          </div>
        </div>
        {/* Twitter / Whatsapp */}
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="twitter"
              label="Twitter"
              name="twitter"
              placeholder="https://www.facebook.com/mauricio.jourdan.33"
              pattern="http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)"
              patternerror="Ingrese un perfil válido para Twitter"
              value={networks.twitter}
              selectOnFocus
            ></lumau-input>
          </div>
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="whatsapp"
              label="Whatsapp"
              name="whatsapp"
              placeholder="https://wa.me/5492262470952?text=Hola, quiero rebir información"
              pattern="(?:(?:http|https):\/\/)?(?:www\.)?(?:wa\.me)\/.*$"
              patternerror="Ingrese un link válido para Whatsapp"
              value={networks.whatsapp}
              selectOnFocus
            ></lumau-input>
          </div>
        </div>
        {/* Telegram / Youtube */}
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="telegram"
              label="Telegram"
              name="telegram"
              placeholder="https://www.facebook.com/mauricio.jourdan.33"
              pattern="http(?:s)?:\/\/(?:www\.)?telegram\.com\/([a-zA-Z0-9_]+)"
              patternerror="Ingrese un perfil válido para Telegram"
              value={networks.telegram}
              selectOnFocus
            ></lumau-input>
          </div>
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="youtube"
              label="Youtube"
              name="youtube"
              placeholder="https://www.youtube.com/mauriciojourdan104"
              pattern="http(?:s)?:\/\/(?:www\.)?youtube\.com\/([a-zA-Z0-9_]+)"
              patternerror="Ingrese un link válido para Youtube"
              value={networks.youtube}
              selectOnFocus
            ></lumau-input>
          </div>
        </div>
        <button
          type="submit"
          className="btn-confirm block ml-auto"
        >
          Modificar
        </button>
      </form>
    </>
  );
};
export default SocialNetworks;
