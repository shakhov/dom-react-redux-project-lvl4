export default {
  translation: {
    header: {
      title: 'Hexlet Chat',
    },
    auth: {
      login: 'Вход',
      logout: 'Выход',
      loggedAs: 'Вы вошли как ',
    },
    login: {
      title: 'Войти',
      button: {
        login: 'Войти',
      },
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
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
      dropdown: 'Управление каналом',
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
        message: {
          label: 'Новое сообщение',
          placeholder: 'Введите сообщение...',
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
      login: {
        label: 'Ваш ник',
        placeholder: 'Ваш ник',
        validation: {
          required: 'Необходимо ввести имя пользователя',
        },
      },
      username: {
        label: 'Имя пользователя',
        placeholder: 'Имя пользователя',
        validation: {
          required: 'Необходимо ввести имя пользователя',
          lengthRange: 'От {{min}} до {{max}} символов',
        },
      },
      password: {
        label: 'Пароль',
        placeholder: 'Пароль',
        validation: {
          required: 'Необходимо ввести пароль',
          lengthMin: 'Не менее {{min}} символов',
        },
      },
      confirmPassword: {
        label: 'Подтвердите пароль',
        placeholder: 'Подтвердите пароль',
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
      network: 'Ошибка соединения',
      userExists: 'Пользователь "{{username}}" уже зарегистрирован',
      authFailed: 'Неверные имя пользователя или пароль',
    },
    notification: {
      channel: {
        creating: 'Создание канала...',
        created: 'Канал создан',
        renaming: 'Переименовывание канала...',
        renamed: 'канал переименован',
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
