# React-modal
[![npm package](https://img.shields.io/npm/v/@midly/react-modal)](https://www.npmjs.org/package/@midly/react-modal)
[![npm package](https://img.shields.io/bundlephobia/min/@midly/react-modal)](https://www.npmjs.org/package/@midly/react-modal)
[![npm package](https://img.shields.io/github/last-commit/micheld-dev/react-modal)](https://www.npmjs.org/package/@midly/react-modal)
[![npm package](https://img.shields.io/npm/dw/@midly/react-modal)](https://www.npmjs.org/package/@midly/react-modal)

React-modal is a simplest way to create dialog on your ReactJS site.

- Small (less than 44Kb)
- Mobile friendly
- Without dependencies

## Getting Started

Install this package:

```shell
npm i @midly/react-modal
```

Import the component:

```jsx
import {Modal} from '@midly/react-modal';
import {ModalRef} from '@midly/react-modal/dist/esm/Modal'

const modalRef = useRef<ModalRef>(null)

<Modal ref={modalRef}>Your content</Modal>
```

You can then render the Modal component like any other React component in JSX.

```jsx
const showModal = useCallback<SubmitHandler>(() => modalRef.current?.open(), [])

<button className="button" onClick={showModal}>Open modal</button>
```