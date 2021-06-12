import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Form } from './Form';
import { IForm } from '../../interface/IForm';

const mockData = {
  firstName: 'firstname',
  lastName: 'lastname',
  email: 'email@example.com',
};

const resolvedMockAPI = 'https://test.com/resolved';
const rejectedMockAPI = 'https:/test.com/rejected';

const mockForm: IForm = {
  title: 'Test Form',
  endpoint: resolvedMockAPI,
  id: '123',
  parent_id: '456',
  fields: {
    firstName: {
      type: 'text',
      label: 'First Name',
    },
    lastName: {
      type: 'text',
      label: 'Last Name',
    },
    email: {
      type: 'email',
      label: 'Email',
    },
  },
};

const mockFormWithRejectedEndpoint: IForm = {
  title: 'Test Form',
  endpoint: rejectedMockAPI,
  id: '123',
  parent_id: '456',
  fields: {
    firstName: {
      type: 'text',
      label: ' Name',
    },
    lastName: {
      type: 'text',
      label: ' Name',
    },
    email: {
      type: 'email',
      label: 'Email',
    },
  },
};

const server = setupServer(
  rest.post(resolvedMockAPI, async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: 'Mocked response',
      }),
    ),
  ),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('<Form>', () => {
  it('Submit form success', async () => {
    render(<Form form={mockForm} onClose={() => null} />, {});

    const { firstName, lastName, email } = mockData;

    const firstNameInputField = screen.getByRole('textbox', {
      name: /first name/i,
    });
    const lastNameInputField = screen.getByRole('textbox', {
      name: /last name/i,
    });
    const emailInputField = screen.getByRole('textbox', { name: /email/i });

    // @TODO: fix the issue with userEvent
    userEvent.type(firstNameInputField, firstName);
    userEvent.type(lastNameInputField, lastName);
    userEvent.type(emailInputField, email);

    expect(firstNameInputField).toHaveValue(firstName);
    expect(lastNameInputField).toHaveValue(lastName);
    expect(emailInputField).toHaveValue(email);

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByText(/success/i).textContent).toMatchInlineSnapshot(
      '"Success"',
    );
  });
  it('Submit form failure', async () => {
    render(<Form form={mockFormWithRejectedEndpoint} onClose={() => null} />);

    server.use(
      rest.post(rejectedMockAPI, async (req, res, ctx) =>
        res(ctx.status(400), ctx.json({ errors: 'Errors' })),
      ),
    );

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
      '"Something went wrong, please try later"',
    );
  });
});
