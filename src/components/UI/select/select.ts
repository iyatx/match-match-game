import { ISelectData } from '../../../models/select-model';
import { BaseComponent } from '../../../utils/base-component';
import './select.scss';

export class Select extends BaseComponent {
  changeSelect: (event: Event) => void = () => {};
  private selectData: ISelectData;

  constructor(selectData: ISelectData) {
    super('select', ['select']);
    this.selectData = selectData;

    this.element.addEventListener('change', (event: Event) =>
      this.changeSelect(event),
    );
    this.render();
  }

  render(): void {
    this.element.setAttribute('name', this.selectData.id);
    this.element.setAttribute('id', this.selectData.id);

    const options = this.selectData.options.map((optionData) => {
      const option = new BaseComponent('option');

      if (optionData.selected) {
        option.element.setAttribute('selected', '');
      }

      option.element.setAttribute('value', optionData.value);
      option.element.innerText = optionData.title;

      return option.element;
    });

    options.forEach((option, index) => {
      if (index === 0) {
        option.setAttribute('disabled', '');
      }
      this.element.appendChild(option);
    });
  }
}
