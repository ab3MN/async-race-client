export const allowScroll = () => {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;
  const { body } = document;

  html.style.position = '';
  html.style.overflow = '';
  body.style.position = '';
  body.style.overflow = '';
  body.style.paddingRight = '';
};

export const blockScroll = () => {
  if (typeof document === 'undefined') return;

  const html = document.documentElement;
  const { body } = document;

  const scrollBarWidth = window.innerWidth - html.clientWidth;
  const bodyPaddingRight =
    parseInt(
      window.getComputedStyle(body).getPropertyValue('padding-right'),
      10
    ) || 0;

  html.style.position = 'relative';
  body.style.position = 'relative';
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
};
