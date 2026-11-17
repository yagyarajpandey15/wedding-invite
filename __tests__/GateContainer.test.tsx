import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GateContainer from '@/components/OpeningGate/GateContainer';

describe('GateContainer Component', () => {
  it('renders children correctly', () => {
    render(
      <GateContainer>
        <div data-testid="test-child">Test Child</div>
      </GateContainer>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies sage green background color (Requirement 1.1)', () => {
    const { container } = render(
      <GateContainer>
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveClass('bg-sage-400');
  });

  it('applies full viewport height and width (Requirements 8.1, 8.2, 8.3)', () => {
    const { container } = render(
      <GateContainer>
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveClass('w-full', 'h-screen');
  });

  it('applies overflow hidden to contain 3D elements', () => {
    const { container } = render(
      <GateContainer>
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveClass('overflow-hidden');
  });

  it('applies 3D perspective for mobile (1500px) and desktop (2000px) - Requirements 2.7, 11.7', () => {
    const { container } = render(
      <GateContainer>
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveClass('perspective-1500', 'lg:perspective-2000');
  });

  it('sets perspectiveOrigin to 50% 50% for centered vanishing point (Requirement 11.7)', () => {
    const { container } = render(
      <GateContainer>
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveStyle({ 'perspective-origin': '50% 50%' });
  });

  it('centers child elements with flexbox', () => {
    const { container } = render(
      <GateContainer>
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('applies custom className prop', () => {
    const { container } = render(
      <GateContainer className="custom-class">
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveClass('custom-class');
  });

  it('maintains relative positioning', () => {
    const { container } = render(
      <GateContainer>
        <div>Content</div>
      </GateContainer>
    );
    
    const gateDiv = container.firstChild as HTMLElement;
    expect(gateDiv).toHaveClass('relative');
  });
});
