## Plugin Registry Checklist

- [ ] The plugin ID is stable, unique, and folder-safe.
- [ ] The plugin ID matches `plugin.json` inside the ZIP artifact.
- [ ] The artifact is a prebuilt HTTPS `.zip` URL, preferably from GitHub Releases.
- [ ] The artifact URL is versioned and not a mutable branch archive.
- [ ] The ZIP contains root `plugin.json`, built `main`, and declared `styles` files.
- [ ] The plugin does not require users to run Git, install dependencies, or build source.
- [ ] The plugin does not include secrets, obfuscated code, hidden tracking, or unexpected network behavior.
- [ ] `bun run validate` passes.

## Notes

Describe what the plugin does, what permissions it requests, and any network behavior.
