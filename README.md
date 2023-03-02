# md-modal [![npm package](https://img.shields.io/npm/v/md-modal)](https://www.npmjs.org/package/react-pure-modal)

Md-modal is a simplest way to create dialog on your ReactJS site.

- Very small (less than 18Kb)
- Mobile friendly
- Without dependencies

## Getting Started

Install this package:

```shell
npm i md-modal
```

Import the component:

```jsx
import {Modal} from 'md-modal';

const modalRef = useRef<ModalRef>(null)

<Modal ref={modalRef}>Your content</Modal>
```

You can then render the Modal component like any other React component in JSX.

```jsx
const showModal = useCallback<SubmitHandler>(() => modalRef.current?.open(), [])

<button className="button" onClick={showModal}>Open modal</button>
```