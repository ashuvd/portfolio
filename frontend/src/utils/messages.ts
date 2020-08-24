type tMessages = {
  [key: string]: string
}
const messages: tMessages = {
  login: 'Вы успешно вошли в систему',
  'GraphQL error: Unauthorized': 'Ошибка авторизации',
};
export const messagesHandler = (message: string): string => {
  return messages[message] ? messages[message] : message;
}
