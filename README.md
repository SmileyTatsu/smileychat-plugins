# SmileyChat Plugin Registry

This repository hosts the public SmileyChat extension registry.

SmileyChat fetches `registry.json` from the `main` branch so users can see the latest available extensions without updating the app.

## Registry URL

```text
https://raw.githubusercontent.com/SmileyTatsu/smileychat-plugins/main/registry.json
```

## Registry Status

Registry entries use one of these statuses:

- `official`: First-party plugins maintained by the SmileyChat core team.
- `verified`: Community plugins reviewed and approved for this registry.

## Current Registry

The live registry is `registry.json`.

Plugin code should live in each plugin's own repository. This registry only lists the download URL to the plugin archive (.zip), metadata, and a SHA-256 hash.

## User Safety

Plugins are trusted local code. Install plugins only from sources you trust.

SmileyChat verifies the archive hash before installation, but reviewed plugins can still affect the local app experience.
