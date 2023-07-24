import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ComponentProps } from 'react';

export interface EditorProps extends Omit<ComponentProps<typeof CKEditor>, 'editor'> {}
