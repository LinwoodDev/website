module.exports = {
  docs: [
    'doc1',
    {
      type: 'category',
      label: 'Bot',
      items: [
        'bot/overview',
        {
          type: 'category',
          label: 'Getting started',
          items: ['bot/getting-started/overview', 'bot/getting-started/adding']
        },
        {
          type: 'category',
          label: 'Modules',
          items: [ 
            {
              type: 'category',
              label: 'Main',
              items: ['bot/modules/main/overview', 'bot/modules/main/commands', 'bot/modules/main/settings_commands']
            },
            {
              type: 'category',
              label: 'Karma',
              items: ['bot/modules/karma/overview', 'bot/modules/karma/commands']
            }
          ]
        }
      ]
    }
  ]
};