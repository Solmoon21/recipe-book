import './popup.css';

export const close = () => {
  const popup = document.querySelector('.popup');
  popup.remove();
  document.querySelector('.overlay').style.display = 'none';
};

const PopUp = (titleText, displayText, rejectText, confirmText, confirmCallback) => {
  const container = document.querySelector('.overlay');

  const popup = document.createElement('div');
  popup.className = 'popup';

  const title = document.createElement('div');
  title.innerText = titleText;
  title.classList.add('sub-title', 'title-l');

  const text = document.createElement('p');
  text.innerText = displayText;
  text.classList.add('popup-prompt', 'text', 'text-m');

  const buttons = document.createElement('div');
  buttons.className = 'popup-actions';

  const cancelBtn = document.createElement('button');
  cancelBtn.innerHTML = `<b>${rejectText}<b>`;
  cancelBtn.classList.add('popup-action-btn', 'cancel', 'text-m');
  cancelBtn.onclick = close;

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'popup-action-btn';
  confirmBtn.classList.add('confirm', 'text', 'text-m');
  confirmBtn.innerHTML = `<b>${confirmText}<b>`;
  confirmBtn.onclick = () => {
    confirmCallback();
    close();
  };
  buttons.append(cancelBtn, confirmBtn);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('action-btn', 'close-btn');
  closeBtn.onclick = close;

  popup.append(title, text, buttons, closeBtn);

  container.append(popup);
  container.style.display = 'flex';
};

export default PopUp;
