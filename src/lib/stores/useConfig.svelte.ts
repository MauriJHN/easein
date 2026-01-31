import { browser } from "$app/environment";
import { CONFIGURATION_STORE } from "$lib/constants";

interface Configuration {
    workDurationMs: number;
    restDurationMs: number;
    toggleNotificationSound: boolean;
    autoStart: boolean;
}

export const DEFAULT_CONFIGURATION: Configuration = {
    workDurationMs: 25 * 60 * 1000,
    restDurationMs: 5 * 60 * 1000,
    toggleNotificationSound: true,
    autoStart: false,
};

class ConfigurationStore {

    constructor() {
        this.loadFromStorage();
    }

    private _config: Configuration = $state({ ...DEFAULT_CONFIGURATION });

    get config(): Readonly<Configuration> {
        return this._config;
    }

    loadFromStorage(): void {
        if (!browser) return;
        const storedConfig = localStorage.getItem(CONFIGURATION_STORE);
        if (storedConfig) {
            const parsed = JSON.parse(storedConfig);
            Object.assign(this._config, parsed);
        } else {
            this.persist();
        }
    }

    setConfigValue(key: string, value: any): void {
        if (key in this._config) {
            this._config = Object.assign(this._config, { [key]: value });
            this.persist();
        } else {
            console.warn(`Configuration key "${key}" does not exist.`);
        }
    }

    persist(): void {
        if (!browser) return;
        localStorage.setItem(CONFIGURATION_STORE, JSON.stringify(this._config));
    }
}

export const configurationStore = new ConfigurationStore();