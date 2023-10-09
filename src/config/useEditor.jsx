import { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { useMemo } from 'react';

const Image = Quill.import('formats/image');
const icons = Quill.import('ui/icons');
// const Keyboard = Quill.import('modules/keyboard');

const ATTRIBUTES = [
  'alt',
  'height',
  'width',
  'class',
  'style', // Had to add this line because the style was inlined
];

class CustomImage extends Image {
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      const copy = { ...formats };

      if (domNode.hasAttribute(attribute)) {
        copy[attribute] = domNode.getAttribute(attribute);
      }

      return copy;
    }, {});
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register('modules/imageResize', ImageResize);
Quill.register({ 'formats/image': CustomImage });

const useEditor = ({ imageHandler }) => {
  icons['undo'] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
  icons['redo'] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

  function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ color: [] }, { background: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
          [{ align: [] }],
          ['undo', 'redo'],
        ],
        handlers: {
          image: imageHandler,
          undo: undoChange,
          redo: redoChange,
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
      clipboard: {
        matchVisual: false,
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
      keyboard: {
        bindings: {
          custom: {
            key: 's',
            ctrlKey: true,
            handler: function () {
              return false;
            },
          },
        },
      },
    }),
    []
  );

  return { modules };
};

export default useEditor;
