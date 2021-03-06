import { BaseComponent } from '../../../../utils/base-component';
import { RegisterUpload } from '../register-upload/register-upload';
import { RegisterInputs } from '../register-inputs/register-inputs';
import { RegisterButtons } from '../register-buttons/register-buttons';

import './register-container.scss';
import { IUserData } from '../../../../models/user-data-model';

export class RegisterContainer extends BaseComponent {
  hidePopupCancel: () => void = () => {};
  updateHeader: () => void = () => {};
  submitForm: () => void = () => {};

  private registerButtons;

  constructor(private state: IUserData, private type: string = 'register') {
    super('div', ['popup__form']);

    this.state = state;

    const registerUpload = new RegisterUpload();
    registerUpload.getImg = (image) => {
      this.state.img = image;
    };

    this.registerButtons = new RegisterButtons();
    this.registerButtons.hidePopupCancel = () => this.hidePopupCancel();

    const inputsBlock = new RegisterInputs(this.state, this.type);
    inputsBlock.checkInputs = () => this.checkInputs();

    const formContent = new BaseComponent('div', ['form__content']);
    formContent.element.append(
      ...(this.type === 'register'
        ? [inputsBlock.element, registerUpload.element]
        : [inputsBlock.element]),
    );

    const form = new BaseComponent('form', ['form']);
    form.element.append(formContent.element, this.registerButtons.element);
    form.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm();
    });

    this.element.appendChild(form.element);
  }

  checkInputs(): void {
    if (this.type === 'register') {
      const { name, surname, email, password } = this.state;

      if (name !== '' && surname !== '' && email !== '' && password !== '') {
        this.registerButtons.toggleDisabled(false);
      } else {
        this.registerButtons.toggleDisabled(true);
      }
    } else {
      const { email, password } = this.state;
      if (email !== '' && password !== '') {
        this.registerButtons.toggleDisabled(false);
      } else {
        this.registerButtons.toggleDisabled(true);
      }
    }
  }
}
