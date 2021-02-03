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
          items: ['bot/getting-started/overview', "bot/getting-started/adding"]
        }
      ]
    }
  ]
};