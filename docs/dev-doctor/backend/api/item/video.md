---
title: Video item
sidebar_label: Video
---
Extends [Item](overview)

## Example

### JSON

In the items option in the [part](../part): `<course>/<part>/config.json`

```json
{
    "name": "Welcome",
    "description": "Welcome to the course",
    "type": "video",
    "source": "youtube",
    "url": "ScMzIvxBSi4"
}
```

### YAML

In the items option in the [part](../part): `<course>/<part>/config.yml`

```yaml
name: Welcome
description: Welcome to the course
type: video
source: youtube
url: ScMzIvxBSi4
```

## Options

| Name   |       Type       | Required | Since |                                                       Description |
| :----- | :--------------: | :------: | :---: | ----------------------------------------------------------------: |
| source | String (youtube) |   true   | 0.1.0 |           The source of the file. Currently there is only youtube |
| url    |      String      |   true   | 0.1.0 | The current url of the file. On youtube it is the id of the video |
