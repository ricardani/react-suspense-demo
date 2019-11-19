export * from './useEventListener';

export const setMouseClickAnimation = e => {
    const doc = document.createElement('div');
    doc.className = 'clickEffect';
    doc.style.top = e.clientY + 'px';
    doc.style.left = e.clientX + 'px';
    document.body.appendChild(doc);
    doc.addEventListener('animationend', () => {
        doc.parentElement.removeChild(doc);
    });
};
