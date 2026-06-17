# SmileyChat Plugin Registry

This repository hosts the verified SmileyChat plugin registry.

SmileyChat loads the Store from this file:

```text
https://raw.githubusercontent.com/SmileyTatsu/smileychat-plugins/main/registry.json
```

The app default in `server/config/runtime-config.ts` points at that URL. Users can override it locally with `SMILEYCHAT_PLUGIN_REGISTRY_URL` for development or private registries.

## What Belongs Here

- `registry.json`: the live verified plugin list consumed by SmileyChat.
- `schemas/registry.schema.json`: JSON Schema for registry entries.
- `examples/`: copyable examples for new entries.
- `plugins/`: optional human-readable notes for verified plugins.

Plugin source code and release artifacts should live in each plugin's own repository. This registry stores metadata and reviewed artifact URLs only.

## Registry Entry Shape

Registry entries use prebuilt ZIP artifacts:

```json
{
    "id": "example-plugin",
    "name": "Example Plugin",
    "description": "Example SmileyChat plugin.",
    "version": "1.0.0",
    "author": "Example Author",
    "category": "tools",
    "status": "verified",
    "repository": "https://github.com/SmileyTatsu/example-plugin",
    "artifact": {
        "url": "https://github.com/SmileyTatsu/example-plugin/releases/download/v1.0.0/example-plugin-1.0.0.zip"
    }
}
```

`artifact.url` must be an HTTPS URL whose path ends in `.zip`.

## Status Values

- `official`: first-party plugins maintained by the SmileyChat project.
- `verified`: reviewed community plugins accepted for the public registry.

Do not self-assign `official`.

## Trust Model

SmileyChat plugins are trusted local browser code. Registry review reduces accidental installation from unknown sources, but it does not sandbox plugin code.

SmileyChat installs prebuilt ZIP artifacts. The user-facing install flow does not require SHA-256 hashes, Git, dependency installation, or plugin builds.
