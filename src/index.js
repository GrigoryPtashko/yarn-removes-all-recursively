export default class Forms {
  constructor() {
    this._name = 'BG Forms';
  }

  get name() {
    return this._name;
  }
  static globalAddCount = 100;

  static addOrderItemWithPerson() {
    Forms.globalAddCount += 1;

    const orderitem_add_btn = document.getElementById('orderitem_add_btn'); // eslint-disable-line no-undef
    const itm = document.getElementById('orderitem_$id1'); // eslint-disable-line no-undef
    const parent = itm.parentNode;
    const cln = itm.cloneNode(true);

    const newOrderItemId = `$id${Forms.globalAddCount}`;
    const newOrderItemElemId = `orderitem_${newOrderItemId}`;
    const inputs = cln.getElementsByTagName('input');
    for (let idx = 0; idx < inputs.length; idx++) {
      if (inputs[idx].type !== 'hidden') {
        inputs[idx].value = '';
      }
    }
    cln.innerHTML = cln.innerHTML.replace(/\$id1/gi, newOrderItemId);
    cln.setAttribute('id', newOrderItemElemId);
    parent.insertBefore(cln, orderitem_add_btn);

    var f_orderitem = document.getElementById('f_orderitem');
    f_orderitem.value += ';' + newOrderItemId;

    var delButton = document.getElementById('orderitem_' + newOrderItemId + '_del');
    delButton.innerHTML = '<a style="cursor: pointer" ' +
      'onclick="removeOrderItemWithPerson(\'' + newOrderItemElemId + '\', \'' + newOrderItemId + '\'); return false;">' +
      'УДАЛИТЬ УЧАСТНИКА</a>';
  }

  static removeOrderItemWithPerson(elementId, orderItemId) {
    const itm = document.getElementById('orderitem_$id1'); // eslint-disable-line no-undef
    const parent = itm.parentNode;
    const node = document.getElementById(elementId); // eslint-disable-line no-undef
    parent.removeChild(node);

    const f_orderitem = document.getElementById('f_orderitem'); // eslint-disable-line no-undef
    f_orderitem.value = f_orderitem.value.replace(`;${orderItemId}`, '');
  }
}
