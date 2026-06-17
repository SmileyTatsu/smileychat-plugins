# Security Policy

Report malicious plugins, compromised artifact URLs, or registry integrity issues privately to the SmileyChat maintainers.

## Registry Integrity

The registry is a curated trust list for prebuilt plugin artifacts. A registry listing means the artifact was accepted for distribution; it does not sandbox plugin code.

Use versioned artifact URLs, preferably GitHub Release assets. Do not use mutable branch archives for verified registry entries.

## Plugin Trust

SmileyChat plugins are trusted local browser code. They can affect the local app experience through the permissions exposed by SmileyChat's plugin API.

Manual artifact installs bypass registry curation and should be treated as unverified trusted code.

## Removal

Registry entries may be removed or changed if a plugin becomes compromised, abandoned, misleading, unsafe, or no longer matches its reviewed artifact.
