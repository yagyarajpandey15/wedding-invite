import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home page', () => {
  it('shows the couple, families and key dates', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Abhishek & Simran');
    expect(screen.getByText('Abhishek Kumar')).toBeInTheDocument();
    expect(screen.getByText('Simran Choudhary')).toBeInTheDocument();
    expect(screen.getByText('Tilak Ceremony')).toBeInTheDocument();
    expect(screen.getByText('Wedding Ceremony')).toBeInTheDocument();
    expect(screen.getByText('Shiv Mandir')).toBeInTheDocument();
  });

  it('shows the Tap to Reveal gate', () => {
    render(<Home />);
    expect(screen.getByLabelText('Open the wedding invitation')).toBeInTheDocument();
  });
});
