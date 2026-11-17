import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LeftDoor from '@/components/OpeningGate/LeftDoor';

describe('LeftDoor Component', () => {
  it('should render with correct data-testid', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toBeInTheDocument();
  });

  it('should have transform origin at left center', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    // Tailwind's origin-left class applies transform-origin: left
    expect(leftDoor).toHaveClass('origin-left');
  });

  it('should have preserve-3d transform style', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    // transformStyle is set via inline style prop
    const style = window.getComputedStyle(leftDoor);
    expect(leftDoor.style.transformStyle).toBe('preserve-3d');
  });

  it('should apply custom className when provided', () => {
    render(<LeftDoor className="custom-class" />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toHaveClass('custom-class');
  });

  it('should have correct positioning classes', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toHaveClass('absolute');
    expect(leftDoor).toHaveClass('left-1/2');
    expect(leftDoor).toHaveClass('top-1/2');
    expect(leftDoor).toHaveClass('-translate-x-full');
    expect(leftDoor).toHaveClass('-translate-y-1/2');
  });

  it('should have sage green gradient background', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toHaveClass('bg-gradient-to-br');
    // Component uses hex colors directly in arbitrary values
    expect(leftDoor).toHaveClass('from-[#A8B5A2]');
    expect(leftDoor).toHaveClass('to-[#8A9A82]');
  });

  it('should have rounded border on right side', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    // Component uses rounded-r-xl (not rounded-r-lg)
    expect(leftDoor).toHaveClass('rounded-r-xl');
  });

  it('should have shadow for depth', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toHaveClass('shadow-[10px_0_30px_rgba(0,0,0,0.3)]');
  });

  it('should have responsive width (50vw default, 40vw on lg)', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toHaveClass('w-[50vw]');
    expect(leftDoor).toHaveClass('lg:w-[40vw]');
  });

  it('should have responsive height (90vh default, 85vh on md)', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toHaveClass('h-[90vh]');
    expect(leftDoor).toHaveClass('md:h-[85vh]');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LeftDoor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-testid', 'left-door');
  });
});
