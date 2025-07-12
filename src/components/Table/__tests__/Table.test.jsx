import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Table from '../Table';

const mockData = [
  {
    id: 'electronics',
    label: 'Electronics',
    children: [
      { id: 'phones', label: 'Phones', value: 800 },
      { id: 'laptops', label: 'Laptops', value: 700 }
    ]
  }
];

test('renders rows correctly', () => {
  render(<Table data={mockData} />);
  expect(screen.getByText('Electronics')).toBeInTheDocument();
  expect(screen.getByText('Phones')).toBeInTheDocument();
});

test('updates Phones value by 10% using Allocation % button', async () => {
  render(<Table data={mockData} />);

  const inputs = screen.getAllByRole('spinbutton');
  fireEvent.change(inputs[1], { target: { value: '10' } }); // Phones input

  const percentButtons = screen.getAllByText('%');
  fireEvent.click(percentButtons[1]); // Phones % button

  // Automatically waits for text to appear
  const updatedCell = await screen.findByText('880.00');
  expect(updatedCell).toBeInTheDocument();
});
