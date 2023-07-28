import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ComponentProps } from 'react';

export interface EditorProps extends Omit<ComponentProps<typeof CKEditor>, 'editor'> {}

export interface IEditor extends Omit<ComponentProps<typeof CKEditor<BalloonEditor>>, 'editor'> {
  ref: EditorProps;
}
