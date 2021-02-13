---
title: Main
---
## Example

### JSON

`config.json`

```json
{
    "name": "Dev-Doctor",
    "description": "The sample backend of dev-doctor",
    "icon": null,
    "courses": [
        "example",
        "example2"
    ]
}
```

### YAML

`config.yml`

```yaml
# The name of the current backend
name: 'Dev-Doctor'
# The description of the current backend
description: /
    The sample backend of dev-doctor
# The icon of the backend. Supported values are [png, jpg, svg, null]
icon: null
# All courses of the current backend
courses:
- example
- example2
```

## Options

| Name        |              Type              | Required | Since |                                                                                                                                     Description |
| :---------- | :----------------------------: | :------: | :---: | ----------------------------------------------------------------------------------------------------------------------------------------------: |
| name        |             String             |   true   | 0.1.0 |                                      The name of the current backend. It will show up in the backend store as title or in the servers settings. |
| description |             String             |  false   | 1.1.0 |                                                   The description of the current backend. It will show up in the backend store after the title. |
| icon        | String (png, jpg, svg) or null |  false   | 1.1.0 | The icon will show up in the backend store in the list left to the title, on the details page of the backend store and in the servers settings. |
| courses     |         Array<String\>         |   true   | 0.1.0 |                                                        The folder names of the courses. With this option the app will iterate above the courses |
