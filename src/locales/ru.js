export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
    },
    auth: {
      login: 'Войти',
      logout: 'Выйти',
      loggedAs: 'Вы вошли как ',
    },
    login: {
      title: 'Войти',
      button: {
        login: 'Войти',
      },
      noAccount: 'Нет аккаунта?',
      signup: 'Зарегистрироваться',
    },
    signup: {
      title: 'Регистрация',
      button: {
        signup: 'Зарегистрироваться',
      },
    },
    404: {
      message: 'Страница "{{- page}}" не найдена',
      goHome: 'На главную',
    },
    channels: {
      title: 'Каналы',
      rename: 'Переименовать',
      remove: 'Удалить',
    },
    chat: {
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      form: {
        button: {
          send: 'Отправить',
        },
        placeholder: {
          message: 'Введите сообщение...',
        },
      },
    },
    modals: {
      addChannel: {
        title: 'Добавить канал',
        button: {
          add: 'Добавить',
        },
      },
      removeChannel: {
        title: 'Удалить канал "{{name}}"?',
        button: {
          remove: 'Удалить',
        },
      },
      renameChannel: {
        title: 'Переименовать канал "{{name}}"',
        button: {
          rename: 'Переименовать',
        },
      },
    },
    forms: {
      username: {
        label: 'Имя пользователя',
        placeholder: 'Введите имя пользователя...',
        validation: {
          required: 'Необходимо ввести имя пользователя',
          lengthRange: 'Длина имени пользователя должна быть от {{min}} до {{max}} символов',
        },
      },
      password: {
        label: 'Пароль',
        placeholder: 'Введите пароль...',
        validation: {
          required: 'Необходимо ввести пароль',
          lengthMin: 'Длина пароля должна быть не менее {{min}} символов',
        },
      },
      confirmPassword: {
        label: 'Подтвердите парль',
        placeholder: 'Подтвердите пароль...',
        validation: {
          required: 'Необходимо ввести пароль',
          match: 'Пароли должны совпадать',
        },
      },
      channelName: {
        label: 'Имя канала',
        placeholder: 'Введите имя канала...',
        validation: {
          required: 'Необходимо ввести имя канала',
          lengthRange: 'Длина имени канала должна быть от {{min}} до {{max}} символов',
          exists: 'Канал с данным именем уже существует',
          profanity: 'Имя канала содержит ненормативную лексику',
        },
      },
    },
    error: {
      network: 'Ошибка сети: время ожидания истекло',
      userExists: 'Пользователь "{{username}}" уже зарегистрирован',
      authFailed: 'Неверные имя пользователя или пароль',
    },
    notification: {
      channel: {
        creating: 'Создание канала...',
        created: 'Канал успешно создан!',
        renaming: 'Переименовывание канала...',
        renamed: 'канал переименован!',
        removing: 'Удаление канала...',
        removed: 'Канал удалён',
      },
      channels: {
        loading: 'Каналы загружаются...',
      },
      messages: {
        loading: 'Сообщения загружаются...',
      },
    },
  },
};
