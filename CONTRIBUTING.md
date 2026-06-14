# Contributing Plugins

Community plugins are added through pull requests to `registry.json`.

## Submission Requirements

- Add one plugin entry per pull request.
- Use a stable, unique plugin `id`.
- Host the plugin archive (.zip) on trusted HTTPS URLs, such as GitHub Releases.
- Provide a SHA-256 hash for the archive.
- Ensure the archive extracts to a single root directory or the current directory, containing the plugin contents.
- Make sure the extracted `plugin.json` has the same `id` as the registry entry.

## Status

Do not self-assign `official`.

Community submissions should use `verified` only after review. Maintainers may adjust status during review.

## Not Allowed

- Secrets or API keys.
- Obfuscated code.
- Hidden tracking.
- Unexpected network behavior.
- Files that write outside plugin-owned storage.
- Archives containing absolute paths, empty segments, drive letters, or `..`.

## Hashing Archives

On Windows PowerShell:

```powershell
Get-FileHash .\example-plugin.zip -Algorithm SHA256
```

Use the lowercase hash value in `registry.json`.
