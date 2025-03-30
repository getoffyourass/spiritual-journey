import { render, screen, fireEvent } from '@testing-library/react';
import PrayerCard from './PrayerCard';

describe('PrayerCard', () => {
  const mockPrayer = {
    id: '1',
    title: 'Morning Prayer',
    text: 'Test prayer text',
    duration: 300
  };

  it('renders prayer details correctly', () => {
    render(<PrayerCard prayer={mockPrayer} />);
    
    expect(screen.getByText('Morning Prayer')).toBeInTheDocument();
    expect(screen.getByText('Test prayer text')).toBeInTheDocument();
  });

  it('handles start prayer click', () => {
    const onStart = jest.fn();
    render(<PrayerCard prayer={mockPrayer} onStart={onStart} />);
    
    fireEvent.click(screen.getByText('Begin Prayer'));
    expect(onStart).toHaveBeenCalledWith(mockPrayer.id);
  });
});
