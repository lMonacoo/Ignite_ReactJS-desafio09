import { render, screen } from '@testing-library/react'; // essa função basicamente vai renderizar um componente de uma maneira virtual - forma que conseguimos ver o output
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      };
    }
  };
});

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('adds active class if the link as currently active', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText('Home')).toHaveClass('active');
  });
});
