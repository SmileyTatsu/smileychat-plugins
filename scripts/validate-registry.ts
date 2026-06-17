type RegistryPayload = {
    version?: unknown;
    plugins?: unknown;
};

type RegistryPlugin = Record<string, unknown>;

const categories = new Set([
    "interface",
    "input-output",
    "automation",
    "connections",
    "tools",
    "memory-lore",
    "other",
]);
const statuses = new Set(["official", "verified"]);
const allowedRootKeys = new Set(["version", "plugins"]);
const allowedPluginKeys = new Set([
    "id",
    "name",
    "description",
    "version",
    "author",
    "category",
    "status",
    "repository",
    "artifact",
]);
const allowedArtifactKeys = new Set(["url"]);

const registry = (await Bun.file("registry.json").json()) as RegistryPayload;
const errors: string[] = [];

validateAllowedKeys(registry as Record<string, unknown>, allowedRootKeys, "registry");

if (registry.version !== 1) {
    errors.push("registry.version must be 1.");
}

if (!Array.isArray(registry.plugins)) {
    errors.push("registry.plugins must be an array.");
} else {
    const seenIds = new Set<string>();

    registry.plugins.forEach((entry, index) => {
        const label = `plugins[${index}]`;
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
            errors.push(`${label} must be an object.`);
            return;
        }

        validatePlugin(entry as RegistryPlugin, label, seenIds);
    });
}

if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
}

console.log("registry.json is valid.");

function validatePlugin(plugin: RegistryPlugin, label: string, seenIds: Set<string>) {
    validateAllowedKeys(plugin, allowedPluginKeys, label);

    const id = requireString(plugin.id, `${label}.id`);
    if (id) {
        if (!/^[A-Za-z0-9._-]+$/.test(id) || id === "." || id === "..") {
            errors.push(`${label}.id must be a non-empty folder-safe plugin ID.`);
        }
        if (seenIds.has(id)) {
            errors.push(`${label}.id '${id}' is duplicated.`);
        }
        seenIds.add(id);
    }

    requireString(plugin.name, `${label}.name`);
    requireString(plugin.version, `${label}.version`);
    optionalString(plugin.description, `${label}.description`);
    optionalString(plugin.author, `${label}.author`);

    const category = requireString(plugin.category, `${label}.category`);
    if (category && !categories.has(category)) {
        errors.push(`${label}.category '${category}' is not supported.`);
    }

    const status = requireString(plugin.status, `${label}.status`);
    if (status && !statuses.has(status)) {
        errors.push(`${label}.status must be official or verified.`);
    }

    if (plugin.repository !== undefined) {
        const repository = requireString(plugin.repository, `${label}.repository`);
        if (repository && !isHttpsUrl(repository)) {
            errors.push(`${label}.repository must be an HTTPS URL.`);
        }
    }

    validateArtifact(plugin.artifact, `${label}.artifact`);
}

function validateArtifact(value: unknown, label: string) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        errors.push(`${label} must be an object.`);
        return;
    }

    const artifact = value as Record<string, unknown>;
    validateAllowedKeys(artifact, allowedArtifactKeys, label);

    const url = requireString(artifact.url, `${label}.url`);
    if (!url) {
        return;
    }

    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        errors.push(`${label}.url must be a valid URL.`);
        return;
    }

    if (parsed.protocol !== "https:") {
        errors.push(`${label}.url must use HTTPS.`);
    }
    if (!parsed.pathname.toLowerCase().endsWith(".zip")) {
        errors.push(`${label}.url path must end in .zip.`);
    }
}

function requireString(value: unknown, label: string): string {
    if (typeof value !== "string" || !value.trim()) {
        errors.push(`${label} must be a non-empty string.`);
        return "";
    }

    return value.trim();
}

function optionalString(value: unknown, label: string) {
    if (value !== undefined && (typeof value !== "string" || !value.trim())) {
        errors.push(`${label} must be a non-empty string when present.`);
    }
}

function validateAllowedKeys(
    value: Record<string, unknown>,
    allowedKeys: Set<string>,
    label: string,
) {
    for (const key of Object.keys(value)) {
        if (!allowedKeys.has(key)) {
            errors.push(`${label}.${key} is not supported.`);
        }
    }
}

function isHttpsUrl(value: string) {
    try {
        return new URL(value).protocol === "https:";
    } catch {
        return false;
    }
}
