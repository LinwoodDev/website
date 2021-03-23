---
title: Video item
sidebar_label: Video
---
Extends [Item](overview)

## Example

In the items option in the [part](../part)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="json" values={[
  { label: 'JSON', value: 'json', },
  { label: 'YAML', value: 'yaml', },
]}>
<TabItem value="json">

```json title="<course>/<part>/config.json"
{
    "name": "Welcome",
    "description": "Welcome to the course",
    "type": "video",
    "source": "youtube",
    "url": "ScMzIvxBSi4"
}
```

</TabItem>
<TabItem value="yaml">

```yaml title="<course>/<part>/config.yml"
name: Welcome
description: Welcome to the course
type: video
source: youtube
url: ScMzIvxBSi4
```

</TabItem>
</Tabs>

## Options

| Name   |         Type          | Required | Since |                                                       Description |
| :----- | :-------------------: | :------: | :---: | ----------------------------------------------------------------: |
| source | String (youtube, url) |   true   | 0.1.0 |           The source of the file. Currently there is only youtube |
| url    |        String         |   true   | 0.1.0 | The current url of the file. On youtube it is the id of the video |
