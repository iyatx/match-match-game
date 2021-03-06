import { Header } from './components/header/header';
import { Router } from './router';
import { BaseComponent } from './utils/base-component';
import { PopupRegister } from './components/popup/popup-register/register';
import { Game } from './pages/game/game';
import { PopupSignIn } from './components/popup/popup-signin/popup-signin';

export class App {
  private header: Header;
  private readonly router: Router;
  private main = new BaseComponent('main', ['main']);
  private registerPopup: PopupRegister | undefined;
  private signInPopup: PopupSignIn | undefined;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.router = new Router(this.main.element);
  }

  private showRegisterPopup(): void {
    localStorage.clear();

    this.registerPopup = new PopupRegister();
    this.registerPopup.updateHeader = () => {
      this.header.updateButtons();
    };
    this.rootElement.appendChild(this.registerPopup.element);

    this.registerPopup.hidePopupCancel = () => {
      if (this.registerPopup) {
        this.registerPopup.element.remove();
      }
    };
  }

  private showSignInPopup(): void {
    localStorage.clear();

    this.signInPopup = new PopupSignIn();
    this.signInPopup.updateHeader = () => this.header.updateButtons();
    this.rootElement.append(this.signInPopup.element);
  }

  render(): void {
    this.header.showRegisterPopup = () => this.showRegisterPopup();
    this.header.showSignInPopup = () => this.showSignInPopup();
    this.header.startGame = () => {
      this.main.element.innerHTML = '';
      this.main.element.append(new Game().element);
    };

    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);

    this.router.initRouter();
  }
}
