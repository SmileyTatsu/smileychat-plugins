# Security Policy

Report malicious plugins, compromised plugin URLs, or registry integrity issues privately to the SmileyChat maintainers.

## Registry Integrity

SmileyChat checks SHA-256 hashes for every file before installing a registry plugin. If a plugin repository changes a file without a registry update, installation should fail.

## Plugin Trust

Plugins are trusted local code. A registry listing means the plugin was accepted for distribution, not that it is sandboxed from all app behavior.

## Removal

Registry entries may be removed or changed if a plugin becomes compromised, abandoned, misleading, or unsafe.
