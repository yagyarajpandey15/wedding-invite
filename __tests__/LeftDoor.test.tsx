import React from 'react';
import { render, screen } from '@testing-library/react';
import LeftDoor from '@/components/OpeningGate/LeftDoor';

describe('LeftDoor Component', () => {
  it('renders with correct data-testid attribute', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LeftDoor ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies transformStyle preserve-3d', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LeftDoor ref={ref} />);
    expect(ref.current?.style.transformStyle).toBe('preserve-3d');
  });

  it('has correct base positioning classes', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('absolute');
    expect(leftDoor.className).toContain('left-1/2');
    expect(leftDoor.className).toContain('top-1/2');
  });

  it('has correct transform origin for left edge rotation', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('origin-left');
  });

  it('has correct dimensions for mobile (50vw width, 90vh height)', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('w-[50vw]');
    expect(leftDoor.className).toContain('h-[90vh]');
  });

  it('has correct responsive height for medium screens (85vh)', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('md:h-[85vh]');
  });

  it('has correct responsive width for large screens (40vw)', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('lg:w-[40vw]');
  });

  it('applies sage green gradient background', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    // Check for gradient classes
    expect(leftDoor.className).toContain('bg-gradient-to-br');
    expect(leftDoor.className).toContain('from-[#A8B5A2]');
    expect(leftDoor.className).toContain('to-[#8A9A82]');
  });

  it('applies rounded borders on right side', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('rounded-r-xl');
  });

  it('applies shadow for depth', () => {
    render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('shadow-');
  });

  it('accepts custom className prop', () => {
    render(<LeftDoor className="custom-class" />);
    const leftDoor = screen.getByTestId('left-door');
    expect(leftDoor.className).toContain('custom-class');
  });

  it('renders embossed border effect element', () => {
    const { container } = render(<LeftDoor />);
    const leftDoor = screen.getByTestId('left-door');
    const embossedBorder = leftDoor.querySelector('.pointer-events-none');
    expect(embossedBorder).toBeInTheDocument();
  });
});
