import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Headermain from './index';

describe('Headermain', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('toggles the menu open state and body overflow lock', () => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);

    React.act(() => {
      root.render(
        <MemoryRouter>
          <Headermain />
        </MemoryRouter>,
      );
    });

    const menu = container.querySelector('.site__navigation');
    const menuButton = container.querySelector('.menu__button') as HTMLButtonElement | null;

    expect(menu?.classList.contains('menu__opend')).toBe(true);
    expect(document.body.classList.contains('ovhidden')).toBe(false);

    if (!menuButton) {
      throw new Error('Menu button not found');
    }

    React.act(() => {
      menuButton.click();
    });

    expect(menu?.classList.contains('menu__opend')).toBe(false);
    expect(document.body.classList.contains('ovhidden')).toBe(true);

    React.act(() => {
      menuButton.click();
    });

    expect(menu?.classList.contains('menu__opend')).toBe(true);
    expect(document.body.classList.contains('ovhidden')).toBe(false);

    React.act(() => {
      root.unmount();
    });
  });

  it('toggles the theme setting through the theme button', () => {
    const container = document.createElement('div');
    const root = ReactDOM.createRoot(container);

    React.act(() => {
      root.render(
        <MemoryRouter>
          <Headermain />
        </MemoryRouter>,
      );
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    const themeButton = container.querySelector('[aria-label="Toggle theme"]') as HTMLButtonElement | null;

    if (!themeButton) {
      throw new Error('Theme button not found');
    }

    React.act(() => {
      themeButton.click();
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');

    React.act(() => {
      root.unmount();
    });
  });
});