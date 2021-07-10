import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

test('it renders correclty', async () => {
  render(<Async />);

  await waitForElementToBeRemoved(screen.queryByText('Button'));

  //   await waitFor(() => {
  //     return expect(screen.queryByText('Button')).not.toBeInTheDocument();
  //   });
});
