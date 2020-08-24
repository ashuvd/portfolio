import { messagesHandler } from '@/utils/messages';
import { store } from '@/store';

export default async function errorHandler(msg: string, method: string, params: any, isError: boolean = false) {
  if (method && msg && msg.includes('Unauthorized')) {
    const response = await store.dispatch('users/refresh');
    if (response) {
      return store.dispatch(method, params);
    }
    return;
  }
  const ul = document.querySelector('ul.messages')!;
  const messageElem = document.createElement('li');
  messageElem.classList.add('message');
  messageElem.classList.add('animate__animated', 'animate__fadeInUp');
  if (isError) {
    messageElem.classList.add('error');
  }
  messageElem.innerHTML = messagesHandler(msg);
  ul.append(messageElem);
  setTimeout(() => {
    messageElem.classList.add('animate__fadeOutUp');
  }, 2000);
  setTimeout(() => {
    messageElem.remove();
  }, 3000);
}
