import useNewSection from './useConfigSection';
import '@/components/lumau-input.js';
import '@/components/lumau-message.js';

const ConfigSection = () => {
  const { handleSubmit, error, currentData, action } = useNewSection();

  console.log('currentData', currentData);

  return (
    <>
      <div className="relative">
        <lumau-message
          id="form-new"
          errorForm={error}
        ></lumau-message>
      </div>
      <form
        className="mt-4"
        id="new-section-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Name / resource */}
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="name"
              label="Nombre"
              name="name"
              value={currentData.name}
              placeholder="Sobre nosotros"
              pattern="[A-Za-zñáéíóúÑÁÉÍÓÚ]{0,20}$"
              patternerror="El nombre no es válido"
              selectOnFocus
              required
            ></lumau-input>
          </div>
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="resource"
              label="Atributo"
              name="resource"
              value={currentData.resource}
              placeholder="about"
              pattern="[A-Za-zñáéíóúÑÁÉÍÓÚ]{0,20}$"
              patternerror="El nombre no es válido"
              selectOnFocus
              required
            ></lumau-input>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="w-full md:w-1/2">
            <div className="flex w-full items-center">
              <lumau-input
                class="w-full"
                small
                id="icon"
                label="Icono"
                name="icon"
                value={currentData.icon}
                placeholder="FaCog"
                pattern="[A-Za-zñáéíóúÑÁÉÍÓÚ]{0,20}$"
                patternerror="El nombre no es válido"
                selectOnFocus
              ></lumau-input>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <lumau-input
              small
              id="route"
              label="Path"
              name="route"
              value={currentData.route}
              placeholder="/about"
              pattern="[A-Za-zñáéíóúÑÁÉÍÓÚ]{0,20}$"
              patternerror="El nombre no es válido"
              selectOnFocus
            ></lumau-input>
          </div>
        </div>

        <div className="w-full">
          <lumau-input
            small
            id="roles"
            label="Roles"
            name="roles"
            value={currentData.roles}
            placeholder="['admin', 'user']"
            pattern="[A-Za-zñáéíóúÑÁÉÍÓÚ]{0,20}$"
            patternerror="El nombre no es válido"
            selectOnFocus
          ></lumau-input>
        </div>

        <div className="w-full">
          <lumau-text-area
            // class="lumau-input"
            id="description"
            label="Descripción"
            name="description"
            placeholder="Para no olvidar..."
            //pattern="^.{1,5000}$"
            value={currentData.description}
            rows="6"
            patternerror="Máximo 5000 caracteres"
            selectOnFocus
          ></lumau-text-area>
        </div>

        <button className="btn-confirm block ml-auto">
          {action === 'NEW' ? 'Crear' : 'Editar'}
        </button>
      </form>
    </>
  );
};
export default ConfigSection;
