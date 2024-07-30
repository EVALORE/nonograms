import { Observable } from '@shared/observer';

interface Settings {
  theme: 'light' | 'dark';
  sound: 'on' | 'off';
}

export class SettingsService extends Observable<Settings> {
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
