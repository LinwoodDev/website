module.exports = {
  'dev-doctor': [
    'dev-doctor/overview',
    'dev-doctor/privacypolicy'
  ],
  bot: [
    'bot/overview',
    {
      type: 'category',
      label: 'Getting started',
      items: ['bot/getting-started/overview', 'bot/getting-started/adding', 'bot/getting-started/using']
    },
    {
      type: 'category',
      label: 'Modules',
      items: [{
          type: 'category',
          label: 'Main',
          items: ['bot/modules/main/overview', 'bot/modules/main/commands']
        },
        {
          type: 'category',
          label: 'Karma',
          items: ['bot/modules/karma/overview', 'bot/modules/karma/commands']
        }
      ]
    }
  ]
};