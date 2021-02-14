---
title: Text item
sidebar_label: Text
---
Extends [Item](overview)

## Example

### JSON

In the items option in the [part](../part): `<course>/<part>/config.json`

```json
{
    "name": "Text",
    "type": "text",
    "text": "Here you can write something. Markdown is supported!\n"
}
```

### YAML

In the items option in the [part](../part): `<course>/<part>/config.yml`

```yaml
name: Text
type: text
text: >
  Here you can write something. Markdown is supported!
```

## Options

| Name |       Type        | Required | Since |                                                                  Description |
| :--- | :---------------: | :------: | :---: | ---------------------------------------------------------------------------: |
| text | String (Markdown) |   true   | 0.1.0 | The current text which will be displayed as content of the current part item |
