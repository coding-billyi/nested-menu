import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { Menus } from './Menus';

const mockList = [
  {
    title: 'Bathroom',
    id: 'xawMCU',
    parent_id: null,
    form: null,
    children: [],
  },
  {
    title: 'Kitchen',
    id: 'mpjxjH',
    parent_id: null,
    form: {
      title: 'Form 1',
      id: 'jojEAk',
      parent_id: 'mpjxjH',
      endpoint: 'https://api.mocki.io/v1/aa0aa7e0',
      fields: {
        firstName: {
          label: 'First Name',
          type: 'text',
        },
        lastName: {
          label: 'Last Name',
          type: 'text',
        },
      },
    },
    children: [],
  },
  {
    title: 'Laundry',
    id: '_55tO4',
    parent_id: null,
    form: null,
    children: [
      {
        title: 'Washers',
        id: 'w66QQv',
        parent_id: '_55tO4',
        form: null,
        children: [
          {
            title: 'Front load Washers',
            id: 'w651Qv',
            parent_id: 'w66QQv',
            form: null,
            children: [],
          },
          {
            title: 'Top load Washers',
            id: 'p26rQv',
            parent_id: 'w66QQv',
            form: null,
            children: [],
          },
        ],
      },
      {
        title: 'Dryer',
        id: 'Mi1wlx',
        parent_id: '_55tO4',
        form: null,
        children: [],
      },
    ],
  },
  {
    title: 'Living',
    id: 'x2w3ke',
    parent_id: null,
    form: null,
    children: [
      {
        title: 'Sofa',
        id: '586s2E',
        parent_id: 'x2w3ke',
        form: null,
        children: [],
      },
    ],
  },
];

describe('<Menus>', () => {
  it('should render a form click button with a form', () => {
    render(<Menus menus={mockList} />);
    userEvent.click(screen.getByRole('button', { name: /kitchen/i }));
    const formDialog = screen.getByRole('dialog', { name: /form 1/i });
    expect(formDialog).toBeInTheDocument();
    userEvent.click(within(formDialog).getByRole('button', { name: /close/i }));
    expect(formDialog).not.toBeInTheDocument();
  });

  it('should render a submenu click button with children', () => {
    render(<Menus menus={mockList} />);
    userEvent.click(screen.getByRole('button', { name: /laundry/i }));
    // @TODO: figure out why this getByRole('menu', { name:/laundry/i }) not work
    expect(screen.getByTestId(/submenu-laundry/i)).toBeInTheDocument();
  });

  it('should render a message when click button without children and form', () => {
    render(<Menus menus={mockList} />);

    userEvent.click(screen.getByRole('button', { name: /bathroom/i }));
    const errorDialog = screen.getByRole('dialog', { name: /error/i });
    expect(errorDialog).toBeInTheDocument();
    expect(
      within(errorDialog).getByRole('document').textContent,
    ).toMatchInlineSnapshot(
      `"This hasn't been implemented yet. Please try another menu item"`,
    );
    userEvent.click(
      within(errorDialog).getByRole('button', { name: /close/i }),
    );
    expect(errorDialog).not.toBeInTheDocument();
  });

  it('should hide the lower level button when click a higher level menu button', () => {
    render(<Menus menus={mockList} />);
    // click a deep item then go back to the first menu
    userEvent.click(screen.getByRole('button', { name: /laundry/i }));
    userEvent.click(screen.getByRole('button', { name: /washers/i }));
    userEvent.click(screen.getByRole('button', { name: /living/i }));
    expect(
      screen.getByRole('button', { name: /Laundry/i }).nextElementSibling,
    ).toBeNull();
  });
});
