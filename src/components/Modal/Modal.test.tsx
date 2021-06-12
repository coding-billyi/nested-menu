import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalContent, ModalOpenButton } from './Modal';

describe('<Modal>', () => {
  it('the modal can be opened/closed', () => {
    const label = 'Modal Label';
    const title = 'Modal Title';
    const { baseElement } = render(
      <Modal>
        <ModalOpenButton>
          <button>Open</button>
        </ModalOpenButton>
        <ModalContent aria-label={label} title={title}>
          <div>Modal Content</div>
        </ModalContent>
      </Modal>,
    );
    userEvent.click(screen.getByRole('button', { name: 'Open' }));

    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-label', label);

    const withinModal = within(modal);

    expect(
      withinModal.getByRole('heading', { name: title }),
    ).toBeInTheDocument();

    // close by clicking the close button
    userEvent.click(withinModal.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // close by clicking the overlay
    userEvent.click(screen.getByRole('button', { name: 'Open' }));
    userEvent.click(
      baseElement.querySelector('[data-reach-dialog-overlay]') as Element,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
