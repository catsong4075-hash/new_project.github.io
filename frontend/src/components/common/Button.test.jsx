import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn(); // Mock function
    render(<Button onClick={handleClick}>Click Me</Button>);
    await userEvent.click(screen.getByText(/Click Me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByText(/Primary Button/i);
    expect(button).toHaveClass('primary'); // Assuming CSS module class name
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText(/Secondary Button/i);
    expect(button).toHaveClass('secondary'); // Assuming CSS module class name
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText(/Disabled Button/i);
    expect(button).toBeDisabled();
  });
});
