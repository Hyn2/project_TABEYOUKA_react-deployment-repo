import '../../styles/ckeditor.css';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { EditorProps } from '../../types/ckeditor.interface';

// TODO: reference 될 때, 사용할 수 있는 props를 접근하는 인터페이스를 작성하는 방법을 알아야 할 것 같다.
const Editor = (props: EditorProps) => {
  return <CKEditor editor={BalloonEditor} {...props} />;
};

//
const EditorOnlyRead = (props: EditorProps) => {
  return <CKEditor editor={BalloonEditor} disabled={true} {...props} />;
};

export { Editor, EditorOnlyRead };
