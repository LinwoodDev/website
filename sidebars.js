module.exports = {
  'dev-doctor': [
    'dev-doctor/overview',
    {
      type: 'category',
      label: 'Backend',
      items: [
        'dev-doctor/backend/overview',
        'dev-doctor/backend/own',
        'dev-doctor/backend/collection',
        {
          type: 'category',
          label: 'API',
          items: [
            'dev-doctor/backend/api/main',
            'dev-doctor/backend/api/course',
            'dev-doctor/backend/api/part',

            {
              type: 'category',
              label: 'Item',
              collapsed: false,
              items: [
                'dev-doctor/backend/api/item/overview'
              ]
            }
          ]
        }
      ]
    },
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