# Contributing Plugins

Community plugins are added through pull requests to `registry.json`.

## Submission Requirements

- Add one plugin entry per pull request.
- Use a stable, unique, folder-safe plugin `id`.
- Make sure the packaged `plugin.json` has the same `id` as the registry entry.
- Host one prebuilt ZIP artifact on a trusted HTTPS URL, preferably GitHub Releases.
- Use a versioned artifact URL. Do not point at mutable branch archives.
- Ensure the ZIP contains a root `plugin.json` plus the built files declared by `main` and `styles`.
- Do not require users to run Git, install dependencies, or build the plugin.
- Include a `repository` URL when source review is possible.
- Document permissions and any network behavior in the pull request notes.

## Not Allowed

- Secrets or API keys.
- Obfuscated code.
- Hidden tracking.
- Unexpected network behavior.
- Artifacts that write outside plugin-owned storage.
- ZIP entries containing absolute paths, empty segments, drive letters, or `..`.
- Artifacts that depend on source files, `node_modules`, build scripts, or local developer tools at install time.

## Review Checklist

Maintainers should verify:

- `bun run validate` passes.
- The artifact URL downloads the reviewed ZIP.
- The ZIP has a root `plugin.json`.
- `plugin.json` `id` matches the registry entry.
- `main` and declared `styles` exist inside the ZIP.
- The ZIP does not contain source-only or dependency folders such as `src/`, `.git/`, or `node_modules/` unless explicitly justified.
- Requested permissions match the plugin behavior.

## Updating a Plugin

Update the existing registry entry with the new `version` and `artifact.url`. SmileyChat updates registry-installed plugins from the current artifact URL for the same plugin ID.
