interface Settings {
  theme: 'light' | 'dark';
  sound: 'on' | 'off';
}

export class SettingsService {
  private settings: Settings = {
    theme: 'light',
    sound: 'on',
  };

  public getSettings(): Settings {
    return { ...this.settings };
  }

  public setSettings(settings: Settings): void {
    this.settings = { ...settings };
  }
}
